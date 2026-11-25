import type { IncomingMessage, ServerResponse } from 'http';
import {
  ChatRequestPayload,
  handleN8nChatRequest,
  isN8nWebhookConfigured,
} from '../src/server/n8nChat';

interface VercelLikeRequest extends IncomingMessage {
  body?: unknown;
}

interface VercelLikeResponse extends ServerResponse {
  status?: (code: number) => VercelLikeResponse;
  json?: (data: unknown) => void;
}

function sendJson(res: VercelLikeResponse, statusCode: number, data: unknown) {
  if (typeof res.status === 'function') {
    const statusRes = res.status(statusCode);
    if (typeof statusRes.json === 'function') {
      statusRes.json(data);
      return;
    }
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

async function readJsonBody(req: VercelLikeRequest): Promise<ChatRequestPayload> {
  if (req.body && typeof req.body === 'object') {
    return req.body as ChatRequestPayload;
  }
  if (typeof req.body === 'string' && req.body.trim().length > 0) {
    try {
      return JSON.parse(req.body) as ChatRequestPayload;
    } catch {
      return {};
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: Buffer | string) => {
      raw += typeof chunk === 'string' ? chunk : chunk.toString('utf8');
      if (raw.length > 32768) {
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? (JSON.parse(raw) as ChatRequestPayload) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse
) {
  if (req.method === 'GET') {
    sendJson(res, 200, { configured: isN8nWebhookConfigured() });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    sendJson(res, 405, { error: 'Metode tidak diizinkan.' });
    return;
  }

  const payload = await readJsonBody(req);
  const result = await handleN8nChatRequest(payload);
  sendJson(res, result.status, result.body);
}
