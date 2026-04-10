import { DEFAULT_API_BASE_URL, getApiBaseUrl, resetApiBaseUrl } from "./config";
import {
  clearStoredAuthSession,
  getStoredAuthSession,
  setStoredAuthSession,
} from "./session";
import type { AuthSession, RefreshTokenResponse } from "./types";

type ApiErrorPayload = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestOptions = {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown;
  auth?: boolean;
  retryOnUnauthorized?: boolean;
};

export class ApiClientError extends Error {
  status: number;
  payload: ApiErrorPayload | null;

  constructor(message: string, status: number, payload: ApiErrorPayload | null = null) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.payload = payload;
  }
}

async function parseJson<T>(response: Response): Promise<T | null> {
  const raw = await response.text();
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function errorMessageFromPayload(payload: ApiErrorPayload | null, fallback: string): string {
  if (!payload) return fallback;
  if (Array.isArray(payload.message)) {
    const joined = payload.message.filter(Boolean).join(", ");
    if (joined) return joined;
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  return fallback;
}

function toBodyInit(body: unknown, headers: Headers): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;

  if (
    typeof body === "string" ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return JSON.stringify(body);
}

async function sendRequest(
  baseUrl: string,
  path: string,
  options: ApiRequestOptions,
  accessToken?: string,
): Promise<Response> {
  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const body = toBodyInit(options.body, headers);

  return fetch(`${baseUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body,
  });
}

class ApiClient {
  private async buildError(response: Response, fallbackMessage: string): Promise<ApiClientError> {
    const payload = await parseJson<ApiErrorPayload>(response);
    const message = errorMessageFromPayload(
      payload,
      `${fallbackMessage} (HTTP ${response.status})`,
    );
    return new ApiClientError(message, response.status, payload);
  }

  private async refreshSession(baseUrl: string, current: AuthSession): Promise<AuthSession> {
    const response = await sendRequest(
      baseUrl,
      "/auth/refresh",
      {
        method: "POST",
        body: { refreshToken: current.refreshToken },
        auth: false,
        retryOnUnauthorized: false,
      },
      undefined,
    );

    if (!response.ok) {
      throw await this.buildError(response, "No se pudo refrescar la sesion");
    }

    const payload = await parseJson<RefreshTokenResponse>(response);
    if (!payload?.accessToken || !payload?.refreshToken) {
      throw new ApiClientError("Respuesta invalida al refrescar la sesion", 500);
    }

    const nextSession: AuthSession = {
      ...current,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    };
    setStoredAuthSession(nextSession);
    return nextSession;
  }

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const auth = options.auth ?? true;
    const retryOnUnauthorized = options.retryOnUnauthorized ?? true;
    let activeBaseUrl = getApiBaseUrl();
    let retriedWithDefaultBase = false;

    const requestWithFallback = async (accessToken?: string): Promise<Response> => {
      try {
        return await sendRequest(activeBaseUrl, path, options, accessToken);
      } catch (error) {
        const shouldRetryWithDefault =
          !retriedWithDefaultBase && activeBaseUrl !== DEFAULT_API_BASE_URL;

        if (!shouldRetryWithDefault) {
          throw error;
        }

        retriedWithDefaultBase = true;
        activeBaseUrl = DEFAULT_API_BASE_URL;
        resetApiBaseUrl();
        return sendRequest(activeBaseUrl, path, options, accessToken);
      }
    };

    let currentSession = auth ? getStoredAuthSession() : null;
    if (auth && !currentSession) {
      throw new ApiClientError("No hay una sesion activa", 401);
    }

    let response = await requestWithFallback(currentSession?.accessToken);

    if (auth && response.status === 401 && retryOnUnauthorized && currentSession) {
      try {
        currentSession = await this.refreshSession(activeBaseUrl, currentSession);
      } catch (error) {
        clearStoredAuthSession();
        throw error;
      }

      response = await requestWithFallback(currentSession.accessToken);
    }

    if (!response.ok) {
      throw await this.buildError(response, "No se pudo completar la solicitud");
    }

    const payload = await parseJson<T>(response);
    return (payload ?? (undefined as T));
  }
}

export const apiClient = new ApiClient();
