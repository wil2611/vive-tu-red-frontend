import { apiClient } from "../client";
import type { CreateNewsPayload, NewsItem, UpdateNewsPayload } from "../types";

export function listPublishedNews(): Promise<NewsItem[]> {
  return apiClient.request<NewsItem[]>("/news", {
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function listNewsAdmin(): Promise<NewsItem[]> {
  return apiClient.request<NewsItem[]>("/news/admin/all");
}

export function createNews(payload: CreateNewsPayload): Promise<NewsItem> {
  return apiClient.request<NewsItem>("/news", {
    method: "POST",
    body: payload,
  });
}

export function updateNewsById(id: string, payload: UpdateNewsPayload): Promise<NewsItem> {
  return apiClient.request<NewsItem>(`/news/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function deleteNewsById(id: string): Promise<{ message: string }> {
  return apiClient.request<{ message: string }>(`/news/${id}`, {
    method: "DELETE",
  });
}
