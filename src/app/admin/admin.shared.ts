import type {
  CreateResourcePayload,
  CreateSupportPathPayload,
  CreateTeamMemberPayload,
  ResourceRecord,
  SupportPath,
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

export type SupportPathDraft = {
  institutionName: string;
  ubicacion: string;
  phone: string;
  email: string;
  schedule: string;
  isActive: boolean;
  description: string;
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

export type SupportCreateFormErrors = {
  institutionName?: string;
  ubicacion?: string;
  email?: string;
  phone?: string;
  schedule?: string;
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

export type StatsRangePreset = "7d" | "30d" | "90d" | "custom";

export type AdminSectionTab =
  | "summary"
  | "profile"
  | "users"
  | "support-paths"
  | "team"
  | "resources"
  | "messages";

export type MessageFilter = "all" | "new" | "in_progress" | "responded" | "read";

export const ADMIN_SECTION_TABS: Array<{ id: AdminSectionTab; label: string }> = [
  { id: "summary", label: "Resumen" },
  { id: "profile", label: "Mi perfil" },
  { id: "users", label: "Usuarios" },
  { id: "support-paths", label: "Instituciones" },
  { id: "team", label: "Equipo" },
  { id: "resources", label: "Recursos" },
  { id: "messages", label: "Mensajes" },
];

export const INITIAL_SUPPORT_FORM: CreateSupportPathPayload = {
  institutionName: "",
  ubicacion: "",
  phone: "",
  email: "",
  schedule: "",
  description: "",
  isActive: true,
};

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
const TEAM_IMAGE_ALLOWED_HOSTS = new Set([
  "plus.unsplash.com",
  "images.unsplash.com",
  "drive.google.com",
  "lh3.googleusercontent.com",
]);

export function getAllowedTabsByRole(role: UserRole | null): AdminSectionTab[] {
  if (role === "admin") {
    return ["summary", "profile", "users", "support-paths", "team", "resources", "messages"];
  }

  if (role === "editor") {
    return ["summary", "profile", "support-paths", "team", "resources", "messages"];
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

export function buildSupportDraft(path: SupportPath): SupportPathDraft {
  return {
    institutionName: path.institutionName,
    ubicacion: textOrEmpty(path.ubicacion),
    phone: textOrEmpty(path.phone),
    email: textOrEmpty(path.email),
    schedule: textOrEmpty(path.schedule),
    isActive: path.isActive,
    description: textOrEmpty(path.description),
  };
}

export function buildResourceDraft(resource: ResourceRecord): ResourceDraft {
  const normalizedCategory = normalizeResourceCategory(resource.category) ?? "prevencion";
  return {
    title: resource.title,
    description: textOrEmpty(resource.description),
    type: resource.type,
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

export function normalizeSupportCreateForm(
  form: CreateSupportPathPayload,
): CreateSupportPathPayload {
  return {
    ...form,
    institutionName: (form.institutionName ?? "").trim(),
    description: (form.description ?? "").trim(),
    ubicacion: (form.ubicacion ?? "").trim(),
    phone: (form.phone ?? "").trim(),
    email: (form.email ?? "").trim(),
    schedule: (form.schedule ?? "").trim(),
    isActive: form.isActive !== false,
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

export function validateSupportCreateForm(
  form: CreateSupportPathPayload,
): SupportCreateFormErrors {
  const errors: SupportCreateFormErrors = {};
  const institutionName = (form.institutionName ?? "").trim();
  const ubicacion = (form.ubicacion ?? "").trim();
  const email = (form.email ?? "").trim();
  const phone = (form.phone ?? "").trim();
  const schedule = (form.schedule ?? "").trim();

  if (institutionName.length < 3) {
    errors.institutionName = "El nombre debe tener al menos 3 caracteres.";
  }

  if (ubicacion.length < 2) {
    errors.ubicacion = "La ubicacion es obligatoria.";
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Ingresa un email valido.";
  }

  if (phone && !/^[\d+\s()\-]{3,25}$/.test(phone)) {
    errors.phone = "Telefono invalido. Usa solo numeros y simbolos basicos.";
  }

  if (schedule && schedule.length < 4) {
    errors.schedule = "El horario debe ser mas descriptivo.";
  }

  return errors;
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
