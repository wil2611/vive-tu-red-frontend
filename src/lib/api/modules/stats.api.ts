import { apiClient } from "../client";
import type { StatsDashboard, StatsOverview } from "../types";

export type CreatePageViewPayload = {
  path: string;
  referrer?: string;
  sessionId?: string;
};

export type InteractionType =
  | "book_read"
  | "resource_open"
  | "network_created"
  | "contact_submitted";

export type CreateInteractionPayload = {
  type: InteractionType;
  targetId?: string;
  targetType?: string;
  metadata?: Record<string, unknown>;
  sessionId?: string;
};

export function trackPageView(payload: CreatePageViewPayload): Promise<void> {
  return apiClient.request<void>("/stats/page-view", {
    method: "POST",
    body: payload,
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function trackInteraction(payload: CreateInteractionPayload): Promise<void> {
  return apiClient.request<void>("/stats/interaction", {
    method: "POST",
    body: payload,
    auth: false,
    retryOnUnauthorized: false,
  });
}

export function getStatsOverview(): Promise<StatsOverview> {
  return apiClient.request<StatsOverview>("/stats/overview");
}

export type GetStatsDashboardQuery = {
  rangeDays?: number;
  from?: string;
  to?: string;
};

function buildDashboardQueryString(query: GetStatsDashboardQuery = {}): string {
  const params = new URLSearchParams();
  if (query.rangeDays) params.set("rangeDays", String(query.rangeDays));
  if (query.from) params.set("from", query.from);
  if (query.to) params.set("to", query.to);
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export function getStatsDashboard(
  query: GetStatsDashboardQuery = {},
): Promise<StatsDashboard> {
  return apiClient.request<StatsDashboard>(
    `/stats/dashboard${buildDashboardQueryString(query)}`,
  );
}
