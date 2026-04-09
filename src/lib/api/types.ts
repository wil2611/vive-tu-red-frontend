export type UserRole = "admin" | "editor" | "investigador";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserRecord = AuthUser & {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

export type UpdateUserPayload = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
};

export type UpdateMyProfilePayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type ChangeMyPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "in_progress" | "responded";
  createdAt: string;
  updatedAt: string;
  readAt: string | null;
  ip?: string | null;
  userAgent?: string | null;
};

export type ListAdminContactMessagesQuery = {
  page?: number;
  limit?: number;
  status?: ContactMessage["status"];
  q?: string;
};

export type ContactMessagesPage = {
  items: ContactMessage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UpdateContactMessageStatusPayload = {
  status: ContactMessage["status"];
};

export type SupportPath = {
  id: string;
  institutionName: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  ubicacion: string | null;
  schedule: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateSupportPathPayload = {
  institutionName: string;
  description?: string;
  phone?: string;
  email?: string;
  ubicacion?: string;
  schedule?: string;
  isActive?: boolean;
};

export type UpdateSupportPathPayload = Partial<CreateSupportPathPayload>;

export type StatsRow = {
  path?: string;
  type?: string;
  views?: string | number;
  count?: string | number;
};

export type StatsOverview = {
  pageViews: {
    total: number;
    last30Days: number;
    last7Days: number;
  };
  interactions: {
    total: number;
    bookReads: number;
    resourceDownloads: number;
    networksCreated: number;
  };
  topPages: StatsRow[];
  interactionsByType: StatsRow[];
};

export type KpiMetric = {
  value: number;
  previousValue: number;
  changePct: number;
};

export type StatsDashboard = {
  range: {
    startDate: string;
    endDate: string;
    previousStartDate: string;
    previousEndDate: string;
    days: number;
  };
  kpis: {
    pageViews: KpiMetric;
    interactions: KpiMetric;
    uniqueSessions: KpiMetric;
    resourceDownloads: KpiMetric;
    bookReads: KpiMetric;
    networksCreated: KpiMetric;
    contactSubmitted: KpiMetric;
    engagementRate: KpiMetric;
  };
  series: {
    pageViewsByDay: Array<{ date: string; value: number }>;
    interactionsByDay: Array<{ date: string; value: number }>;
  };
  topPages: Array<{ path: string; views: number }>;
  interactionsByType: Array<{ type: string; count: number }>;
};
