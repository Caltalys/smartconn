import { AboutSectionData, StrapiAboutSection } from "../sections/about";
import {
  AdvantagesSectionData,
  StrapiAdvantagesSection,
} from "../sections/advantages";
import { BlogSectionData, StrapiBlogSection } from "../sections/blog";
import { HeroSection, StrapiHeroSection } from "../sections/hero";
import {
  PartnersSectionData,
  StrapiPartnersSection,
} from "../sections/partners";
import {
  ServicesSectionData,
  StrapiServicesSection,
} from "../sections/services";
import { Block, Media } from "../strapi";

/**
 * Đại diện cho một block thô từ danh mục 'shared' trong Strapi.
 * Đây là một kiểu linh hoạt để chứa các content block đơn giản.
 */
export interface StrapiSharedBlock extends Block {
  __component:
    | "shared.quote"
    | "shared.rich-text"
    | "shared.slider"
    | "shared.video"
    | "shared.image";
  [key: string]: any; // Cho phép các thuộc tính như 'text', 'content', 'slides', v.v.
}

/** Union type cho tất cả các component section thô từ Strapi. */
export type StrapiSectionComponent =
  | StrapiHeroSection
  | StrapiAboutSection
  | StrapiServicesSection
  | StrapiAdvantagesSection
  | StrapiPartnersSection
  | StrapiBlogSection;

/** Union type cho tất cả các component section đã được ánh xạ cho frontend. */
export type SectionComponent =
  | HeroSection
  | AboutSectionData
  | ServicesSectionData
  | AdvantagesSectionData
  | PartnersSectionData
  | BlogSectionData;

/** Union type cho BẤT KỲ component thô nào trong Dynamic Zone. */
export type AnyStrapiContentBlock = StrapiSectionComponent | StrapiSharedBlock;

/** Union type cho BẤT KỲ component đã được ánh xạ nào để PageRenderer render. */
export type AnyContentBlock = SectionComponent | Block;

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
  contentSections: AnyStrapiContentBlock[];
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
  contentSections: AnyContentBlock[];
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
