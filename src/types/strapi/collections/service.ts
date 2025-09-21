import { getStrapiMedia } from "@/lib/utils";
import {
  StrapiMedia,
  StrapiResponse,
  StrapiResponseCollection,
} from "@/types/strapi/strapi";
import { AnySharedBlock, mapBlocks, StrapiSharedBlock } from "../blocks";

export interface StrapiService {
  id: number;
  title: string;
  description: string | null;
  slug: string;
  cover: StrapiMedia | null;
  blocks: StrapiSharedBlock[];
}

// Mapped for frontend
export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
  coverUrl: string | null;
  coverAlt: string;
  blocks: AnySharedBlock[]; // ← mapped shared blocks
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type ServiceResponse = StrapiResponse<Service>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu.
 */
export type ServiceCollectionResponse = StrapiResponseCollection<Service>;

export function mapService(service: StrapiService): Service {
  return {
    id: service.id,
    title: service.title,
    description: service.description ?? "",
    slug: service.slug,
    coverUrl: service.cover ? getStrapiMedia(service.cover.url) : null,
    coverAlt: service.cover?.alternativeText ?? service.title,
    blocks: mapBlocks(service.blocks),
  };
}
