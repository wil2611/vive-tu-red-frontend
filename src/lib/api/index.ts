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
  markContactMessageAsRead,
  updateContactMessageStatus,
} from "./modules/contact.api";
export {
  createSupportPath,
  deleteSupportPathById,
  listPublicSupportPaths,
  listSupportPathsAdmin,
  updateSupportPathById,
} from "./modules/support.api";
export {
  createResource,
  deleteResourceById,
  listPublishedResources,
  listResourcesAdmin,
  trackResourceOpen,
  updateResourceById,
} from "./modules/resources.api";
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
  CreateResourcePayload,
  CreateSupportPathPayload,
  CreateUserPayload,
  KpiMetric,
  ResourceRecord,
  ListAdminContactMessagesQuery,
  LoginPayload,
  SupportPath,
  StatsDashboard,
  StatsOverview,
  UpdateResourcePayload,
  UpdateMyProfilePayload,
  UpdateContactMessageStatusPayload,
  UpdateSupportPathPayload,
  UserRecord,
  UserRole,
} from "./types";
