import type { ResourceRecord } from "@/lib/api";
import {
  RESOURCE_CATEGORIES,
  type ResourceCategoryId,
  type ResourceCategoryMeta,
  normalizeResourceCategory,
} from "@/lib/resources/resource-categories";

export type ResourceCategory = ResourceCategoryMeta;

export const categories: ResourceCategory[] = RESOURCE_CATEGORIES;

export function getResourcesByCategory(
  resources: ResourceRecord[],
  category: ResourceCategoryId,
): ResourceRecord[] {
  return resources.filter((resource) => normalizeResourceCategory(resource.category) === category);
}
