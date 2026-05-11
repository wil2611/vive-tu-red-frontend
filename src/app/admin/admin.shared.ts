import type {
  CreateNewsPayload,
  CreateProjectAllyPayload,
  CreateResourcePayload,
  CreateTeamMemberPayload,
  NewsItem,
  ProjectAlly,
  ProjectAllyType,
  ResourceRecord,
  TeamMember,
  UserRole,
} from "@/lib/api";
import {
  RESOURCE_CATEGORIES,
  type ResourceCategoryId,
  normalizeResourceCategory,
} from "@/lib/resources/resource-categories";

export type UserDraft = {
  role: UserRole;
  isActive: boolean;
};

export type ResourceDraft = {
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  category: ResourceCategoryId;
  tags: string;
  isPublished: boolean;
};

export type TeamMemberDraft = {
  name: string;
  profile: string;
  department: string;
  division: string;
  photo: string;
  isActive: boolean;
};

export type ProjectAllyDraft = {
  institutionName: string;
  roleLabel: string;
  type: ProjectAllyType;
  summary: string;
  participationScope: string;
  isActive: boolean;
};

export type NewsDraft = {
  title: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  coverImageAlt: string;
  authorName: string;
  isPublished: boolean;
  publishedAt: string;
};

export type ResourceCreateFormErrors = {
  title?: string;
  type?: string;
  category?: string;
  fileUrl?: string;
  tags?: string;
};

export type TeamCreateFormErrors = {
  name?: string;
  profile?: string;
  photo?: string;
};

export type AllyCreateFormErrors = {
  institutionName?: string;
  roleLabel?: string;
  summary?: string;
  participationScope?: string;
};

export type NewsCreateFormErrors = {
  title?: string;
  excerpt?: string;
  body?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  authorName?: string;
  publishedAt?: string;
};

export type StatsRangePreset = "7d" | "30d" | "90d" | "custom";

export type AdminSectionTab =
  | "summary"
  | "profile"
  | "users"
  | "allies"
  | "news"
  | "team"
  | "resources"
  | "messages";

export type MessageFilter = "all" | "new" | "in_progress" | "responded" | "read";

export const ADMIN_SECTION_TABS: Array<{ id: AdminSectionTab; label: string }> = [
  { id: "summary", label: "Resumen" },
  { id: "profile", label: "Mi perfil" },
  { id: "users", label: "Usuarios" },
  { id: "allies", label: "Aliados" },
  { id: "news", label: "Noticias" },
  { id: "team", label: "Equipo" },
  { id: "resources", label: "Recursos" },
  { id: "messages", label: "Mensajes" },
];

export const INITIAL_RESOURCE_FORM: CreateResourcePayload = {
  title: "",
  description: "",
  type: "pdf",
  fileUrl: "",
  category: "prevencion",
  tags: [],
  isPublished: true,
};

export const INITIAL_TEAM_FORM: CreateTeamMemberPayload = {
  name: "",
  profile: "",
  department: "",
  division: "",
  photo: "",
  isActive: true,
};

export const INITIAL_ALLY_FORM: CreateProjectAllyPayload = {
  institutionName: "",
  roleLabel: "Aliado clave",
  type: "ally",
  summary: "",
  participationScope: "",
  isActive: true,
};

export const INITIAL_NEWS_FORM: CreateNewsPayload = {
  title: "",
  excerpt: "",
  body: "",
  coverImageUrl: "",
  coverImageAlt: "",
  authorName: "",
  isPublished: true,
  publishedAt: "",
};

export const RESOURCE_CATEGORY_OPTIONS = RESOURCE_CATEGORIES;
export const RESOURCE_TITLE_MAX_LENGTH = 255;
export const RESOURCE_TYPE_MAX_LENGTH = 120;
export const RESOURCE_FILE_URL_MAX_LENGTH = 2048;
export const RESOURCE_DESCRIPTION_MAX_LENGTH = 5000;
export const RESOURCE_TAG_MAX_LENGTH = 80;
export const RESOURCE_TAGS_MAX_COUNT = 30;
export const TEAM_NAME_MAX_LENGTH = 255;
export const TEAM_PROFILE_MAX_LENGTH = 5000;
export const TEAM_DEPARTMENT_MAX_LENGTH = 255;
export const TEAM_DIVISION_MAX_LENGTH = 255;
export const TEAM_PHOTO_MAX_LENGTH = 2048;
export const ALLY_INSTITUTION_NAME_MAX_LENGTH = 255;
export const ALLY_ROLE_LABEL_MAX_LENGTH = 120;
export const ALLY_SUMMARY_MAX_LENGTH = 5000;
export const ALLY_PARTICIPATION_SCOPE_MAX_LENGTH = 5000;
export const NEWS_TITLE_MAX_LENGTH = 255;
export const NEWS_EXCERPT_MAX_LENGTH = 300;
export const NEWS_BODY_MAX_LENGTH = 50000;
export const NEWS_COVER_IMAGE_URL_MAX_LENGTH = 2048;
export const NEWS_COVER_IMAGE_ALT_MAX_LENGTH = 180;
export const NEWS_AUTHOR_NAME_MAX_LENGTH = 120;
const TEAM_IMAGE_ALLOWED_HOSTS = new Set([
  "plus.unsplash.com",
  "images.unsplash.com",
  "drive.google.com",
  "lh3.googleusercontent.com",
]);

