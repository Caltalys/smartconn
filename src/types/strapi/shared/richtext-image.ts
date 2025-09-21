import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiRichtextImageBlock {
  __component: "shared.richtext-image";
  id: number;
  title: string;
  heading: string;
  content: string; // Strapi Blocks (Rich Text)
  image: StrapiMedia;
}

// Mapped Frontend Type
export interface RichtextImageBlock {
  __component: "shared.richtext-image";
  id: number;
  pretitle: string;
  title: string;
  body: string; // Markdown or HTML
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export function mapRichtextImageBlock(
  block: StrapiRichtextImageBlock
): RichtextImageBlock {
  const img = block.image;

  return {
    __component: block.__component,
    id: block.id,
    pretitle: block.title,
    title: block.heading,
    body: block.content, //Array.isArray(block.content) ? blocksToMarkdown(block.content) : "",
    image: {
      url: getStrapiMedia(img?.url) ?? "",
      alt: img?.alternativeText ?? block.heading,
      width: img?.width ?? 0,
      height: img?.height ?? 0,
    },
  };
}
