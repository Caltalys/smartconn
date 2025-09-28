import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiEntity } from "../strapi";
import { StrapiArticle } from "./article";

/**
 * Kiểu dữ liệu thô của Author từ Strapi.
 */
export interface StrapiAuthor extends StrapiEntity {
  name: string;
  email: string;
  avatar: BaseMedia | null;
  articles?: StrapiArticle[];
}

/**
 * Kiểu dữ liệu Author đã được ánh xạ cho frontend.
 */
export interface Author extends StrapiEntity {
  name: string;
  avatarUrl: string | null;
}

/**
 * Ánh xạ dữ liệu thô của một Author từ Strapi sang cấu trúc cho frontend.
 * @param author - Dữ liệu thô của author.
 * @returns Dữ liệu author đã được ánh xạ.
 */
export function mapAuthor(author: StrapiAuthor): Author {
  return {
    ...author,
    avatarUrl: author.avatar ? getStrapiMedia(author.avatar.url) : null,
  };
}
