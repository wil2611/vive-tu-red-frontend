import { apiClient } from "../client";
import {
  clearStoredAuthSession,
  getStoredAuthSession,
  setStoredAuthSession,
} from "../session";
import type { AuthSession, AuthUser, LoginPayload, LoginResponse } from "../types";

function toAuthSession(payload: LoginResponse): AuthSession {
  return {
    user: payload.user,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  };
}

export async function loginWithPassword(credentials: LoginPayload): Promise<AuthSession> {
  const payload = await apiClient.request<LoginResponse>("/auth/login", {
    method: "POST",
    body: credentials,
    auth: false,
    retryOnUnauthorized: false,
  });

  const session = toAuthSession(payload);
  setStoredAuthSession(session);
  return session;
}

export async function logoutAuthSession(): Promise<void> {
  try {
    await apiClient.request<{ message: string }>("/auth/logout", {
      method: "POST",
      retryOnUnauthorized: false,
    });
  } finally {
    clearStoredAuthSession();
  }
}

export function getCurrentAuthSession(): AuthSession | null {
  return getStoredAuthSession();
}

export function clearAuthSession(): void {
  clearStoredAuthSession();
}

export function syncCurrentAuthUser(user: AuthUser): void {
  const session = getStoredAuthSession();
  if (!session) return;
  setStoredAuthSession({
    ...session,
    user,
  });
}
