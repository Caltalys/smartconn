import { Link, mapLink, StrapiLink } from "../elements/link";
import { ImageBlock, mapImageBlock, StrapiImageBlock } from "../shared/image";
import {
  mapSliderBlock,
  SliderBlock,
  StrapiSliderBlock,
} from "../shared/slider";
import { mapVideoBlock, StrapiVideoBlock, VideoBlock } from "../shared/video";

// Raw Strapi Type
export interface StrapiHeroSection {
  __component: "sections.hero";
  id: number;
  heading: string;
  subheading?: string | null;
  description: string;
  ctas: StrapiLink[];
  layout: "text-left" | "text-center" | "text-right";
  mediaType: "image" | "video" | "slider" | "none";
  mediaImage?: StrapiImageBlock | null;
  mediaVideo?: StrapiVideoBlock | null;
  mediaSlider?: StrapiSliderBlock | null;
}

// Mapped Frontend Type
export interface HeroSection {
  __component: "sections.hero";
  id: number;
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
    __component: section.__component,
    id: section.id,
    title: section.heading,
    subtitle: section.subheading ?? null,
    description: section.description,
    ctas: (section.ctas ?? []).map(mapLink),
    layout: section.layout,
    mediaType: section.mediaType,
    mediaImage: section.mediaImage ? mapImageBlock(section.mediaImage) : null,
    mediaVideo: section.mediaVideo ? mapVideoBlock(section.mediaVideo) : null,
    mediaSlider: section.mediaSlider
      ? mapSliderBlock(section.mediaSlider)
      : null,
  };
}
