import type { Topbar, TopbarResponse } from "@/types/strapi/sections/topbar";
import { strapiClient } from "../strapi-client";

function mapTopbar(response: TopbarResponse): Topbar | null {
  const { data } = response;
  if (!data) return null;

  // Sử dụng kỹ thuật destructuring với rest parameter (...) để loại bỏ các trường metadata.
  // Cách này ngắn gọn và tự động tương thích khi kiểu `StrapiTopbar` thay đổi
  // (ví dụ: thêm một link mạng xã hội mới), miễn là kiểu `Topbar` vẫn được định nghĩa bằng `Omit`.
  const { createdAt, updatedAt, publishedAt, locale, ...topbarData } = data;

  // `topbarData` giờ đây có kiểu khớp chính xác với `Topbar`.
  return topbarData;
}

export async function fetchTopbar(locale: string): Promise<Topbar | null> {
  const client = strapiClient(locale);
  try {
    // Tối ưu hóa: Tránh sử dụng `populate: '*'`.
    // Vì `topbar` là một "Single Type" và các trường của nó (message, phoneNumber, social links...)
    // đều ở cấp cao nhất, chúng ta không cần `populate` để lấy chúng.
    // Strapi sẽ tự động trả về các trường này.
    // CẬP NHẬT: Dựa trên tài liệu và thực tế, việc truyền `locale` qua query param là cách đáng tin cậy nhất.
    const response = (await client.single("topbar").find({
      ...(locale && { locale }),
      // Không cần populate vì các trường đều ở cấp 1.
    })) as unknown as TopbarResponse;

    return mapTopbar(response);
  } catch (error) {
    // Trong môi trường production, bạn có thể muốn sử dụng một dịch vụ ghi log chuyên dụng.
    // Việc trả về `null` là chấp nhận được đối với các thành phần không quan trọng như topbar,
    // cho phép trang vẫn render mà không bị lỗi hoàn toàn.
    console.error("API Error: Could not fetch topbar data.", error);
    return null;
  }
}
