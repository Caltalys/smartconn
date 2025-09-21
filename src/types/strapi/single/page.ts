import { mapContentSections } from "@/lib/api";
import { getStrapiMedia } from "@/lib/utils";
import {
  AnyContentBlock,
  AnyStrapiContentBlock,
} from "../sections/content-blocks";
import {
  StrapiMedia,
  StrapiResponse,
  StrapiResponseCollection,
} from "../strapi";

export interface StrapiPage {
  id: number;
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: StrapiMedia | null;
  contentSections: AnyStrapiContentBlock[];
}

// Mapped for frontend
export interface Page {
  id: number;
  title: string;
  slug: string;
  meta: {
    title: string | null;
    description: string | null;
    image: string | null;
  };
  sections: AnyContentBlock[]; // ← mapped sections
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type PageResponse = StrapiResponse<Page>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type PageCollectionResponse = StrapiResponseCollection<Page>;

export async function mapPage(page: StrapiPage, locale: string): Promise<Page> {
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    meta: {
      title: page.metaTitle,
      description: page.metaDescription,
      image: page.metaImage ? getStrapiMedia(page.metaImage.url) : null,
    },
    sections: await mapContentSections(page.contentSections, locale),
  };
}
