import { AboutSectionData, StrapiAboutSection } from "./sections/about";
import {
  AdvantagesSectionData,
  StrapiAdvantagesSection,
} from "./sections/advantages";
import { BlogSectionData, StrapiBlogSection } from "./sections/blog";
import { HeroSection, StrapiHeroSection } from "./sections/hero";
import {
  PartnersSectionData,
  StrapiPartnersSection,
} from "./sections/partners";
import {
  ServicesSectionData,
  StrapiServicesSection,
} from "./sections/services";
import { Media } from "./strapi";

// --- Union type cho tất cả các section component có thể có ---
// Sẽ được mở rộng khi có thêm các section mới.
export type AnyStrapiSection =
  | StrapiHeroSection
  | StrapiAboutSection
  | StrapiServicesSection
  | StrapiAdvantagesSection
  | StrapiPartnersSection
  | StrapiBlogSection;
  
export type AnySection =
  | HeroSection
  | AboutSectionData
  | ServicesSectionData
  | AdvantagesSectionData
  | PartnersSectionData
  | BlogSectionData;

/**
 * Cấu trúc dữ liệu thô của một Page từ API Strapi (đã qua transformer).
 */
export interface StrapiPage {
  id: number;
  title: string;
  slug: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaImage?: Media | null;
  contentSections: AnyStrapiSection[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

/**
 * Cấu trúc dữ liệu của một Page đã được ánh xạ cho frontend.
 */
export type Page = Omit<
  StrapiPage,
  | "metaImage"
  | "contentSections"
  | "createdAt"
  | "updatedAt"
  | "publishedAt"
  | "locale"
> & {
  metaImage?: Media | null;
  contentSections: AnySection[];
};

/**
 * Lớp vỏ (wrapper) của Strapi cho một Page đơn lẻ.
 */
export interface PageResponse {
  data: StrapiPage;
  meta: Record<string, unknown>;
}

/**
 * Lớp vỏ (wrapper) của Strapi cho một collection (danh sách) các Page.
 */
export interface PageCollectionResponse {
  data: StrapiPage[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
