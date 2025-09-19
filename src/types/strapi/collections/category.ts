/**
 * Cấu trúc dữ liệu thô của một Category từ API Strapi.
 */
export interface StrapiCategory {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
}

/**
 * Cấu trúc dữ liệu của một Category đã được ánh xạ cho frontend.
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
}