export function getAllowedTabsByRole(role: UserRole | null): AdminSectionTab[] {
  if (role === "admin") {
    return [
      "summary",
      "profile",
      "users",
      "allies",
      "news",
      "team",
      "resources",
      "messages",
    ];
  }

  if (role === "editor") {
    return [
      "summary",
      "profile",
      "allies",
      "news",
      "team",
      "resources",
      "messages",
    ];
  }

  if (role === "investigador") {
    return ["summary", "profile", "messages"];
  }

  return [];
}

export function roleLabel(role: UserRole): string {
  if (role === "admin") return "Admin";
  if (role === "editor") return "Editor";
  return "Investigador";
}

export function textOrEmpty(value: string | null): string {
  return value ?? "";
}

function isSafeHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function isAllowedTeamPhotoUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.toLowerCase();

    if (TEAM_IMAGE_ALLOWED_HOSTS.has(hostname)) {
      return true;
    }

    if (hostname === "docs.google.com") {
      return true;
    }

    return hostname.endsWith(".sharepoint.com") || hostname === "sharepoint.com";
  } catch {
    return false;
  }
}

export function buildResourceDraft(resource: ResourceRecord): ResourceDraft {
  const normalizedCategory = normalizeResourceCategory(resource.category) ?? "prevencion";
  return {
    title: textOrEmpty(resource.title),
    description: textOrEmpty(resource.description),
    type: textOrEmpty(resource.type),
    fileUrl: textOrEmpty(resource.fileUrl),
    category: normalizedCategory,
    tags: (resource.tags ?? []).join(", "),
    isPublished: resource.isPublished,
  };
}

export function buildTeamMemberDraft(teamMember: TeamMember): TeamMemberDraft {
  return {
    name: teamMember.name,
    profile: teamMember.profile,
    department: textOrEmpty(teamMember.department),
    division: textOrEmpty(teamMember.division),
    photo: textOrEmpty(teamMember.photo),
    isActive: teamMember.isActive,
  };
}

export function buildProjectAllyDraft(projectAlly: ProjectAlly): ProjectAllyDraft {
  return {
    institutionName: projectAlly.institutionName,
    roleLabel: projectAlly.roleLabel,
    type: projectAlly.type,
    summary: projectAlly.summary,
    participationScope: projectAlly.participationScope,
    isActive: projectAlly.isActive,
  };
}

