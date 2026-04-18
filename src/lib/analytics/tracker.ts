import {
  trackInteraction,
  trackPageView,
  type CreateInteractionPayload,
} from "@/lib/api";
import { getOrCreateAnalyticsSessionId } from "./session";

function logAnalyticsError(error: unknown): void {
  if (process.env.NODE_ENV !== "development") return;
  console.warn("Analytics error", error);
}

export async function recordPageView(path: string, referrer?: string): Promise<void> {
  try {
    await trackPageView({
      path,
      referrer,
      sessionId: getOrCreateAnalyticsSessionId(),
    });
  } catch (error) {
    logAnalyticsError(error);
  }
}

export async function recordInteraction(
  payload: Omit<CreateInteractionPayload, "sessionId">,
): Promise<void> {
  try {
    await trackInteraction({
      ...payload,
      sessionId: getOrCreateAnalyticsSessionId(),
    });
  } catch (error) {
    logAnalyticsError(error);
  }
}
