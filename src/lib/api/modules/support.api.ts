import { apiClient } from "../client";
import type {
  CreateSupportPathPayload,
  SupportPath,
  UpdateSupportPathPayload,
} from "../types";

export function listPublicSupportPaths(): Promise<SupportPath[]> {
  return apiClient.request<SupportPath[]>("/support", {
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listSupportPathsAdmin(): Promise<SupportPath[]> {
  return apiClient.request<SupportPath[]>("/support/admin/all");
}

export function createSupportPath(
  payload: CreateSupportPathPayload,
): Promise<SupportPath> {
  return apiClient.request<SupportPath>("/support", {
    method: "POST",
    body: payload,
  });
}

export function updateSupportPathById(
  id: string,
  payload: UpdateSupportPathPayload,
): Promise<SupportPath> {
  return apiClient.request<SupportPath>(`/support/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteSupportPathById(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/support/${id}`, {
    method: "DELETE",
  });
}
