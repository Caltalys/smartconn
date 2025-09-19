import { StrapiComponent, Media } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của một Partner Item từ Strapi.
 * Component này có thể tái sử dụng.
 * API ID: elements.partner-item
 */
export interface StrapiPartnerItem extends StrapiComponent {
    __component: 'elements.partner-item';
    heading: string;
    href: string;
    image: Media;
}

/**
 * Cấu trúc dữ liệu của Partner Item đã được ánh xạ cho frontend.
 */
export type PartnerItem = {
    id: number;
    name: string;
    logoUrl: string;
    href: string;
    alt: string;
};

/**
 * Cấu trúc dữ liệu thô của Partners Section từ Strapi.
 * API ID: sections.partners
 */
export interface StrapiPartnersSection extends StrapiComponent {
    __component: 'sections.partners';
    title?: string | null; // Sẽ được map thành pretitle
    heading: string;      // Sẽ được map thành title
    items: StrapiPartnerItem[];
}

/**
 * Cấu trúc dữ liệu của Partners Section đã được ánh xạ cho frontend.
 */
export type PartnersSectionData = {
    id: number;
    __component: 'sections.partners';
    pretitle: string;
    title: string;
    items: PartnerItem[];
};