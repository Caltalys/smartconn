import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiImage extends StrapiComponent {
  __component: "shared.image";
  image: BaseMedia;
  alternativeText?: string | null;
  layout: "background" | "side-image";
}

// Mapped Frontend Type
export interface ImageBlock extends StrapiComponent {
  image: BaseMedia;
  alternativeText?: string | null;
  layout: "background" | "side-image";
}

export function mapImageBlock(block: StrapiImage): ImageBlock {
  return {
    ...block,
  };
}
