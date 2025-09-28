import { AnyContentBlock } from "@/types/strapi/blocks/content-blocks";
import { AnyDynamicBlock } from "@/types/strapi/blocks/dynamic-blocks";
import {
  AboutSectionData,
  StrapiAboutSection,
} from "@/types/strapi/sections/about";
import {
  AdvantagesSectionData,
  StrapiAdvantagesSection,
} from "@/types/strapi/sections/advantages";
import { StrapiBlogSection } from "@/types/strapi/sections/blog";
import { HeroSection, StrapiHeroSection } from "@/types/strapi/sections/hero";
import {
  PartnersSectionData,
  StrapiPartnersSection,
} from "@/types/strapi/sections/partners";
import {
  ServicesSectionData,
  StrapiServicesSection,
} from "@/types/strapi/sections/services";
import { ImageBlock, StrapiImage } from "@/types/strapi/shared/image";
import { ListItemBlock, StrapiListItem } from "@/types/strapi/shared/list-item";
import { MediaBlock, StrapiMedia } from "@/types/strapi/shared/media";
import { QuoteBlock, StrapiQuote } from "@/types/strapi/shared/quote";
import { RichTextBlock, StrapiRichText } from "@/types/strapi/shared/rich-text";
import {
  RichtextImageBlock,
  StrapiRichtextImage,
} from "@/types/strapi/shared/richtext-image";
import {
  RichtextVideoBlock,
  StrapiRichtextVideoBlock,
} from "@/types/strapi/shared/richtext-video";
import { SliderBlock, StrapiSliderBlock } from "@/types/strapi/shared/slider";
import { StrapiVideoBlock, VideoBlock } from "@/types/strapi/shared/video";

// Helper function để kiểm tra object
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Helper function để kiểm tra có property __component
function hasComponent<T extends string>(
  obj: unknown,
  component: T
): obj is { __component: T } {
  return isObject(obj) && "__component" in obj && obj.__component === component;
}

// --- Shared Block Guards ---

export function isStrapiQuoteBlock(block: unknown): block is StrapiQuote {
  return (
    hasComponent(block, "shared.quote") &&
    isObject(block) &&
    "body" in block &&
    typeof block.body === "string"
  );
}

export function isStrapiRichTextBlock(block: unknown): block is StrapiRichText {
  return (
    hasComponent(block, "shared.rich-text") &&
    isObject(block) &&
    "body" in block &&
    typeof block.body === "string"
  );
}

export function isStrapiImageBlock(block: unknown): block is StrapiImage {
  return (
    hasComponent(block, "shared.image") &&
    isObject(block) &&
    "image" in block &&
    "layout" in block
  );
}

export function isStrapiSliderBlock(
  block: unknown
): block is StrapiSliderBlock {
  return (
    hasComponent(block, "shared.slider") &&
    isObject(block) &&
    "slides" in block &&
    Array.isArray(block.slides)
  );
}

export function isStrapiVideoBlock(block: unknown): block is StrapiVideoBlock {
  return (
    hasComponent(block, "shared.video") &&
    isObject(block) &&
    "youtubeId" in block &&
    typeof block.youtubeId === "string"
  );
}

export function isStrapiMediaBlock(block: unknown): block is StrapiMedia {
  return (
    hasComponent(block, "shared.media") && isObject(block) && "file" in block
  );
}

export function isStrapiListItemBlock(block: unknown): block is StrapiListItem {
  return (
    hasComponent(block, "shared.list-item") &&
    isObject(block) &&
    "items" in block &&
    Array.isArray(block.items)
  );
}

export function isStrapiRichtextImageBlock(
  block: unknown
): block is StrapiRichtextImage {
  return (
    hasComponent(block, "shared.richtext-image") &&
    isObject(block) &&
    "image" in block &&
    "content" in block
  );
}

export function isStrapiRichtextVideoBlock(
  block: unknown
): block is StrapiRichtextVideoBlock {
  return (
    hasComponent(block, "shared.richtext-video") &&
    isObject(block) &&
    "video" in block &&
    "content" in block
  );
}

/**
 * Kiểm tra xem block có phải là QuoteBlock không.
 */
export function isQuoteBlock(block: unknown): block is QuoteBlock {
  return (
    hasComponent(block, "shared.quote") &&
    isObject(block) &&
    "quote" in block &&
    "author" in block
  );
}

/**
 * Kiểm tra xem block có phải là RichTextBlock không.
 */
export function isRichTextBlock(block: unknown): block is RichTextBlock {
  return (
    hasComponent(block, "shared.rich-text") &&
    isObject(block) &&
    "body" in block
  );
}

/**
 * Kiểm tra xem block có phải là ImageBlock không.
 */
export function isImageBlock(block: unknown): block is ImageBlock {
  return (
    hasComponent(block, "shared.image") &&
    isObject(block) &&
    "image" in block &&
    "layout" in block
  );
}

/**
 * Kiểm tra xem block có phải là SliderBlock không.
 */
export function isSliderBlock(block: unknown): block is SliderBlock {
  return (
    hasComponent(block, "shared.slider") &&
    isObject(block) &&
    "slides" in block &&
    Array.isArray(block.slides)
  );
}

/**
 * Kiểm tra xem block có phải là VideoBlock không.
 */
