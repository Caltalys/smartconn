import { StrapiMetadata } from "../strapi";
import { ContactInfoData, SocialLinksData } from "../shared";

/**
 * Cấu trúc dữ liệu thô của Topbar từ API Strapi (đã qua transformer).
 * Nó bao gồm tất cả các trường được trả về, kể cả các liên kết mạng xã hội và metadata.
 * Đây là "Source of Truth" từ API.
 */
export interface StrapiTopbar extends SocialLinksData, ContactInfoData, StrapiMetadata {
    message: string | null;
    ctaButtonText: string | null;
    ctaButtonUrl: string | null;
}

/**
 * Cấu trúc Topbar cuối cùng, đã được đơn giản hóa để sử dụng ở frontend component.
 * Nó được suy ra từ `StrapiTopbar` bằng cách loại bỏ các trường metadata không cần thiết.
 * Đây là "Destination" sau khi mapping.
 */
export type Topbar = Omit<StrapiTopbar, 'createdAt' | 'updatedAt' | 'publishedAt' | 'locale'>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một document đơn lẻ.
 */
export interface TopbarResponse {
  data: StrapiTopbar;
  meta: Record<string, unknown>;
}