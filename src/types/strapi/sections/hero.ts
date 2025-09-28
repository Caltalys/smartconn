import { Link, mapLink, StrapiLink } from "../elements/link";
import { ImageBlock, mapImageBlock, StrapiImage } from "../shared/image";
import {
  mapSliderBlock,
  SliderBlock,
  StrapiSliderBlock,
} from "../shared/slider";
import { mapVideoBlock, StrapiVideoBlock, VideoBlock } from "../shared/video";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiHeroSection extends StrapiComponent {
  __component: "sections.hero";
  heading: string;
  subheading?: string | null;
  description: string;
  ctas: StrapiLink[];
  layout: "text-left" | "text-center" | "text-right";
  mediaType: "image" | "video" | "slider" | "none";
  mediaImage?: StrapiImage | null;
  mediaVideo?: StrapiVideoBlock | null;
  mediaSlider?: StrapiSliderBlock | null;
}

// Mapped Frontend Type
export interface HeroSection extends StrapiComponent {
  title: string;
  subtitle: string | null;
  description: string; // Markdown or HTML
  ctas: Link[];
  layout: "text-left" | "text-center" | "text-right";
  mediaType: "image" | "video" | "slider" | "none";
  mediaImage?: ImageBlock | null;
  mediaVideo?: VideoBlock | null;
  mediaSlider?: SliderBlock | null;
}

export function mapHeroSection(section: StrapiHeroSection): HeroSection {
  return {
    ...section,
    title: section.heading,
    subtitle: section.subheading ?? null,
    // Tối ưu hóa việc mapping ctas:
    // 1. Dùng `?? []` để xử lý trường hợp `section.ctas` là null.
    // 2. Lọc ra các kết quả null từ `mapLink` để đảm bảo kiểu trả về là `Link[]`.
    ctas: (section.ctas ?? [])
      .map(mapLink)
      .filter((link): link is Link => link !== null),
    mediaImage: section.mediaImage ? mapImageBlock(section.mediaImage) : null,
    mediaVideo: section.mediaVideo ? mapVideoBlock(section.mediaVideo) : null,
    mediaSlider: section.mediaSlider
      ? mapSliderBlock(section.mediaSlider)
      : null,
  };
}