function toDateTimeLocalValue(value: string | null): string {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  const localDate = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

export function buildNewsDraft(newsItem: NewsItem): NewsDraft {
  return {
    title: newsItem.title,
    excerpt: textOrEmpty(newsItem.excerpt),
    body: newsItem.body,
    coverImageUrl: textOrEmpty(newsItem.coverImageUrl),
    coverImageAlt: textOrEmpty(newsItem.coverImageAlt),
    authorName: textOrEmpty(newsItem.authorName),
    isPublished: newsItem.isPublished,
    publishedAt: toDateTimeLocalValue(newsItem.publishedAt),
  };
}

function normalizeTags(tagsInput: string): string[] {
  const unique = new Set<string>();

  for (const rawTag of tagsInput.split(",")) {
    const tag = rawTag.trim();
    if (!tag) continue;
    unique.add(tag);
  }

  return Array.from(unique);
}

export function normalizeResourceCreateForm(
  form: CreateResourcePayload,
): CreateResourcePayload {
  const normalizedCategory = normalizeResourceCategory(form.category) ?? "prevencion";
  return {
    ...form,
    title: (form.title ?? "").trim(),
    description: (form.description ?? "").trim(),
    type: (form.type ?? "").trim(),
    fileUrl: (form.fileUrl ?? "").trim(),
    category: normalizedCategory,
    tags: normalizeTags(Array.isArray(form.tags) ? form.tags.join(",") : ""),
    isPublished: form.isPublished !== false,
  };
}

export function normalizeTeamCreateForm(
  form: CreateTeamMemberPayload,
): CreateTeamMemberPayload {
  return {
    ...form,
    name: (form.name ?? "").trim(),
    profile: (form.profile ?? "").trim(),
    department: (form.department ?? "").trim(),
    division: (form.division ?? "").trim(),
    photo: (form.photo ?? "").trim(),
    isActive: form.isActive !== false,
  };
}

export function normalizeProjectAllyCreateForm(
  form: CreateProjectAllyPayload,
): CreateProjectAllyPayload {
  return {
    ...form,
    institutionName: (form.institutionName ?? "").trim(),
    roleLabel: (form.roleLabel ?? "").trim(),
    summary: (form.summary ?? "").trim(),
    participationScope: (form.participationScope ?? "").trim(),
    isActive: form.isActive !== false,
  };
}

export function normalizeNewsCreateForm(form: CreateNewsPayload): CreateNewsPayload {
  return {
    ...form,
    title: (form.title ?? "").trim(),
    excerpt: (form.excerpt ?? "").trim(),
    body: (form.body ?? "").trim(),
    coverImageUrl: (form.coverImageUrl ?? "").trim(),
    coverImageAlt: (form.coverImageAlt ?? "").trim(),
    authorName: (form.authorName ?? "").trim(),
    publishedAt: (form.publishedAt ?? "").trim(),
    isPublished: form.isPublished !== false,
  };
}

export function validateResourceCreateForm(
  form: CreateResourcePayload,
): ResourceCreateFormErrors {
  const errors: ResourceCreateFormErrors = {};
  const title = (form.title ?? "").trim();
  const type = (form.type ?? "").trim();
  const category = normalizeResourceCategory(form.category);
  const fileUrl = (form.fileUrl ?? "").trim();
  const normalizedTags = (form.tags ?? [])
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (title.length < 3) {
    errors.title = "El titulo debe tener al menos 3 caracteres.";
  } else if (title.length > RESOURCE_TITLE_MAX_LENGTH) {
    errors.title = `El titulo no puede superar ${RESOURCE_TITLE_MAX_LENGTH} caracteres.`;
  }

  if (type.length < 2) {
    errors.type = "El tipo del recurso es obligatorio.";
  } else if (type.length > RESOURCE_TYPE_MAX_LENGTH) {
    errors.type = `El tipo no puede superar ${RESOURCE_TYPE_MAX_LENGTH} caracteres.`;
  }

  if (!category) {
    errors.category = "Selecciona una categoria valida.";
  }

  if (fileUrl && !isSafeHttpUrl(fileUrl)) {
    errors.fileUrl = "El enlace del archivo debe iniciar con http:// o https://.";
  } else if (fileUrl.length > RESOURCE_FILE_URL_MAX_LENGTH) {
    errors.fileUrl = `El enlace no puede superar ${RESOURCE_FILE_URL_MAX_LENGTH} caracteres.`;
  }

  if (form.isPublished !== false && !fileUrl) {
    errors.fileUrl = "Si el recurso esta publicado, debes agregar el enlace del archivo.";
  }

  if (normalizedTags.length > RESOURCE_TAGS_MAX_COUNT) {
    errors.tags = `No puedes usar mas de ${RESOURCE_TAGS_MAX_COUNT} tags en un recurso.`;
  } else if (normalizedTags.some((tag) => tag.length > RESOURCE_TAG_MAX_LENGTH)) {
    errors.tags = `Cada tag debe tener maximo ${RESOURCE_TAG_MAX_LENGTH} caracteres.`;
  }

  return errors;
}

export function validateProjectAllyCreateForm(
  form: CreateProjectAllyPayload,
): AllyCreateFormErrors {
  const errors: AllyCreateFormErrors = {};
  const institutionName = (form.institutionName ?? "").trim();
  const roleLabel = (form.roleLabel ?? "").trim();
  const summary = (form.summary ?? "").trim();
  const participationScope = (form.participationScope ?? "").trim();

  if (institutionName.length < 3) {
    errors.institutionName = "La institucion debe tener al menos 3 caracteres.";
  } else if (institutionName.length > ALLY_INSTITUTION_NAME_MAX_LENGTH) {
    errors.institutionName =
      `La institucion no puede superar ${ALLY_INSTITUTION_NAME_MAX_LENGTH} caracteres.`;
  }

  if (roleLabel.length < 3) {
    errors.roleLabel = "El rol visible debe tener al menos 3 caracteres.";
  } else if (roleLabel.length > ALLY_ROLE_LABEL_MAX_LENGTH) {
    errors.roleLabel = `El rol visible no puede superar ${ALLY_ROLE_LABEL_MAX_LENGTH} caracteres.`;
  }

  if (summary.length < 10) {
    errors.summary = "El resumen debe tener al menos 10 caracteres.";
  } else if (summary.length > ALLY_SUMMARY_MAX_LENGTH) {
    errors.summary = `El resumen no puede superar ${ALLY_SUMMARY_MAX_LENGTH} caracteres.`;
  }

  if (participationScope.length < 10) {
    errors.participationScope = "El alcance de participacion debe tener al menos 10 caracteres.";
  } else if (participationScope.length > ALLY_PARTICIPATION_SCOPE_MAX_LENGTH) {
    errors.participationScope =
      `El alcance no puede superar ${ALLY_PARTICIPATION_SCOPE_MAX_LENGTH} caracteres.`;
  }

  return errors;
}

export function validateTeamCreateForm(
  form: CreateTeamMemberPayload,
): TeamCreateFormErrors {
  const errors: TeamCreateFormErrors = {};
  const name = (form.name ?? "").trim();
  const profile = (form.profile ?? "").trim();
  const photo = (form.photo ?? "").trim();

  if (name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres.";
  } else if (name.length > TEAM_NAME_MAX_LENGTH) {
    errors.name = `El nombre no puede superar ${TEAM_NAME_MAX_LENGTH} caracteres.`;
  }

  if (profile.length < 20) {
    errors.profile = "El perfil debe tener al menos 20 caracteres.";
  } else if (profile.length > TEAM_PROFILE_MAX_LENGTH) {
    errors.profile = `El perfil no puede superar ${TEAM_PROFILE_MAX_LENGTH} caracteres.`;
  }

  if (photo && !isSafeHttpUrl(photo)) {
    errors.photo = "La foto debe ser una URL con http:// o https://.";
  } else if (photo && !isAllowedTeamPhotoUrl(photo)) {
    errors.photo =
      "Dominio de foto no permitido. Usa Drive, SharePoint o agrega el dominio a next.config.ts.";
  } else if (photo.length > TEAM_PHOTO_MAX_LENGTH) {
    errors.photo = `La URL de la foto no puede superar ${TEAM_PHOTO_MAX_LENGTH} caracteres.`;
  }

  return errors;
}

export function validateNewsCreateForm(form: CreateNewsPayload): NewsCreateFormErrors {
  const errors: NewsCreateFormErrors = {};
  const title = (form.title ?? "").trim();
  const excerpt = (form.excerpt ?? "").trim();
  const body = (form.body ?? "").trim();
  const coverImageUrl = (form.coverImageUrl ?? "").trim();
  const coverImageAlt = (form.coverImageAlt ?? "").trim();
  const authorName = (form.authorName ?? "").trim();
  const publishedAt = (form.publishedAt ?? "").trim();

  if (title.length < 3) {
    errors.title = "El titulo debe tener al menos 3 caracteres.";
  } else if (title.length > NEWS_TITLE_MAX_LENGTH) {
    errors.title = `El titulo no puede superar ${NEWS_TITLE_MAX_LENGTH} caracteres.`;
  }

  if (excerpt.length > NEWS_EXCERPT_MAX_LENGTH) {
    errors.excerpt = `El resumen no puede superar ${NEWS_EXCERPT_MAX_LENGTH} caracteres.`;
  }

  if (body.length < 30) {
    errors.body = "El cuerpo debe tener al menos 30 caracteres.";
  } else if (body.length > NEWS_BODY_MAX_LENGTH) {
    errors.body = `El cuerpo no puede superar ${NEWS_BODY_MAX_LENGTH} caracteres.`;
  }

  if (coverImageUrl && !isSafeHttpUrl(coverImageUrl)) {
    errors.coverImageUrl = "La portada debe ser una URL con http:// o https://.";
  } else if (coverImageUrl.length > NEWS_COVER_IMAGE_URL_MAX_LENGTH) {
    errors.coverImageUrl =
      `La URL de portada no puede superar ${NEWS_COVER_IMAGE_URL_MAX_LENGTH} caracteres.`;
  }

  if (coverImageAlt.length > NEWS_COVER_IMAGE_ALT_MAX_LENGTH) {
    errors.coverImageAlt =
      `El texto alternativo no puede superar ${NEWS_COVER_IMAGE_ALT_MAX_LENGTH} caracteres.`;
  } else if (coverImageAlt && !coverImageUrl) {
    errors.coverImageAlt = "Agrega una URL de portada antes de definir texto alternativo.";
  }

  if (authorName.length > NEWS_AUTHOR_NAME_MAX_LENGTH) {
    errors.authorName =
      `El nombre de autora/or no puede superar ${NEWS_AUTHOR_NAME_MAX_LENGTH} caracteres.`;
  }

  if (publishedAt) {
    const parsed = new Date(publishedAt);
    if (Number.isNaN(parsed.getTime())) {
      errors.publishedAt = "La fecha de publicacion no es valida.";
    }
  }

  return errors;
}
