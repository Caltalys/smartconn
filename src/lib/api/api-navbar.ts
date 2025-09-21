import { strapiClient } from "../strapi-client";
import type {
  Navbar,
  NavbarResponse,
  NavbarCollectionResponse,
  NavbarItem,
  StrapiNavbarItem,
} from "../../types/strapi/sections/navbar";


/**
 * --------------------------
 *  Mapper functions
 * --------------------------
 */

/**
 * Ánh xạ đệ quy một mảng các `StrapiNavbarItem` sang một mảng các `NavbarItem`.
 * Hàm này đảm bảo rằng cấu trúc dữ liệu được làm phẳng và đơn giản hóa cho frontend,
 * bao gồm cả việc xử lý các mục con lồng nhau.
 * @param items - Mảng các `StrapiNavbarItem` thô từ API.
 * @returns Mảng các `NavbarItem` đã được ánh xạ, hoặc một mảng rỗng nếu đầu vào không hợp lệ.
 */
function mapNavbarItems(items: StrapiNavbarItem[]): NavbarItem[] {
  if (!items) return [];
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    url: item.url,
    // Gọi đệ quy để ánh xạ các item con
    children: mapNavbarItems(item.children),
  }));
}

/**
 * Ánh xạ một `NavbarResponse` thô từ API thành một đối tượng `Navbar` sạch,
 * sẵn sàng để sử dụng trong các component.
 * @param resp - Đối tượng `NavbarResponse` từ Strapi.
 * @returns Một đối tượng `Navbar` đã được ánh xạ, hoặc `null` nếu không có dữ liệu.
 */
export function mapNavbar(resp: NavbarResponse): Navbar | null {
  if (!resp.data) return null;
  const { id, name, items } = resp.data;

  return {
    id,
    name,
    items: mapNavbarItems(items),
  };
}

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
export async function fetchAllNavbars(locale?: string): Promise<Navbar[]> {
  const client = strapiClient(locale);

  try {
    const resp = (await client
      .collection("navbars")
      .find({
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
      .map((doc) => mapNavbar({ data: doc, meta: {} }))
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
  const client = strapiClient(locale);

  try {
    const resp = (await client
      .collection("navbars")
      .findOne(id, {
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

    return mapNavbar(resp);
  } catch (error) {
    console.error(`API Error: Could not fetch navbar with id "${id}".`, error);
    return null;
  }
}