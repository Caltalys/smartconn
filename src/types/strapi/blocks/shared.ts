/**
 * @file src/types/strapi/blocks/shared.ts
 * @description Định nghĩa các kiểu dữ liệu đã được ánh xạ cho các component trong danh mục 'shared'.
 */

import { Media } from "../strapi";
import { FeatureItem } from "../sections/services";
import { Slide } from "../elements/slide";

/**
 * Cấu trúc dữ liệu của một Quote Block đã được ánh xạ cho frontend.
 * API ID: shared.quote
 */
export type SharedQuoteBlock = {
    id: number;
    __component: 'shared.quote';
    quote: string;
    author: string | null;
};

/**
 * Cấu trúc dữ liệu của một Rich Text Block đã được ánh xạ cho frontend.
 * API ID: shared.rich-text
 */
export type SharedRichTextBlock = {
    id: number;
    __component: 'shared.rich-text';
    body: string;
};

/**
 * Cấu trúc dữ liệu của một Slider Block đã được ánh xạ cho frontend.
 * API ID: shared.slider
 */
export type SharedSliderBlock = {
    id: number;
    __component: 'shared.slider';
    slides: Slide[];
};

/**
 * Cấu trúc dữ liệu của một List Item Block đã được ánh xạ cho frontend.
 * API ID: shared.list-item
 */
export type SharedListItemBlock = {
    id: number;
    __component: 'shared.list-item';
    pretitle: string;
    title: string;
    itemJustify: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    items: FeatureItem[];
};

/**
 * Cấu trúc dữ liệu của một Video Block đã được ánh xạ cho frontend.
 * API ID: shared.video
 */
export type SharedVideoBlock = {
    id: number;
    __component: 'shared.video';
    youtubeId: string;
    layout: 'background' | 'side-video' | null;
};

/**
 * Cấu trúc dữ liệu của một Image Block đã được ánh xạ cho frontend.
 * API ID: shared.image
 */
export type SharedImageBlock = {
    id: number;
    __component: 'shared.image';
    image: Media;
    alternativeText: string | null;
    layout: 'background' | 'side-image' | null;
};

/**
 * Cấu trúc dữ liệu của một Media Block đã được ánh xạ cho frontend.
 * API ID: shared.media
 */
export type SharedMediaBlock = {
    id: number;
    __component: 'shared.media';
    file: Media;
};

/**
 * Cấu trúc dữ liệu của một Richtext Video Block đã được ánh xạ cho frontend.
 * API ID: shared.richtext-video
 */
export type SharedRichtextVideoBlock = {
    id: number;
    __component: 'shared.richtext-video';
    pretitle: string;
    title: string;
    content: string; // Markdown
    video: SharedVideoBlock;
};

/**
 * Cấu trúc dữ liệu của một Richtext Image Block đã được ánh xạ cho frontend.
 * API ID: shared.richtext-image
 */
export type SharedRichtextImageBlock = {
    id: number;
    __component: 'shared.richtext-image';
    pretitle: string;
    title: string;
    content: string; // Markdown
    image: Media;
};

/** Union type cho tất cả các shared block đã được ánh xạ. */
export type AnySharedBlock =
  | SharedQuoteBlock
  | SharedRichTextBlock
  | SharedSliderBlock
  | SharedListItemBlock
  | SharedVideoBlock
  | SharedImageBlock
  | SharedMediaBlock
  | SharedRichtextVideoBlock
  | SharedRichtextImageBlock;