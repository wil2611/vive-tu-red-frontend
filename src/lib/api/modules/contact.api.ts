import { apiClient } from "../client";
import type { ContactMessage } from "../types";

export type CreateContactMessagePayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function createContactMessage(
  payload: CreateContactMessagePayload,
): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>("/contact", {
    method: "POST",
    body: payload,
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listUnreadContactMessages(): Promise<ContactMessage[]> {
  return apiClient.request<ContactMessage[]>("/contact/admin/unread");
}

export function listAllContactMessages(): Promise<ContactMessage[]> {
  return apiClient.request<ContactMessage[]>("/contact/admin/all");
}

export function markContactMessageAsRead(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/contact/admin/${id}/read`, {
    method: "PATCH",
  });
}

export function deleteContactMessage(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/contact/admin/${id}`, {
    method: "DELETE",
  });
}
