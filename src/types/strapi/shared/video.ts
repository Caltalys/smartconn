// Raw Strapi Type
export interface StrapiVideoBlock {
  __component: "shared.video";
  id: number;
  youtubeId: string;
  layout: "background" | "side-video";
}

// Mapped Frontend Type
export interface VideoBlock {
  __component: "shared.video";
  id: number;
  youtubeId: string;
  layout: "background" | "side-video";
}

export function mapVideoBlock(block: StrapiVideoBlock): VideoBlock {
  return {
    __component: block.__component,
    id: block.id,
    youtubeId: block.youtubeId,
    layout: block.layout,
  };
}
