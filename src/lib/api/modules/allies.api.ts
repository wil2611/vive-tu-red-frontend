import { apiClient } from "../client";
import type {
  CreateProjectAllyPayload,
  ProjectAlly,
  UpdateProjectAllyPayload,
} from "../types";

export function listPublicProjectAllies(): Promise<ProjectAlly[]> {
  return apiClient.request<ProjectAlly[]>("/allies", {
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listProjectAlliesAdmin(): Promise<ProjectAlly[]> {
  return apiClient.request<ProjectAlly[]>("/allies/admin/all");
}

export function createProjectAlly(payload: CreateProjectAllyPayload): Promise<ProjectAlly> {
  return apiClient.request<ProjectAlly>("/allies", {
    method: "POST",
    body: payload,
  });
}

export function updateProjectAllyById(
  id: string,
  payload: UpdateProjectAllyPayload,
): Promise<ProjectAlly> {
  return apiClient.request<ProjectAlly>(`/allies/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteProjectAllyById(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/allies/${id}`, {
    method: "DELETE",
  });
}
