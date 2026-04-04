import { apiClient } from "../client";
import type {
  CreateUserPayload,
  UpdateUserPayload,
  UserRecord,
} from "../types";

export function getCurrentUser(): Promise<UserRecord> {
  return apiClient.request<UserRecord>("/users/me");
}

export function listUsers(): Promise<UserRecord[]> {
  return apiClient.request<UserRecord[]>("/users");
}

export function createUser(payload: CreateUserPayload): Promise<UserRecord> {
  return apiClient.request<UserRecord>("/users", {
    method: "POST",
    body: payload,
  });
}

export function updateUserById(
  userId: string,
  payload: UpdateUserPayload,
): Promise<UserRecord> {
  return apiClient.request<UserRecord>(`/users/${userId}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteUserById(userId: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/users/${userId}`, {
    method: "DELETE",
  });
}
