import { StrapiAuthor, Author } from "./author";
import { Block, Media } from "../strapi";
import { Category, StrapiCategory } from "./category";

/**
 * Dữ liệu thô của một Article từ API Strapi (đã qua transformer).
 */
export interface StrapiArticle {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    cover: Media | null;
    author: StrapiAuthor | null;
    category: StrapiCategory | null;
    blocks: Block[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string;
}

/**
 * Dữ liệu Article đã được ánh xạ cho frontend.
 * Đây là kiểu dữ liệu chính được sử dụng trong các component.
 */
export type Article = {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    cover: Media | null;
    author: Author | null;
    category: Category | null;
    blocks: Block[] | null;
    publishedAt: string | null;
};