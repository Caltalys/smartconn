import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiRichtextImage extends StrapiComponent {
  __component: "shared.richtext-image";
  title: string;
  heading: string;
  body: string; // Strapi Blocks (Rich Text)
  image: BaseMedia;
}

// Mapped Frontend Type
export interface RichtextImageBlock extends StrapiComponent {
  title: string;
  heading: string;
  body: string; // Markdown or HTML
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export function mapRichtextImageBlock(
  block: StrapiRichtextImage
): RichtextImageBlock {
  const img = block.image;

  return {
    ...block,
    image: {
      url: getStrapiMedia(img?.url) ?? "",
      alt: img?.alternativeText ?? block.heading,
      width: img?.width ?? 0,
      height: img?.height ?? 0,
    },
  };
}
