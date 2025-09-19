import { StrapiComponent } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của một Link Component từ Strapi.
 * API ID: element.link
 */
export interface StrapiLink extends StrapiComponent {
  text: string;
  url: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  isExternal: boolean;
}

/**
 * Cấu trúc dữ liệu của một Link đã được ánh xạ cho frontend.
 * Tên trường được đổi để nhất quán hơn (text -> label, url -> href).
 */
export interface Link {
    id: number;
    label: string;
    href: string;
    target: '_blank' | '_self' | '_parent' | '_top';
    isExternal: boolean;
}
