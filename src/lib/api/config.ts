import { readStorage, removeStorage, writeStorage } from "./storage";

const FALLBACK_API_BASE_URL = "http://localhost:3000/api";
export const API_BASE_STORAGE_KEY = "api_base_url_v1";

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

export const DEFAULT_API_BASE_URL = trimTrailingSlashes(
  (process.env.NEXT_PUBLIC_API_URL ?? FALLBACK_API_BASE_URL).trim() ||
    FALLBACK_API_BASE_URL,
);

export function normalizeApiBaseUrl(rawValue: string): string {
  const trimmed = rawValue.trim();
  return trimTrailingSlashes(trimmed || DEFAULT_API_BASE_URL);
}

export function getApiBaseUrl(): string {
  const stored = readStorage(API_BASE_STORAGE_KEY);
  if (!stored) return DEFAULT_API_BASE_URL;
  return normalizeApiBaseUrl(stored);
}

export function setApiBaseUrl(rawValue: string): string {
  const normalized = normalizeApiBaseUrl(rawValue);
  writeStorage(API_BASE_STORAGE_KEY, normalized);
  return normalized;
}

export function resetApiBaseUrl(): void {
  removeStorage(API_BASE_STORAGE_KEY);
}
