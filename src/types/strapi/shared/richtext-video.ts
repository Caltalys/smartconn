import { StrapiComponent } from "../strapi";
import { mapVideoBlock, StrapiVideoBlock, VideoBlock } from "./video";

// Raw Strapi Type
export interface StrapiRichtextVideoBlock extends StrapiComponent {
  __component: "shared.richtext-video";
  title?: string | null;
  heading?: string | null;
  body: string;
  video: StrapiVideoBlock;
  layout?: "video-left" | "video-right" | null;
}

// Mapped Frontend Type
export interface RichtextVideoBlock extends StrapiComponent {
  title: string;
  heading: string;
  body: string;
  video: VideoBlock;
  layout: "video-left" | "video-right";
}

export function mapRichtextVideoBlock(
  block: StrapiRichtextVideoBlock
): RichtextVideoBlock | null {
  const mappedVideo = mapVideoBlock(block.video);
  if (!mappedVideo) return null;

  return {
    ...block,
    title: block.title ?? "",
    heading: block.heading ?? "",
    video: mappedVideo,
    layout: block.layout ?? "video-right", // Mặc định video bên phải
  };
}
