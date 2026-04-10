import { apiClient } from "../client";
import type { CreateTeamMemberPayload, TeamMember, UpdateTeamMemberPayload } from "../types";

export function listPublicTeamMembers(): Promise<TeamMember[]> {
  return apiClient.request<TeamMember[]>("/team", {
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listTeamMembersAdmin(): Promise<TeamMember[]> {
  return apiClient.request<TeamMember[]>("/team/admin/all");
}

export function createTeamMember(payload: CreateTeamMemberPayload): Promise<TeamMember> {
  return apiClient.request<TeamMember>("/team", {
    method: "POST",
    body: payload,
  });
}

export function updateTeamMemberById(
  id: string,
  payload: UpdateTeamMemberPayload,
): Promise<TeamMember> {
  return apiClient.request<TeamMember>(`/team/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteTeamMemberById(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/team/${id}`, {
    method: "DELETE",
  });
}
