import { getStrapiMedia } from "@/lib/utils";
import { Link, mapLink, StrapiLink } from "../elements/link";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiAboutSection extends StrapiComponent {
  __component: "sections.about";
  title?: string | null;
  heading: string;
  description?: string | null;
  ctas: StrapiLink[] | null;
  image: BaseMedia;
}

// Mapped Frontend Type
export interface AboutSectionData extends StrapiComponent {
  pretitle: string;
  title: string;
  description: string;
  ctas: Link[];
  imageUrl: string;
  imageAlt: string;
}

export function mapAboutSection(section: StrapiAboutSection): AboutSectionData {
  // Tối ưu hóa việc mapping ctas:
  // 1. Dùng `?? []` để xử lý trường hợp `section.ctas` là null.
  // 2. Lọc ra các kết quả null từ `mapLink` để đảm bảo kiểu trả về là `Link[]`.
  const ctas = (section.ctas ?? [])
    .map(mapLink)
    .filter((link): link is Link => link !== null);

  return {
    ...section,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    ctas: ctas,
    imageUrl: getStrapiMedia(section.image.url) ?? "/fallback-about.jpg",
    imageAlt: section.image.alternativeText ?? section.title ?? section.heading,
  };
}
