import crypto from 'crypto';

export interface ChatRequestPayload {
  message?: unknown;
  sessionId?: unknown;
  pageContext?: unknown;
}

export interface ChatHandlerResult {
  status: number;
  body: {
    reply?: string;
    sessionId?: string;
    configured?: boolean;
    error?: string;
  };
}

const MAX_MESSAGE_LENGTH = 2000;
const MAX_CONTEXT_LENGTH = 200;
const WEBHOOK_TIMEOUT_MS = 25000;

function isValidHttpUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function sanitizeSessionId(raw: unknown): string {
  if (typeof raw === 'string') {
    const cleaned = raw.trim().replace(/[^a-zA-Z0-9_-]/g, '');
    if (cleaned.length >= 6 && cleaned.length <= 100) {
      return cleaned;
    }
  }
  return `sesi_${crypto.randomUUID().replace(/-/g, '')}`;
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

export function isN8nWebhookConfigured(): boolean {
  const url = (process.env.N8N_WEBHOOK_URL ?? '').trim();
  return url.length > 0 && isValidHttpUrl(url);
}

export async function handleN8nChatRequest(
  payload: ChatRequestPayload
): Promise<ChatHandlerResult> {
  const rawMessage = payload?.message;
  if (typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
    return {
      status: 400,
      body: {
        error: 'Pesan tidak boleh kosong.',
      },
    };
  }

  const message = rawMessage.trim();
  if (message.length > MAX_MESSAGE_LENGTH) {
    return {
      status: 400,
      body: {
        error: `Pesan terlalu panjang (maksimal ${MAX_MESSAGE_LENGTH} karakter).`,
      },
    };
  }

  const sessionId = sanitizeSessionId(payload?.sessionId);
  const pageContext =
    typeof payload?.pageContext === 'string'
      ? payload.pageContext.trim().slice(0, MAX_CONTEXT_LENGTH)
      : 'Beranda Portofolio';

  const webhookUrl = (process.env.N8N_WEBHOOK_URL ?? '').trim();
  if (!webhookUrl || !isValidHttpUrl(webhookUrl)) {
    return {
      status: 503,
      body: {
        configured: false,
        sessionId,
        error:
          'Webhook n8n belum dikonfigurasi di server. Tambahkan variabel lingkungan N8N_WEBHOOK_URL di pengaturan server (Secrets / Vercel) untuk mengaktifkan balasan langsung.',
      },
    };
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
    const response = await fetch(webhookUrl, {
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

    const contentType = response.headers.get('content-type') ?? '';
    const rawBody = await response.text();

    if (!response.ok) {
      return {
        status: 502,
        body: {
          configured: true,
          sessionId,
          error:
            'Layanan webhook n8n sedang tidak dapat memproses pesan. Silakan coba beberapa saat lagi atau hubungi via email.',
        },
      };
    }

    let parsedBody: unknown = rawBody;
    if (contentType.includes('application/json') || rawBody.trim().startsWith('{') || rawBody.trim().startsWith('[')) {
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        parsedBody = rawBody;
      }
    }

    const reply = extractReplyFromUnknown(parsedBody);
    if (!reply) {
      return {
        status: 200,
        body: {
          configured: true,
          sessionId,
          reply:
            'Pesan Anda telah diterima oleh alur kerja n8n, namun belum ada teks balasan yang dikembalikan oleh node Respond to Webhook.',
        },
      };
    }

    return {
      status: 200,
      body: {
        configured: true,
        sessionId,
        reply,
      },
    };
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    return {
      status: isTimeout ? 504 : 502,
      body: {
        configured: true,
        sessionId,
        error: isTimeout
          ? 'Waktu tunggu balasan dari n8n habis. Silakan kirim ulang pesan Anda.'
          : 'Gagal terhubung ke webhook n8n. Periksa kembali status alur kerja n8n Anda.',
      },
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
