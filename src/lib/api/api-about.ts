import {
  AboutPage,
  AboutPageResponse,
  mapAboutPage,
} from "@/types/strapi/single/about";
import { strapiClient } from "../custom-strapi-client";

/**
 * Lấy dữ liệu cho trang "About".
 * Dữ liệu sau đó được ánh xạ để tương thích với PageRenderer.
 */
export async function fetchAboutPage(
  locale: string
): Promise<AboutPage | null> {
  const client = strapiClient(locale, {
    next: { revalidate: 60 },
  });
  try {
    const response = (await client.single("about").find({
      ...(locale && { locale }),
      populate: {
        blocks: {
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
            "shared.quote": true,
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
                  populate: ["image", "cta", "icon", "icon.iconImage"],
                },
              },
            },
            "shared.richtext-video": { populate: { video: true } },
            "shared.richtext-image": { populate: { image: true } },
          },
        },
      },
    })) as unknown as AboutPageResponse;
    console.log(response);
    return await mapAboutPage(response.data);
  } catch (error) {
    console.error("API Error: Could not fetch about page data.", error);
    return null;
  }
}