export function isVideoBlock(block: unknown): block is VideoBlock {
  return (
    hasComponent(block, "shared.video") &&
    isObject(block) &&
    "youtubeId" in block &&
    "layout" in block
  );
}

/**
 * Kiểm tra xem block có phải là MediaBlock không.
 */
export function isMediaBlock(block: unknown): block is MediaBlock {
  return (
    hasComponent(block, "shared.media") && isObject(block) && "file" in block
  );
}

/**
 * Kiểm tra xem block có phải là ListItemBlock không.
 */
export function isListItemBlock(block: unknown): block is ListItemBlock {
  return (
    hasComponent(block, "shared.list-item") &&
    isObject(block) &&
    "items" in block &&
    Array.isArray(block.items)
  );
}

/**
 * Kiểm tra xem block có phải là RichtextImageBlock không.
 */
export function isRichtextImageBlock(
  block: unknown
): block is RichtextImageBlock {
  return (
    hasComponent(block, "shared.richtext-image") &&
    isObject(block) &&
    "image" in block &&
    "content" in block
  );
}

/**
 * Kiểm tra xem block có phải là RichtextVideoBlock không.
 */
export function isRichtextVideoBlock(
  block: unknown
): block is RichtextVideoBlock {
  return (
    hasComponent(block, "shared.richtext-video") &&
    isObject(block) &&
    "video" in block &&
    "content" in block
  );
}

/**
 * Kiểm tra xem một block có phải là một trong các loại "shared block" đã được ánh xạ hay không.
 * Đây là một hàm hợp nhất (union type guard) để đơn giản hóa logic trong renderer.
 */
export function isContentBlock(block: unknown): block is AnyContentBlock {
  return (
    isQuoteBlock(block) ||
    isRichTextBlock(block) ||
    isImageBlock(block) ||
    isSliderBlock(block) ||
    isVideoBlock(block) ||
    isMediaBlock(block) ||
    isListItemBlock(block) ||
    isRichtextImageBlock(block) ||
    isRichtextVideoBlock(block)
  );
}

/**
 * Kiểm tra xem một block có phải là một trong các loại "section" đã được ánh xạ hay không.
 * Các section này thường chiếm toàn bộ chiều rộng trang.
 */
export function isSection(block: unknown): block is AnyDynamicBlock {
  return (
    isHeroSection(block) ||
    isAboutSection(block) ||
    isServicesSection(block) ||
    isAdvantagesSection(block) ||
    isPartnersSection(block)
    // Thêm isBlogSection(block) ở đây nếu cần
  );
}

// ========= TYPE GUARDS CHO STRAPI SECTIONS =========

export function isStrapiHeroSection(
  section: unknown
): section is StrapiHeroSection {
  return (
    hasComponent(section, "sections.hero") &&
    isObject(section) &&
    "heading" in section &&
    "ctas" in section &&
    Array.isArray(section.ctas)
  );
}

export function isStrapiAboutSection(
  section: unknown
): section is StrapiAboutSection {
  return (
    hasComponent(section, "sections.about") &&
    isObject(section) &&
    "heading" in section &&
    "image" in section
  );
}

export function isStrapiServicesSection(
  section: unknown
): section is StrapiServicesSection {
  return (
    hasComponent(section, "sections.services") &&
    isObject(section) &&
    "heading" in section &&
    "services" in section &&
    Array.isArray(section.services)
  );
}

export function isStrapiAdvantagesSection(
  section: unknown
): section is StrapiAdvantagesSection {
  return (
    hasComponent(section, "sections.advantages") &&
    isObject(section) &&
    "heading" in section &&
    "items" in section &&
    Array.isArray(section.items)
  );
}

export function isStrapiBlogSection(
  section: unknown
): section is StrapiBlogSection {
  return (
    hasComponent(section, "sections.blog") &&
    isObject(section) &&
    "heading" in section
  );
}

export function isStrapiPartnersSection(
  section: unknown
): section is StrapiPartnersSection {
  return (
    hasComponent(section, "sections.partners") &&
    isObject(section) &&
    "heading" in section &&
    "items" in section &&
    Array.isArray(section.items)
  );
}

export function isHeroSection(section: unknown): section is HeroSection {
  return (
    hasComponent(section, "sections.hero") &&
    isObject(section) &&
    "title" in section &&
    "ctas" in section &&
    Array.isArray(section.ctas)
  );
}

export function isAboutSection(section: unknown): section is AboutSectionData {
  return (
    hasComponent(section, "sections.about") &&
    isObject(section) &&
    "title" in section &&
    "imageUrl" in section
  );
}

export function isServicesSection(
  section: unknown
): section is ServicesSectionData {
  return (
    hasComponent(section, "sections.services") &&
    isObject(section) &&
    "title" in section &&
    "services" in section &&
    Array.isArray(section.services)
  );
}

export function isAdvantagesSection(
  section: unknown
): section is AdvantagesSectionData {
  return (
    hasComponent(section, "sections.advantages") &&
    isObject(section) &&
    "title" in section &&
    "items" in section &&
    Array.isArray(section.items)
  );
}

export function isPartnersSection(
  section: unknown
): section is PartnersSectionData {
  return (
    hasComponent(section, "sections.partners") &&
    isObject(section) &&
    "title" in section &&
    "items" in section &&
    Array.isArray(section.items)
  );
}
