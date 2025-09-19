import { Media, StrapiComponent } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của một Icon component từ Strapi.
 * API ID: elements.icon
 */
export interface StrapiIcon extends StrapiComponent {
    __component: 'elements.icon';
    name?: string | null;
    iconImage?: Media | null;
    svgContent?: string | null;
    iconName?: string | null; // Tên icon từ thư viện react-icons, ví dụ: "RiStarFill"
}

/**
 * Cấu trúc dữ liệu của Icon đã được ánh xạ cho frontend.
 */
export type Icon = {
    id: number;
    name: string;
    imageUrl?: string | null;
    svgContent?: string | null;
    iconName?: string | null;
};