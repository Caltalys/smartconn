import { Media } from "../strapi";

/**
 * Dữ liệu thô của một Author từ API Strapi (đã qua transformer).
 */
export interface StrapiAuthor {
    id: number;
    name: string;
    avatar: Media | null;
    email: string | null;
    createdAt: string;
    updatedAt:string;
    publishedAt: string;
    locale: string;
}

/**
 * Dữ liệu Author đã được ánh xạ và đơn giản hóa cho frontend.
 */
export type Author = {
    id: number;
    name: string;
    avatarUrl: string | null;
};