import { AnySharedBlock } from '../blocks/shared';
import { StrapiSharedBlock } from '../single/page';
import { Media, Meta, StrapiEntity } from '@/types/strapi/strapi';

/**
 * Cấu trúc dữ liệu thô của một Service từ API Strapi.
 */
export interface StrapiService extends StrapiEntity {
    title: string;
    description: string | null;
    slug: string;
    cover: Media | null;
    blocks: StrapiSharedBlock[] | null; // Dữ liệu thô từ dynamic zone
    publishedAt: string | null;
}

/**
 * Cấu trúc dữ liệu của một Service đã được ánh xạ cho frontend.
 */
export type Service = Omit<StrapiService, 'blocks'> & {
    blocks: AnySharedBlock[]; // Dữ liệu đã được ánh xạ
};

/**
 * Lớp vỏ (wrapper) của Strapi cho một collection (danh sách) các Service.
 */
export interface ServiceCollectionResponse {
    data: Service[];
    meta: Meta;
}