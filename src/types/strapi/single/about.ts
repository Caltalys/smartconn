import {
  AnyDynamicBlock,
  AnyStrapiDynamicBlock,
  mapDynamicBlock,
} from "../blocks/dynamic-blocks";
import { StrapiEntity, StrapiResponse } from "../strapi";

/**
 * Kiểu dữ liệu thô cho trang About từ API Strapi.
 */
export interface StrapiAboutPage extends StrapiEntity {
  title: string;
  subtitle: string | null;
  blocks: AnyStrapiDynamicBlock[];
}

/**
 * Kiểu dữ liệu đã được ánh xạ cho trang About để sử dụng ở frontend.
 */
export interface AboutPage extends StrapiEntity {
  title: string;
  subtitle: string | null;
  blocks: AnyDynamicBlock[];
}

/**
 * Lớp vỏ (wrapper) của Strapi cho một tài liệu About đơn lẻ.
 */
export type AboutPageResponse = StrapiResponse<StrapiAboutPage>;

export async function mapAboutPage(
  page: StrapiAboutPage | null
): Promise<AboutPage | null> {
  if (!page) return null;
  return {
    ...page,
    blocks: await mapDynamicBlock(page.blocks),
  };
}
