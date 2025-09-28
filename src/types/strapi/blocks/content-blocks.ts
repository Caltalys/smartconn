// Định nghĩa tất cả các Strapi Shared Block types
import { ImageBlock, mapImageBlock, StrapiImage } from "../shared/image";
import {
  ListItemBlock,
  mapListItemBlock,
  StrapiListItem,
} from "../shared/list-item";
import { mapMediaBlock, MediaBlock, StrapiMedia } from "../shared/media";
import { mapQuoteBlock, QuoteBlock, StrapiQuote } from "../shared/quote";
import {
  mapRichTextBlock,
  RichTextBlock,
  StrapiRichText,
} from "../shared/rich-text";
import {
  mapRichtextImageBlock,
  RichtextImageBlock,
  StrapiRichtextImage,
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
import { StrapiBlock } from "../strapi";

/**
 * Union type cho tất cả các shared block thô từ Strapi Dynamic Zone.
 * Đây là kiểu dữ liệu gốc mà API trả về trước khi mapping.
 */
export type AnyStrapiContentBlock =
  | StrapiQuote
  | StrapiRichText
  | StrapiImage
  | StrapiSliderBlock
  | StrapiVideoBlock
  | StrapiMedia
  | StrapiListItem
  | StrapiRichtextImage
  | StrapiRichtextVideoBlock;

export interface UnknownStrapiContentBlock extends StrapiBlock {}

/**
 * Union type cho tất cả các shared block đã được ánh xạ cho frontend.
 * Dùng trong BlockRenderer và PageRenderer để render UI.
 */
export type AnyContentBlock =
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
export interface UnknownBlock extends StrapiBlock {}

export function mapContentBlocks(
  blocks: AnyStrapiContentBlock[]
): AnyContentBlock[] {
  if (!blocks) return [];
  return blocks
    .map((block) => {
      switch (block.__component) {
        case "shared.quote":
          return mapQuoteBlock(block as StrapiQuote);
        case "shared.rich-text":
          return mapRichTextBlock(block as StrapiRichText);
        case "shared.image":
          return mapImageBlock(block as StrapiImage);
        case "shared.slider":
          return mapSliderBlock(block as StrapiSliderBlock);
        case "shared.video":
          return mapVideoBlock(block as StrapiVideoBlock);
        case "shared.media":
          return mapMediaBlock(block as StrapiMedia);
        case "shared.list-item":
          return mapListItemBlock(block as StrapiListItem);
        case "shared.richtext-image":
          return mapRichtextImageBlock(block as StrapiRichtextImage);
        case "shared.richtext-video":
          return mapRichtextVideoBlock(block as StrapiRichtextVideoBlock);
        default:
          console.warn(
            `Unknown block type: ${(block as UnknownStrapiContentBlock).__component}`
          );
          return null;
      }
    })
    .filter((block): block is AnyContentBlock => block !== null);
}
