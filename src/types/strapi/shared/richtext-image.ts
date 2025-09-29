import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiRichtextImage extends StrapiComponent {
  __component: "shared.richtext-image";
  title?: string | null;
  heading?: string | null;
  body: string;
  image: BaseMedia;
  layout?: "image-left" | "image-right" | null;
}

// Mapped Frontend Type
export interface RichtextImageBlock extends StrapiComponent {
  title: string;
  heading: string;
  body: string;
  image: {
    url: string;
    alt: string;
  };
  layout: "image-left" | "image-right";
}

export function mapRichtextImageBlock(
  block: StrapiRichtextImage
): RichtextImageBlock {
  return {
    ...block,
    title: block.title ?? "",
    heading: block.heading ?? "",
    body: block.body,
    image: {
      url: getStrapiMedia(block.image.url) ?? "",
      alt: block.image.alternativeText ?? block.title ?? "",
    },
    layout: block.layout ?? "image-right", // Mặc định ảnh bên phải
  };
}
