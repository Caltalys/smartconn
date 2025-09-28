import { StrapiComponent } from "../strapi";
import { mapVideoBlock, StrapiVideoBlock, VideoBlock } from "./video";

// Raw Strapi Type
export interface StrapiRichtextVideoBlock extends StrapiComponent {
  __component: "shared.richtext-video";
  title: string;
  heading: string;
  content: string; // Strapi Blocks
  video: StrapiVideoBlock;
}

// Mapped Frontend Type
export interface RichtextVideoBlock extends StrapiComponent {
  pretitle: string;
  title: string;
  body: string; // Markdown or HTML
  video: VideoBlock;
}

export function mapRichtextVideoBlock(
  block: StrapiRichtextVideoBlock
): RichtextVideoBlock | null {
  try {
    const mappedVideo = mapVideoBlock(block.video);
    if (!mappedVideo) {
      console.warn(
        `[mapRichtextVideoBlock] Video is missing or invalid for block id: ${block.id}`
      );
      return null;
    }

    return {
      ...block,
      pretitle: block.title,
      title: block.heading,
      body: block.content,
      video: mappedVideo,
    };
  } catch (error) {
    console.error(
      `[mapRichtextVideoBlock] Error mapping block id: ${block.id}`,
      error
    );
    return null;
  }
}
