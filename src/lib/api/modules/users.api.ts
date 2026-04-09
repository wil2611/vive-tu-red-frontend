import { apiClient } from "../client";
import type {
  ChangeMyPasswordPayload,
  CreateUserPayload,
  UpdateMyProfilePayload,
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

export function updateMyProfile(payload: UpdateMyProfilePayload): Promise<UserRecord> {
  return apiClient.request<UserRecord>("/users/me", {
    method: "PUT",
    body: payload,
  });
}

export function changeMyPassword(
  payload: ChangeMyPasswordPayload,
): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>("/users/me/change-password", {
    method: "PATCH",
    body: payload,
  });
}

export function deleteUserById(userId: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/users/${userId}`, {
    method: "DELETE",
  });
}
