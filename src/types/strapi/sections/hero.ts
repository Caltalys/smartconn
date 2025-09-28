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
    ctas: (section.ctas ?? []).map(mapLink),
    mediaImage: section.mediaImage ? mapImageBlock(section.mediaImage) : null,
    mediaVideo: section.mediaVideo ? mapVideoBlock(section.mediaVideo) : null,
    mediaSlider: section.mediaSlider
      ? mapSliderBlock(section.mediaSlider)
      : null,
  };
}
