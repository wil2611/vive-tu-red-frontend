export const RESOURCE_CATEGORY_IDS = ["prevencion", "orientacion", "formacion"] as const;

export type ResourceCategoryId = (typeof RESOURCE_CATEGORY_IDS)[number];

export type ResourceCategoryMeta = {
  id: ResourceCategoryId;
  label: string;
  color: string;
  hint: string;
};

export const RESOURCE_CATEGORIES: ResourceCategoryMeta[] = [
  { id: "prevencion", label: "Prevencion", color: "#C96A4A", hint: "Senales y prevencion" },
  { id: "orientacion", label: "Orientacion", color: "#00555A", hint: "Rutas y acompanamiento" },
  { id: "formacion", label: "Formacion", color: "#1D3E2A", hint: "Guias y metodologia" },
];

function stripAccents(input: string): string {
  return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeResourceCategory(value: string | null | undefined): ResourceCategoryId | null {
  if (!value) return null;
  const normalized = stripAccents(value).trim().toLowerCase();
  if (!normalized) return null;

  if (normalized === "prevencion") return "prevencion";
  if (normalized === "orientacion") return "orientacion";
  if (normalized === "formacion") return "formacion";
  return null;
}

export function getResourceCategoryMeta(
  value: string | null | undefined,
): ResourceCategoryMeta | null {
  const id = normalizeResourceCategory(value);
  if (!id) return null;
  return RESOURCE_CATEGORIES.find((item) => item.id === id) ?? null;
}
