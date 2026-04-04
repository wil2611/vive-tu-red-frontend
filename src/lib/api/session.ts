import { removeStorage, readStorage, writeStorage } from "./storage";
import type { AuthSession, AuthUser, UserRole } from "./types";

const SESSION_STORAGE_KEY = "admin_session_v1";

function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "editor" || value === "investigador";
}

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<AuthUser>;
  return (
    typeof user.id === "string" &&
    typeof user.email === "string" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    isUserRole(user.role)
  );
}

export function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<AuthSession>;
  return (
    isAuthUser(session.user) &&
    typeof session.accessToken === "string" &&
    typeof session.refreshToken === "string"
  );
}

export function getStoredAuthSession(): AuthSession | null {
  const raw = readStorage(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    return isAuthSession(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function setStoredAuthSession(session: AuthSession): void {
  writeStorage(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredAuthSession(): void {
  removeStorage(SESSION_STORAGE_KEY);
}
