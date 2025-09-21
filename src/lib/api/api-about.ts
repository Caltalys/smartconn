import { AnySharedBlock } from "@/types/strapi/blocks/shared";
import { StrapiSharedBlock } from "@/types/strapi/single/page";
import { strapiClient } from "../strapi-client";
import { mapContentSections } from "./api-page";

/**
 * Cấu trúc dữ liệu thô của trang "About" từ API Strapi.
 */
interface StrapiAboutPageData {
  id: number;
  title: string;
  subtitle: string | null;
  blocks: StrapiSharedBlock[];
}

/**
 * Cấu trúc dữ liệu của trang "About" đã được ánh xạ cho frontend.
 */
export interface AboutPage {
  id: number;
  title: string;
  subtitle: string | null;
  blocks: AnySharedBlock[];
}

/** Lớp vỏ (wrapper) của Strapi cho một document đơn lẻ. */
interface AboutPageResponse {
  data: StrapiAboutPageData;
  meta: Record<string, unknown>;
}

async function mapAboutPage(response: AboutPageResponse, locale: string): Promise<AboutPage | null> {
  const { data } = response;
  if (!data) return null;

  // Dynamic Zone của trang "About" giờ chỉ chứa các shared block.
  // Chúng ta có thể ánh xạ trực tiếp bằng hàm mapContentSections đã có.
  const mappedBlocks = await mapContentSections(data.blocks || [], locale);

  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    // Ép kiểu an toàn vì chúng ta biết trang "About" chỉ chứa các shared block.
    blocks: mappedBlocks as AnySharedBlock[],
  };
}

/**
 * Lấy dữ liệu cho trang "About".
 * Dữ liệu sau đó được ánh xạ để tương thích với PageRenderer.
 */
export async function fetchAboutPage(locale: string): Promise<AboutPage | null> {
  const client = strapiClient(locale);
  try {
    const response = await client.single("about").find({
      locale,
      populate: {
        blocks: {
          on: {
            // Populate for shared components with nested relations
            'shared.image': { populate: { image: true } },
            'shared.media': { populate: { file: true } },
            'shared.slider': {
              populate: {
                slides: {
                  populate: { image: true }
                }
              }
            },
            'shared.list-item': {
              populate: {
                items: {
                  populate: ['image', 'cta', 'icon', 'icon.iconImage']
                }
              }
            },
            'shared.richtext-video': { populate: { video: true } },
            'shared.richtext-image': { populate: { image: true } }
          }
        }
      }
    }) as unknown as AboutPageResponse;
    
    return await mapAboutPage(response, locale);
  } catch (error) {
    console.error("API Error: Could not fetch about page data.", error);
    return null;
  }
}