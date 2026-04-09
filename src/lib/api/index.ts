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
  syncCurrentAuthUser,
} from "./modules/auth.api";
export {
  changeMyPassword,
  createUser,
  deleteUserById,
  getCurrentUser,
  listUsers,
  updateMyProfile,
  updateUserById,
} from "./modules/users.api";
export {
  createContactMessage,
  deleteContactMessage,
  listAdminContactMessages,
  listAllContactMessages,
  listUnreadContactMessages,
  markContactMessageAsRead,
  updateContactMessageStatus,
} from "./modules/contact.api";
export {
  createSupportPath,
  deleteSupportPathById,
  listEmergencySupportPaths,
  listPublicSupportPaths,
  listSupportPathsAdmin,
  updateSupportPathById,
} from "./modules/support.api";
export {
  getStatsDashboard,
  getStatsOverview,
  trackInteraction,
  trackPageView,
  type CreateInteractionPayload,
  type CreatePageViewPayload,
  type GetStatsDashboardQuery,
  type InteractionType,
} from "./modules/stats.api";
export type {
  AuthSession,
  ChangeMyPasswordPayload,
  ContactMessage,
  ContactMessagesPage,
  CreateSupportPathPayload,
  CreateUserPayload,
  KpiMetric,
  ListAdminContactMessagesQuery,
  LoginPayload,
  SupportPath,
  StatsDashboard,
  StatsOverview,
  UpdateMyProfilePayload,
  UpdateContactMessageStatusPayload,
  UpdateSupportPathPayload,
  UserRecord,
  UserRole,
} from "./types";
