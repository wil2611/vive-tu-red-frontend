export {
  DEFAULT_API_BASE_URL,
  getApiBaseUrl,
  normalizeApiBaseUrl,
  resetApiBaseUrl,
  setApiBaseUrl,
} from "./config";
export { ApiClientError, apiClient } from "./client";
export {
  clearAuthSession,
  getCurrentAuthSession,
  loginWithPassword,
  logoutAuthSession,
} from "./modules/auth.api";
export {
  createUser,
  deleteUserById,
  getCurrentUser,
  listUsers,
  updateUserById,
} from "./modules/users.api";
export {
  createContactMessage,
  deleteContactMessage,
  listAllContactMessages,
  listUnreadContactMessages,
  markContactMessageAsRead,
} from "./modules/contact.api";
export {
  getStatsDashboard,
  getStatsOverview,
  trackInteraction,
  trackPageView,
  type CreateInteractionPayload,
  type CreatePageViewPayload,
  type GetStatsDashboardQuery,
} from "./modules/stats.api";
export type {
  AuthSession,
  ContactMessage,
  CreateUserPayload,
  KpiMetric,
  LoginPayload,
  StatsDashboard,
  StatsOverview,
  UserRecord,
  UserRole,
} from "./types";
