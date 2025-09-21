import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiMediaBlock {
  __component: "shared.media";
  id: number;
  file: StrapiMedia;
}

// Mapped Frontend Type
export interface MediaBlock {
  __component: "shared.media";
  id: number;
  file: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export function mapMediaBlock(block: StrapiMediaBlock): MediaBlock {
  const file = block.file;

  return {
    __component: block.__component,
    id: block.id,
    file: {
      url: file.url,
      alt: file.alternativeText ?? "",
      width: file.width,
      height: file.height,
    },
  };
}
