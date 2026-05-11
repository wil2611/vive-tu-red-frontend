import { readStorage, removeStorage, writeStorage } from "./storage";

export const API_BASE_STORAGE_KEY = "api_base_url_v1";

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

function getDefaultApiBaseUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    throw new Error("NEXT_PUBLIC_API_URL must be defined in the frontend environment.");
  }

  return trimTrailingSlashes(configuredUrl);
}

export const DEFAULT_API_BASE_URL = getDefaultApiBaseUrl();

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
