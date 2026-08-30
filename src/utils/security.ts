/** Client-side input validation and sanitization for public forms. */

export const MAX_NAME_LENGTH = 80;
export const MAX_PHONE_LENGTH = 15;
export const MAX_MESSAGE_LENGTH = 500;

const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;
const UNSAFE_NAME_CHARS = /[<>"`\\]/g;
const NAME_PATTERN = /^[\p{L}\p{M}\s.'-]+$/u;

export function stripControlChars(value: string): string {
  return value.replace(CONTROL_CHARS, '');
}

export function sanitizePersonName(value: string, options?: { trim?: boolean }): string {
  const cleaned = stripControlChars(value).replace(UNSAFE_NAME_CHARS, '');
  const next = options?.trim === false ? cleaned : cleaned.trim();
  return next.slice(0, MAX_NAME_LENGTH);
}

export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s-]/g, '').slice(0, MAX_PHONE_LENGTH);
}

export function normalizePhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function isValidIndianPhone(value: string): boolean {
  const digits = normalizePhoneDigits(value);
  return /^[6-9]\d{9}$/.test(digits);
}

export function validatePersonName(value: string, label = 'Name'): string | null {
  const sanitized = sanitizePersonName(value);
  if (sanitized.length < 2) {
    return `${label} must be at least 2 characters.`;
  }
  if (!NAME_PATTERN.test(sanitized)) {
    return `${label} contains invalid characters.`;
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = normalizePhoneDigits(value);
  if (!isValidIndianPhone(digits)) {
    return 'Enter a valid 10-digit Indian mobile number.';
  }
  return null;
}

export function sanitizeForWhatsAppText(value: string, maxLength = MAX_MESSAGE_LENGTH): string {
  return stripControlChars(value).replace(/[*_~`]/g, '').trim().slice(0, maxLength);
}

export function openExternalUrl(url: string): void {
  // Do not pass `noopener` as a window.open feature: browsers then return null
  // even when the tab opened, which would incorrectly navigate this page away.
  const opened = window.open(url, '_blank');
  if (opened) {
    opened.opener = null;
    return;
  }
  window.location.assign(url);
}
