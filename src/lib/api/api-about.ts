import { AnyContentBlock, AnyStrapiContentBlock, StrapiSectionComponent } from "@/types/strapi/single/page";
import { strapiClient } from "../strapi-client";
import { mapContentSections } from "./api-page";

/**
 * Cấu trúc dữ liệu thô của trang "About" từ API Strapi.
 */
interface StrapiAboutPageData {
  id: number;
  title: string;
  subtitle: string | null;
  blocks: AnyStrapiContentBlock[];
}

/**
 * Cấu trúc dữ liệu của trang "About" đã được ánh xạ cho frontend.
 */
export interface AboutPage {
  id: number;
  title: string;
  subtitle: string | null;
  blocks: AnyContentBlock[];
}

/** Lớp vỏ (wrapper) của Strapi cho một document đơn lẻ. */
interface AboutPageResponse {
  data: StrapiAboutPageData;
  meta: Record<string, unknown>;
}

/**
 * Chuyển đổi cấu trúc Rich Text (mảng các block) từ Strapi thành một chuỗi Markdown.
 * @param blocks - Mảng các block từ trường Rich Text.
 * @returns Một chuỗi Markdown.
 */
function richTextToString(blocks: any[] | null): string {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') {
        return block.children.map((child: any) => child.text).join('');
      }
      // TODO: Có thể mở rộng để xử lý các loại block khác như list, heading...
      return '';
    })
    .join('\n\n');
}

async function mapAboutPage(response: AboutPageResponse, locale: string): Promise<AboutPage | null> {
  const { data } = response;
  if (!data) return null;

  // Xử lý đặc biệt cho các block trong trang "About" nếu cần
  // Ví dụ: chuyển đổi Rich Text thành Markdown cho các section cụ thể
  const processedBlocks = (data.blocks || []).map(block => {
    if (block.__component === 'sections.hero' && Array.isArray(block.description)) {
      // Tạo một bản sao của block để tránh thay đổi dữ liệu gốc
      const newBlock = { ...block, description: richTextToString(block.description) };
      return newBlock as StrapiSectionComponent;
    }
    return block;
  });

  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    blocks: await mapContentSections(processedBlocks, locale),
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
      // Populate một cách tường minh thay vì dùng '*'
      populate: {
        blocks: {
          on: {
            'sections.hero': {
              populate: { ctas: true, mediaImage: { populate: { image: true } }, mediaVideo: true, mediaSlider: { populate: { slides: { populate: { image: true } } } } }
            },
            'sections.about': {
              populate: { ctas: true, image: true }
            },
            'sections.services': {
              populate: { services: { populate: ['image', 'cta', 'icon', 'icon.iconImage'] } }
            },
            'sections.advantages': {
              populate: { items: { populate: ['image', 'cta', 'icon', 'icon.iconImage'] } }
            },
            'sections.partners': {
              populate: { items: { populate: ['image'] } }
            },
            // Populate cho các shared components nếu cần
            'shared.quote': true,
          }
        }
      },
    }) as unknown as AboutPageResponse;
    return await mapAboutPage(response, locale);
  } catch (error) {
    console.error("API Error: Could not fetch about page data.", error);
    return null;
  }
}