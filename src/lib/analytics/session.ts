const ANALYTICS_SESSION_KEY = "analytics_session_id_v1";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateAnalyticsSessionId(): string {
  if (typeof window === "undefined") return generateSessionId();

  const existing = window.localStorage.getItem(ANALYTICS_SESSION_KEY);
  if (existing) return existing;

  const next = generateSessionId();
  window.localStorage.setItem(ANALYTICS_SESSION_KEY, next);
  return next;
}
