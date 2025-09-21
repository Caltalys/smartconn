import type { Footer, FooterResponse } from "@/types/strapi/single/footer";
import { strapiClient } from "../strapi-client";

function mapFooter(response: FooterResponse): Footer | null {
  const { data } = response;
  if (!data) return null;

  // Dự án của bạn đang dùng transformer, nên ta truy cập trực tiếp.
  return {
    id: data.id,
    description: data.description,
    address: data.address,
    phoneNumber: data.phoneNumber,
    email: data.email,
    copyright: data.copyright,
    quickLinksTitle: data.quickLinksTitle,
    quickLinks: (data.quickLinks || []).map((link) => ({
      id: link.id,
      label: link.text, // Ánh xạ 'text' từ Strapi sang 'label' cho frontend
      href: link.url, // Ánh xạ 'url' từ Strapi sang 'href' cho frontend
      target: link.target,
      isExternal: link.isExternal,
    })),
    contactInfoTitle: data.contactInfoTitle,
    facebookUrl: data.facebookUrl,
    twitterUrl: data.twitterUrl,
    instagramUrl: data.instagramUrl,
    linkedinUrl: data.linkedinUrl,
  };
}

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

    return mapFooter(response);
  } catch (error) {
    // Trong môi trường production, bạn có thể muốn sử dụng một dịch vụ ghi log chuyên dụng.
    // Việc trả về `null` là chấp nhận được đối với các thành phần không quan trọng như footer,
    // cho phép trang vẫn render mà không bị lỗi hoàn toàn.
    console.error("API Error: Could not fetch footer data.", error);
    return null;
  }
}
