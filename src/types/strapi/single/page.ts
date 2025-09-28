import { getStrapiMedia } from "@/lib/utils";
import {
  AnyDynamicBlock,
  AnyStrapiDynamicBlock,
  mapDynamicBlock,
} from "../blocks/dynamic-blocks";
import {
  BaseMedia,
  StrapiEntity,
  StrapiResponse,
  StrapiResponseCollection,
} from "../strapi";

export interface StrapiPage extends StrapiEntity {
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: BaseMedia | null;
  contentSections: AnyStrapiDynamicBlock[];
}

// Mapped for frontend
export interface Page extends StrapiEntity {
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  contentSections: AnyDynamicBlock[]; // ← mapped sections
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type PageResponse = StrapiResponse<Page>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type PageCollectionResponse = StrapiResponseCollection<Page>;

export async function mapPage(page: StrapiPage | null): Promise<Page | null> {
  if (!page) return null;
  return {
    ...page,
    metaImage: page.metaImage ? getStrapiMedia(page.metaImage.url) : null,
    contentSections: await mapDynamicBlock(page.contentSections),
  };
}
