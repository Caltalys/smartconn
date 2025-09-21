import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiSlide {
  __component: "elements.slide";
  id: number;
  image: StrapiMedia;
  alternativeText?: string | null;
  caption?: string | null;
}

// Mapped Frontend Type
export interface Slide {
  id: number;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  alternativeText: string | null;
  caption: string | null;
}

export function mapSlide(slide: StrapiSlide): Slide {
  const img = slide.image;
  return {
    id: slide.id,
    image: {
      url: getStrapiMedia(img?.url) ?? "",
      alt: img?.alternativeText ?? "",
      width: img?.width ?? 0,
      height: img?.height ?? 0,
    },
    alternativeText: slide.alternativeText ?? null,
    caption: slide.caption ?? null,
  };
}
