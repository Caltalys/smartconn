import type {
  Navbar,
  NavbarCollectionResponse,
  NavbarResponse,
  StrapiNavbar,
} from "@/types/strapi/collections/navbar";
import { mapNavbar } from "@/types/strapi/collections/navbar";
import { strapiClient } from "../custom-strapi-client";

/**
 * --------------------------
 *  API functions
 * --------------------------
 */

/**
 * Lấy tất cả các menu (navbars) từ Strapi.
 * @param locale - (Tùy chọn) Ngôn ngữ của nội dung cần lấy.
 * @returns Một mảng các đối tượng `Navbar` đã được ánh xạ.
 */
export async function fetchAllNavbars(locale: string): Promise<Navbar[]> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
  try {
    const resp = (await client.collection("navbars").find({
      ...(locale && { locale }),
      populate: {
        items: {
          populate: {
            children: {
              // Populate đệ quy đến 3 cấp. Có thể cần tăng nếu menu sâu hơn.
              populate: { children: true },
            },
          },
        },
      },
    })) as unknown as NavbarCollectionResponse;

    // Lọc ra các kết quả null từ mapNavbar nếu có (để đảm bảo an toàn kiểu)
    return resp.data
      .map((navbar) => mapNavbar(navbar))
      .filter((navbar): navbar is Navbar => navbar !== null);
  } catch (error) {
    console.error("API Error: Could not fetch navbars.", error);
    return [];
  }
}

/**
 * Lấy một menu (navbar) cụ thể từ Strapi dựa vào ID.
 * @param id - ID của navbar cần lấy.
 * @param locale - Ngôn ngữ của nội dung cần lấy.
 * @returns Một đối tượng `Navbar` đã được ánh xạ, hoặc `null` nếu không tìm thấy.
 */
export async function fetchNavbar(
  id: string,
  locale: string
): Promise<Navbar | null> {
  const client = strapiClient(locale, {
    next: { revalidate: 30 },
  });
  try {
    const resp = (await client.collection("navbars").findOne(id, {
      ...(locale && { locale }),
      populate: {
        items: {
          populate: {
            children: {
              // Populate đệ quy đến 3 cấp.
              populate: { children: true },
            },
          },
        },
      },
    })) as unknown as NavbarResponse | null;

    if (!resp) return null;

    return mapNavbar(resp.data as StrapiNavbar | null);
  } catch (error) {
    console.error(`API Error: Could not fetch navbar with id "${id}".`, error);
    return null;
  }
}
