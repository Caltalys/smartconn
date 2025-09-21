import { Link, StrapiLink } from "../elements/link";
import { ContactInfoData, SocialLinksData } from "../shared";
import { StrapiMetadata } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của Footer từ API Strapi (đã qua transformer).
 * Đây là "Source of Truth" từ API.
 */
export interface StrapiFooter extends SocialLinksData, ContactInfoData, StrapiMetadata {
    description: string | null;
    contactInfoTitle: string | null;
    quickLinksTitle: string | null;
    quickLinks: StrapiLink[];
    copyright: string | null;
}

/** Cấu trúc Footer cuối cùng, đã được đơn giản hóa để sử dụng ở frontend. */
export type Footer = Omit<StrapiFooter, 'createdAt' | 'updatedAt' | 'publishedAt' | 'locale' | 'quickLinks'> & {
    quickLinks: Link[];
};

/** Lớp vỏ (wrapper) của Strapi cho một document đơn lẻ. */
export interface FooterResponse {
  data: StrapiFooter;
  meta: Record<string, unknown>;
}
