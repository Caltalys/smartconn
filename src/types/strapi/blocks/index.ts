// Định nghĩa tất cả các Strapi Shared Block types
import { ImageBlock, mapImageBlock, StrapiImageBlock } from "../shared/image";
import {
  ListItemBlock,
  mapListItemBlock,
  StrapiListItemBlock,
} from "../shared/list-item";
import { mapMediaBlock, MediaBlock, StrapiMediaBlock } from "../shared/media";
import { mapQuoteBlock, QuoteBlock, StrapiQuoteBlock } from "../shared/quote";
import {
  mapRichTextBlock,
  RichTextBlock,
  StrapiRichTextBlock,
} from "../shared/rich-text";
import {
  mapRichtextImageBlock,
  RichtextImageBlock,
  StrapiRichtextImageBlock,
} from "../shared/richtext-image";
import {
  mapRichtextVideoBlock,
  RichtextVideoBlock,
  StrapiRichtextVideoBlock,
} from "../shared/richtext-video";
import {
  mapSliderBlock,
  SliderBlock,
  StrapiSliderBlock,
} from "../shared/slider";
import { mapVideoBlock, StrapiVideoBlock, VideoBlock } from "../shared/video";

/**
 * Union type cho tất cả các shared block thô từ Strapi Dynamic Zone.
 * Đây là kiểu dữ liệu gốc mà API trả về trước khi mapping.
 */
export type StrapiSharedBlock =
  | StrapiQuoteBlock
  | StrapiRichTextBlock
  | StrapiImageBlock
  | StrapiSliderBlock
  | StrapiVideoBlock
  | StrapiMediaBlock
  | StrapiListItemBlock
  | StrapiRichtextImageBlock
  | StrapiRichtextVideoBlock;

/**
 * Kiểu dự phòng cho các block chưa được định nghĩa.
 * Dùng trong trường hợp API trả về block mới mà frontend chưa hỗ trợ.
 */
export interface UnknownStrapiBlock {
  __component: string;
  id: number;
  [key: string]: unknown;
}

/**
 * Union type cho tất cả các shared block đã được ánh xạ cho frontend.
 * Dùng trong BlockRenderer và PageRenderer để render UI.
 */
export type AnySharedBlock =
  | QuoteBlock
  | RichTextBlock
  | ImageBlock
  | SliderBlock
  | VideoBlock
  | MediaBlock
  | ListItemBlock
  | RichtextImageBlock
  | RichtextVideoBlock;

/**
 * Kiểu dự phòng cho các block chưa được hỗ trợ trong frontend.
 */
export interface UnknownBlock {
  __component: string;
  id: number;
}

export function mapBlocks(blocks: StrapiSharedBlock[]): AnySharedBlock[] {
  return blocks
    .map((block) => {
      switch (block.__component) {
        case "shared.quote":
          return mapQuoteBlock(block as StrapiQuoteBlock);
        case "shared.rich-text":
          return mapRichTextBlock(block as StrapiRichTextBlock);
        case "shared.image":
          return mapImageBlock(block as StrapiImageBlock);
        case "shared.slider":
          return mapSliderBlock(block as StrapiSliderBlock);
        case "shared.video":
          return mapVideoBlock(block as StrapiVideoBlock);
        case "shared.media":
          return mapMediaBlock(block as StrapiMediaBlock);
        case "shared.list-item":
          return mapListItemBlock(block as StrapiListItemBlock);
        case "shared.richtext-image":
          return mapRichtextImageBlock(block as StrapiRichtextImageBlock);
        case "shared.richtext-video":
          return mapRichtextVideoBlock(block as StrapiRichtextVideoBlock);
        default:
          console.warn(
            `Unknown block type: ${(block as UnknownStrapiBlock).__component}`
          );
          return null;
      }
    })
    .filter((block): block is AnySharedBlock => block !== null);
}
