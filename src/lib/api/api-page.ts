import {
  Page,
  PageCollectionResponse,
  mapPage,
} from "@/types/strapi/single/page";
import { strapiClient } from "../strapi-client";

// --- API Fetcher ---

/**
 * Lấy dữ liệu của một trang duy nhất từ Strapi dựa vào slug.
 * @param slug - Slug của trang cần lấy.
 * @param locale - Ngôn ngữ của nội dung.
 * @returns Dữ liệu trang đã được ánh xạ hoặc null nếu không tìm thấy.
 */
export async function fetchPageBySlug(
  slug: string,
  locale: string
): Promise<Page | null> {
  const client = strapiClient(locale);
  try {
    const response = (await client.collection("pages").find({
      filters: { slug: { $eq: slug } },
      ...(locale && { locale }),
      populate: {
        contentSections: {
          on: {
            "sections.hero": {
              populate: {
                ctas: true,
                mediaImage: { populate: { image: true } },
                mediaVideo: true,
                mediaSlider: {
                  populate: { slides: { populate: { image: true } } },
                },
              },
            },
            "sections.about": {
              populate: { ctas: true, image: true },
            },
            "sections.services": {
              populate: {
                services: {
                  populate: {
                    image: true,
                    cta: true,
                  },
                },
              },
            },
            "sections.advantages": {
              populate: {
                items: {
                  populate: {
                    image: true,
                    cta: true,
                    icon: {
                      populate: {
                        iconImage: true,
                      },
                    },
                  },
                },
              },
            },
            "sections.partners": {
              populate: {
                items: {
                  populate: {
                    image: true,
                  },
                },
              },
            },
            "shared.image": { populate: { image: true } },
            "shared.media": { populate: { file: true } },
            "shared.slider": {
              populate: {
                slides: {
                  populate: { image: true },
                },
              },
            },
            "shared.list-item": {
              populate: {
                items: {
                  populate: {
                    image: true,
                    cta: true,
                    icon: { populate: { iconImage: true } },
                  },
                },
              },
            },
            "shared.richtext-video": { populate: { video: true } },
            "shared.richtext-image": { populate: { image: true } },
          },
        },
        metaImage: true,
      },
    })) as unknown as PageCollectionResponse;
    if (!response.data || response.data.length === 0) {
      return null;
    }

    // Gọi phiên bản async của mapPage và truyền locale vào
    return await mapPage(response.data[0] ?? null, locale);
  } catch (error) {
    console.error(
      `API Error: Could not fetch page with slug "${slug}".`,
      error
    );
    return null;
  }
}
