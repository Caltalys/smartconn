import { StrapiAboutSection } from "@/types/strapi/sections/about";
import { StrapiAdvantagesSection } from "@/types/strapi/sections/advantages";
import { StrapiBlogSection } from "@/types/strapi/sections/blog";
import { StrapiHeroSection } from "@/types/strapi/sections/hero";
import { StrapiPartnersSection } from "@/types/strapi/sections/partners";
import { StrapiServicesSection } from "@/types/strapi/sections/services";
import { StrapiImageBlock } from "@/types/strapi/shared/image";
import { StrapiListItemBlock } from "@/types/strapi/shared/list-item";
import { StrapiMediaBlock } from "@/types/strapi/shared/media";
import { StrapiQuoteBlock } from "@/types/strapi/shared/quote";
import { StrapiRichTextBlock } from "@/types/strapi/shared/rich-text";
import { StrapiRichtextImageBlock } from "@/types/strapi/shared/richtext-image";
import { StrapiRichtextVideoBlock } from "@/types/strapi/shared/richtext-video";
import { StrapiSliderBlock } from "@/types/strapi/shared/slider";
import { StrapiVideoBlock } from "@/types/strapi/shared/video";

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

export function isStrapiQuoteBlock(block: unknown): block is StrapiQuoteBlock {
  return (
    hasComponent(block, "shared.quote") &&
    isObject(block) &&
    "body" in block &&
    typeof block.body === "string"
  );
}

export function isStrapiRichTextBlock(
  block: unknown
): block is StrapiRichTextBlock {
  return (
    hasComponent(block, "shared.rich-text") &&
    isObject(block) &&
    "body" in block &&
    typeof block.body === "string"
  );
}

export function isStrapiImageBlock(block: unknown): block is StrapiImageBlock {
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

export function isStrapiMediaBlock(block: unknown): block is StrapiMediaBlock {
  return (
    hasComponent(block, "shared.media") && isObject(block) && "file" in block
  );
}

export function isStrapiListItemBlock(
  block: unknown
): block is StrapiListItemBlock {
  return (
    hasComponent(block, "shared.list-item") &&
    isObject(block) &&
    "items" in block &&
    Array.isArray(block.items)
  );
}

export function isStrapiRichtextImageBlock(
  block: unknown
): block is StrapiRichtextImageBlock {
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
