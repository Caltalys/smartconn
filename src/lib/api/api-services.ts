import {
  Service,
  ServiceCollectionResponse,
  StrapiService,
  mapService,
} from "@/types/strapi/collections/service";
import { StrapiResponseCollection } from "@/types/strapi/strapi";
import { strapiClient } from "../custom-strapi-client";

// --- API Fetchers ---

/**
 * Lấy tất cả các dịch vụ, hỗ trợ phân trang và tìm kiếm.
 */
export async function getAllServices(
  locale: string,
  params: { page?: number; pageSize?: number; query?: string } = {}
): Promise<ServiceCollectionResponse | null> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
  const { page = 1, pageSize = 10, query = "" } = params;

  try {
    const response = (await client.collection("services").find({
      locale,
      sort: "title:asc",
      pagination: { page, pageSize },
      filters: {
        ...(query && { title: { $containsi: query } }),
      },
      populate: ["cover"],
    })) as unknown as StrapiResponseCollection<StrapiService>;

    if (!response.data) {
      return {
        data: [],
        meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } },
      };
    }

    // Ánh xạ thủ công cho danh sách để tối ưu, không cần map `blocks`.
    const services = response.data.map(mapService);

    return { data: services, meta: response.meta };
  } catch (error) {
    console.error("API Error: Could not fetch services.", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize, pageCount: 1, total: 0 } },
    };
  }
}

/**
 * Lấy một dịch vụ duy nhất dựa vào slug.
 */
export async function getServiceBySlug(
  slug: string,
  locale: string
): Promise<Service | null> {
  // Sử dụng ISR: cache dữ liệu trong 60 giây.
  // Next.js sẽ tự động fetch lại dữ liệu trong nền sau 60 giây.
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });

  try {
    const response = (await client.collection("services").find({
      locale,
      filters: { slug: { $eq: slug } },
      // Cập nhật populate để lấy đủ dữ liệu cho các block lồng nhau
      populate: {
        cover: true,
        blocks: {
          on: {
            "shared.image": { populate: { image: true } },
            "shared.media": { populate: { file: true } },
            "shared.slider": {
              populate: { slides: { populate: { image: true } } },
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
            // Populate cho các block đơn giản không có relation lồng nhau
            "shared.quote": true,
            "shared.rich-text": true,
            "shared.video": true,
          },
        },
      },
    })) as unknown as StrapiResponseCollection<StrapiService>;

    if (!response.data) {
      return null;
    }

    // mapService là hàm đồng bộ, không cần await
    return mapService(response.data[0]);
  } catch (error) {
    console.error(
      `API Error: Could not fetch service with slug "${slug}".`,
      error
    );
    return null;
  }
}
