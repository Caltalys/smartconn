import { getStrapiMedia } from "@/lib/utils";
import {
  BaseMedia,
  StrapiEntity,
  StrapiResponse,
  StrapiResponseCollection,
} from "@/types/strapi/strapi";
import {
  AnyContentBlock,
  AnyStrapiContentBlock,
  mapContentBlocks,
} from "../blocks/content-blocks";

export interface StrapiService extends StrapiEntity {
  title: string;
  description: string | null;
  slug: string;
  cover: BaseMedia | null;
  blocks: AnyStrapiContentBlock[];
}

// Mapped for frontend
export interface Service extends StrapiEntity {
  title: string;
  description: string | null;
  slug: string;
  coverUrl: string | null;
  coverAlt: string;
  blocks: AnyContentBlock[]; // ← mapped shared blocks
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type ServiceResponse = StrapiResponse<StrapiService>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type ServiceCollectionResponse = StrapiResponseCollection<StrapiService>;

export function mapService(service: StrapiService): Service {
  return {
    ...service,
    coverUrl: service.cover ? getStrapiMedia(service.cover.url) : null,
    coverAlt: service.cover?.alternativeText ?? service.title,
    blocks: mapContentBlocks(service.blocks),
  };
}
