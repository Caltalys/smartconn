/**
 * @file src/types/strapi/shared.ts
 * @description Chứa các interface và type có thể tái sử dụng trên nhiều loại nội dung Strapi.
 */

/**
 * Cấu trúc dữ liệu cho các liên kết mạng xã hội.
 */
export interface SocialLinksData {
    facebookUrl?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
}

/** Cấu trúc dữ liệu cho thông tin liên hệ cơ bản. */
export interface ContactInfoData {
    phoneNumber: string | null;
    email: string | null;
    address: string | null;
}