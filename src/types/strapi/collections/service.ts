import { AnyStrapiSection } from '@/types/strapi/page';
import { StrapiEntity, Media, Block } from '@/types/strapi/strapi';

/**
 * Represents the structure of a Service entity from Strapi.
 */
export interface StrapiService {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    cover: Media | null;
    blocks: Block[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: string;
}

export type Service = {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    cover: Media | null;
    blocks: Block[] | null;
    publishedAt: string | null;
};