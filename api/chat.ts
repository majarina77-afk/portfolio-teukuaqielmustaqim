interface ChatRequestPayload {
  message?: unknown;
  sessionId?: unknown;
  pageContext?: unknown;
}

const MAX_BODY_BYTES = 32768;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONTEXT_LENGTH = 200;
const WEBHOOK_TIMEOUT_MS = 25000;

function jsonResponse(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function isValidHttpUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function generateSessionId(): string {
  if (
    typeof globalThis.crypto !== 'undefined' &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return `sesi_${globalThis.crypto.randomUUID().replace(/-/g, '')}`;
  }
  return `sesi_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function sanitizeSessionId(raw: unknown): string {
  if (typeof raw === 'string') {
    const cleaned = raw.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleaned.length >= 6 && cleaned.length <= 100) {
      return cleaned;
    }
  }
  return generateSessionId();
}

function extractReplyFromUnknown(data: unknown): string | null {
  if (typeof data === 'string') {
    const trimmed = data.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (Array.isArray(data) && data.length > 0) {
    return extractReplyFromUnknown(data[0]);
  }

  if (data && typeof data === 'object') {
    const record = data as Record<string, unknown>;
    const candidateKeys = [
      'output',
      'reply',
      'response',
      'answer',
      'text',
      'message',
      'content',
      'result',
    ];

    for (const key of candidateKeys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim();
      }
      if (value && typeof value === 'object') {
        const nested = extractReplyFromUnknown(value);
        if (nested) return nested;
      }
    }

    if (record.data) {
      const nestedData = extractReplyFromUnknown(record.data);
      if (nestedData) return nestedData;
    }
  }

  return null;
}

function isN8nWebhookConfigured(): boolean {
  const url = (process.env.N8N_WEBHOOK_URL ?? '').trim();
  return url.length > 0 && isValidHttpUrl(url);
}

export async function GET(): Promise<Response> {
  return jsonResponse({ configured: isN8nWebhookConfigured() }, 200);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const contentLengthHeader = request.headers.get('content-length');
    if (contentLengthHeader) {
      const declaredLength = Number(contentLengthHeader);
      if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
        return jsonResponse(
          { error: 'Ukuran permintaan terlalu besar.' },
          413
        );
      }
    }

    const rawText = await request.text();
    if (rawText.length > MAX_BODY_BYTES) {
      return jsonResponse(
        { error: 'Ukuran permintaan terlalu besar.' },
        413
      );
    }

    let payload: ChatRequestPayload = {};
    if (rawText.trim().length > 0) {
      try {
        const parsed = JSON.parse(rawText) as unknown;
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          payload = parsed as ChatRequestPayload;
        }
      } catch {
        return jsonResponse(
          { error: 'Format body JSON tidak valid.' },
          400
        );
      }
    }

    const rawMessage = payload.message;
    if (typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
      return jsonResponse({ error: 'Pesan tidak boleh kosong.' }, 400);
    }

    const message = rawMessage.trim();
    if (message.length > MAX_MESSAGE_LENGTH) {
      return jsonResponse(
        {
          error: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`,
        },
        400
      );
    }

    const sessionId = sanitizeSessionId(payload.sessionId);
    const pageContext =
      typeof payload.pageContext === 'string'
        ? payload.pageContext.trim().slice(0, MAX_CONTEXT_LENGTH)
        : 'Beranda Portofolio';

    const webhookUrl = (process.env.N8N_WEBHOOK_URL ?? '').trim();
    if (!webhookUrl || !isValidHttpUrl(webhookUrl)) {
      return jsonResponse(
        {
          configured: false,
          sessionId,
          error:
            'Webhook n8n belum dikonfigurasi di server. Tambahkan variabel lingkungan N8N_WEBHOOK_URL di pengaturan Vercel Environment Variables untuk mengaktifkan balasan langsung.',
        },
        503
      );
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain',
    };

    const authToken = (process.env.N8N_WEBHOOK_AUTH_TOKEN ?? '').trim();
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
      headers['X-Webhook-Token'] = authToken;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          chatInput: message,
          message,
          sessionId,
          source: 'portfolio-teuku-aqiel-mustaqim',
          pageContext,
          timestamp: new Date().toISOString(),
        }),
      });

      const contentType = webhookResponse.headers.get('content-type') ?? '';
      const rawBody = await webhookResponse.text();

      if (!webhookResponse.ok) {
        return jsonResponse(
          {
            configured: true,
            sessionId,
            error:
              'Layanan webhook n8n sedang tidak dapat memproses pesan. Silakan coba beberapa saat lagi atau hubungi via email.',
          },
          502
        );
      }

      let parsedBody: unknown = rawBody;
      const trimmedBody = rawBody.trim();
      if (
        contentType.includes('application/json') ||
        trimmedBody.startsWith('{') ||
        trimmedBody.startsWith('[')
      ) {
        try {
          parsedBody = JSON.parse(rawBody);
        } catch {
          parsedBody = rawBody;
        }
      }

      const reply = extractReplyFromUnknown(parsedBody);
      if (!reply) {
        return jsonResponse(
          {
            configured: true,
            sessionId,
            reply:
              'Pesan Anda telah diterima oleh alur kerja n8n, namun belum ada teks balasan yang dikembalikan oleh node Respond to Webhook.',
          },
          200
        );
      }

      return jsonResponse(
        {
          configured: true,
          sessionId,
          reply,
        },
        200
      );
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      return jsonResponse(
        {
          configured: true,
          sessionId,
          error: isTimeout
            ? 'Waktu tunggu balasan dari n8n habis. Silakan kirim ulang pesan Anda.'
            : 'Gagal terhubung ke webhook n8n. Periksa kembali status alur kerja n8n Anda.',
        },
        isTimeout ? 504 : 502
      );
    } finally {
      clearTimeout(timeoutId);
    }
  } catch {
    return jsonResponse(
      {
        error:
          'Terjadi kendala saat memproses permintaan percakapan. Silakan coba kembali.',
      },
      500
    );
  }
}
