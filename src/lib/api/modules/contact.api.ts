import { apiClient } from "../client";
import type {
  ContactMessage,
  ContactMessagesPage,
  ListAdminContactMessagesQuery,
  UpdateContactMessageStatusPayload,
} from "../types";

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

export function listAdminContactMessages(
  query: ListAdminContactMessagesQuery = {},
): Promise<ContactMessagesPage> {
  const params = new URLSearchParams();

  if (typeof query.page === "number" && Number.isFinite(query.page)) {
    params.set("page", String(query.page));
  }

  if (typeof query.limit === "number" && Number.isFinite(query.limit)) {
    params.set("limit", String(query.limit));
  }

  if (query.status) {
    params.set("status", query.status);
  }

  const searchText = (query.q ?? "").trim();
  if (searchText) {
    params.set("q", searchText);
  }

  const queryString = params.toString();
  const path = queryString ? `/contact/admin/messages?${queryString}` : "/contact/admin/messages";

  return apiClient.request<ContactMessagesPage>(path);
}

export function markContactMessageAsRead(
  id: string,
): Promise<{ message: string; item: ContactMessage }> {
  return apiClient.request<{ message: string; item: ContactMessage }>(`/contact/admin/${id}/read`, {
    method: "PATCH",
  });
}

export function updateContactMessageStatus(
  id: string,
  payload: UpdateContactMessageStatusPayload,
): Promise<{ message: string; item: ContactMessage }> {
  return apiClient.request<{ message: string; item: ContactMessage }>(`/contact/admin/${id}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export function deleteContactMessage(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/contact/admin/${id}`, {
    method: "DELETE",
  });
}
