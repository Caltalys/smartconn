import {
  AboutPage,
  AboutPageResponse,
  mapAboutPage,
} from "@/types/strapi/single/about";
import { strapiClient } from "../strapi-client";

/**
 * Lấy dữ liệu cho trang "About".
 * Dữ liệu sau đó được ánh xạ để tương thích với PageRenderer.
 */
export async function fetchAboutPage(
  locale: string
): Promise<AboutPage | null> {
  const client = strapiClient(locale);
  try {
    const response = (await client.single("about").find({
      ...(locale && { locale }),
      populate: {
        blocks: {
          on: {
            // Populate for shared components with nested relations
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

    return await mapAboutPage(response.data);
  } catch (error) {
    console.error("API Error: Could not fetch about page data.", error);
    return null;
  }
}
