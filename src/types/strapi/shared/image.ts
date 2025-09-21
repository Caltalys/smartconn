import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiImageBlock {
  __component: "shared.image";
  id: number;
  image: StrapiMedia;
  alternativeText?: string | null;
  layout: "background" | "side-image";
}

// Mapped Frontend Type
export interface ImageBlock {
  __component: "shared.image";
  id: number;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  alternativeText: string | null;
  layout: "background" | "side-image";
}

export function mapImageBlock(block: StrapiImageBlock): ImageBlock {
  const img = block.image;
  return {
    __component: block.__component,
    id: block.id,
    image: {
      url: getStrapiMedia(img?.url) ?? "",
      alt: img?.alternativeText ?? "",
      width: img?.width ?? 0,
      height: img?.height ?? 0,
    },
    alternativeText: block.alternativeText ?? null,
    layout: block.layout,
  };
}
