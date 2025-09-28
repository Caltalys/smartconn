import { StrapiEntity } from "../strapi";
import { StrapiArticle } from "./article";

/**
 * Kiểu dữ liệu thô của Category từ Strapi.
 */
export interface StrapiCategory extends StrapiEntity {
  name: string;
  slug: string;
  description?: string | null;
  articles?: StrapiArticle[];
}

/**
 * Kiểu dữ liệu Category đã được ánh xạ cho frontend.
 */
export interface Category extends StrapiEntity {
  name: string;
  slug: string;
}

/**
 * Ánh xạ dữ liệu thô của một Category từ Strapi sang cấu trúc cho frontend.
 * @param category - Dữ liệu thô của category.
 * @returns Dữ liệu category đã được ánh xạ.
 */
export function mapCategory(category: StrapiCategory): Category {
  return {
    ...category,
  };
}
