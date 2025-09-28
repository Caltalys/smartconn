import {
  Footer,
  FooterResponse,
  mapFooter,
} from "@/types/strapi/single/footer";
import { strapiClient } from "../strapi-client";

export async function fetchFooter(locale: string): Promise<Footer | null> {
  const client = strapiClient(locale);
  try {
    // Việc chỉ định `populate` một cách tường minh (`quickLinks: true`) là một thực hành tốt.
    // Nó giúp tránh việc fetch thừa dữ liệu không cần thiết.
    // CẬP NHẬT: Dựa trên tài liệu và thực tế, việc truyền `locale` qua query param là cách đáng tin cậy nhất
    // để đảm bảo Strapi trả về đúng bản địa hóa cho cả entity chính và các relation được populate.
    const response = (await client.single("footer").find({
      ...(locale && { locale }),
      populate: { quickLinks: true },
    })) as unknown as FooterResponse;

    return mapFooter(response.data);
  } catch (error) {
    // Trong môi trường production, bạn có thể muốn sử dụng một dịch vụ ghi log chuyên dụng.
    // Việc trả về `null` là chấp nhận được đối với các thành phần không quan trọng như footer,
    // cho phép trang vẫn render mà không bị lỗi hoàn toàn.
    console.error("API Error: Could not fetch footer data.", error);
    return null;
  }
}
