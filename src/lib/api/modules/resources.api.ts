import { apiClient } from "../client";
import type {
  CreateResourcePayload,
  ResourceRecord,
  UpdateResourcePayload,
} from "../types";

export function listPublishedResources(category?: string): Promise<ResourceRecord[]> {
  const query = category?.trim() ? `?category=${encodeURIComponent(category.trim())}` : "";
  return apiClient.request<ResourceRecord[]>(`/resources${query}`, {
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listResourcesAdmin(): Promise<ResourceRecord[]> {
  return apiClient.request<ResourceRecord[]>("/resources/admin/all");
}

export function createResource(payload: CreateResourcePayload): Promise<ResourceRecord> {
  return apiClient.request<ResourceRecord>("/resources", {
    method: "POST",
    body: payload,
  });
}

export function updateResourceById(
  id: string,
  payload: UpdateResourcePayload,
): Promise<ResourceRecord> {
  return apiClient.request<ResourceRecord>(`/resources/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteResourceById(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/resources/${id}`, {
    method: "DELETE",
  });
}

export function trackResourceOpen(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/resources/${id}/open`, {
    method: "PATCH",
    auth: false,
    retryOnUnauthorized: false,
  });
}
