import type {
  CreateSupportPathPayload,
  SupportPath,
  UserRole,
} from "@/lib/api";

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

export type SupportCreateFormErrors = {
  institutionName?: string;
  ubicacion?: string;
  email?: string;
  phone?: string;
  schedule?: string;
};

export type StatsRangePreset = "7d" | "30d" | "90d" | "custom";

export type AdminSectionTab = "summary" | "profile" | "users" | "support-paths" | "messages";

export type MessageFilter = "all" | "new" | "in_progress" | "responded" | "read";

export const ADMIN_SECTION_TABS: Array<{ id: AdminSectionTab; label: string }> = [
  { id: "summary", label: "Resumen" },
  { id: "profile", label: "Mi perfil" },
  { id: "users", label: "Usuarios" },
  { id: "support-paths", label: "Instituciones" },
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

export function getAllowedTabsByRole(role: UserRole | null): AdminSectionTab[] {
  if (role === "admin") {
    return ["summary", "profile", "users", "support-paths", "messages"];
  }

  if (role === "editor" || role === "investigador") {
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
