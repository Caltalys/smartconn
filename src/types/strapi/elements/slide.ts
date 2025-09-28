import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiSlide extends StrapiComponent {
  __component: "elements.slide";
  image: BaseMedia;
  alternativeText: string | null;
  caption: string | null;
}

// Mapped Frontend Type
export interface Slide extends StrapiComponent {
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
    ...slide,
    image: {
      url: getStrapiMedia(img?.url) ?? "",
      alt: img?.alternativeText ?? "",
      width: img?.width ?? 0,
      height: img?.height ?? 0,
    },
  };
}
