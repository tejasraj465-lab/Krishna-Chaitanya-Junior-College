export const MAX_AI_MESSAGE_LENGTH = 2000;
export const MAX_AI_HISTORY_ITEMS = 6;
export const MAX_AI_HISTORY_TEXT_LENGTH = 500;

export interface AiHistoryItem {
  sender?: string;
  text?: string;
}

export interface ValidatedAiGuideRequest {
  message: string;
  history: AiHistoryItem[];
}

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS, '').trim().slice(0, maxLength);
}

export function validateAiGuideRequest(
  body: unknown
): { ok: true; data: ValidatedAiGuideRequest } | { ok: false; status: number; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, status: 400, error: 'Invalid request body.' };
  }

  const record = body as Record<string, unknown>;
  const message = sanitizeText(record.message, MAX_AI_MESSAGE_LENGTH);

  if (!message) {
    return { ok: false, status: 400, error: 'Message is required.' };
  }

  if (message.length > MAX_AI_MESSAGE_LENGTH) {
    return { ok: false, status: 400, error: 'Message is too long.' };
  }

  let history: AiHistoryItem[] = [];
  if (Array.isArray(record.history)) {
    history = record.history.slice(-MAX_AI_HISTORY_ITEMS).map((item) => {
      if (!item || typeof item !== 'object') return {};
      const entry = item as Record<string, unknown>;
      const sender = entry.sender === 'user' || entry.sender === 'ai' ? entry.sender : undefined;
      const text = sanitizeText(entry.text, MAX_AI_HISTORY_TEXT_LENGTH);
      return { sender, text };
    });
  }

  return { ok: true, data: { message, history } };
}
