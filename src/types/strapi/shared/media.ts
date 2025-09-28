import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiMedia extends StrapiComponent {
  __component: "shared.media";
  file: BaseMedia;
}

// Mapped Frontend Type
export interface MediaBlock extends StrapiComponent {
  __component: "shared.media";
  file: BaseMedia;
}

export function mapMediaBlock(block: StrapiMedia): MediaBlock {
  const file = block.file;

  return {
    ...block,
  };
}
