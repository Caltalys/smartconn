import {
  isStrapiAboutSection,
  isStrapiAdvantagesSection,
  isStrapiHeroSection,
  isStrapiImageBlock,
  isStrapiListItemBlock,
  isStrapiMediaBlock,
  isStrapiPartnersSection,
  isStrapiQuoteBlock,
  isStrapiRichTextBlock,
  isStrapiRichtextImageBlock,
  isStrapiRichtextVideoBlock,
  isStrapiServicesSection,
  isStrapiSliderBlock,
  isStrapiVideoBlock,
} from "@/utils/type-guards";
import {
  AboutSectionData,
  mapAboutSection,
  StrapiAboutSection,
} from "../sections/about";
import {
  AdvantagesSectionData,
  mapAdvantagesSection,
  StrapiAdvantagesSection,
} from "../sections/advantages";
import {
  HeroSection,
  mapHeroSection,
  StrapiHeroSection,
} from "../sections/hero";
import {
  mapPartnersSection,
  PartnersSectionData,
  StrapiPartnersSection,
} from "../sections/partners";
import {
  mapServicesSection,
  ServicesSectionData,
  StrapiServicesSection,
} from "../sections/services";
import { mapImageBlock } from "../shared/image";
import { mapListItemBlock } from "../shared/list-item";
import { mapMediaBlock } from "../shared/media";
import { mapQuoteBlock } from "../shared/quote";
import { mapRichTextBlock } from "../shared/rich-text";
import { mapRichtextImageBlock } from "../shared/richtext-image";
import { mapRichtextVideoBlock } from "../shared/richtext-video";
import { mapSliderBlock } from "../shared/slider";
import { mapVideoBlock } from "../shared/video";
import { StrapiBlock } from "../strapi";
import { AnyContentBlock, AnyStrapiContentBlock } from "./content-blocks";

/**
 * Union type cho tất cả các block (section + shared) thô từ Strapi Dynamic Zone.
 * Dùng trong tầng data fetching và mapping.
 */
export type AnyStrapiDynamicBlock =
  | StrapiHeroSection
  | StrapiAboutSection
  | StrapiServicesSection
  | StrapiAdvantagesSection
  | StrapiPartnersSection
  //   | StrapiBlogSection
  | AnyStrapiContentBlock; // ← StrapiSharedBlock đã là union của tất cả shared block

/**
 * Kiểu dự phòng cho các block chưa được định nghĩa.
 */
export interface UnknownStrapiDynamicBlock extends StrapiBlock {}

/**
 * Union type cho tất cả các block (section + shared) đã được ánh xạ cho frontend.
 * Dùng trong PageRenderer và BlockRenderer để render UI.
 */
export type AnyDynamicBlock =
  | HeroSection
  | AboutSectionData
  | ServicesSectionData
  | AdvantagesSectionData
  | PartnersSectionData
  // | BlogSectionData
  | AnyContentBlock;

/**
 * Kiểu dự phòng cho các block chưa được hỗ trợ trong frontend.
 */
export interface UnknownDynamicBlock extends StrapiBlock {}

export async function mapDynamicBlock(
  sections: AnyStrapiDynamicBlock[]
): Promise<AnyDynamicBlock[]> {
  if (!sections) return [];

  const mappedSectionPromises = sections.map(async (section) => {
    try {
      if (isStrapiHeroSection(section)) {
        return mapHeroSection(section);
      }
      if (isStrapiAboutSection(section)) {
        return mapAboutSection(section);
      }
      if (isStrapiServicesSection(section)) {
        return mapServicesSection(section);
      }
      if (isStrapiAdvantagesSection(section)) {
        return mapAdvantagesSection(section);
      }
      if (isStrapiPartnersSection(section)) {
        return mapPartnersSection(section);
      }
      if (isStrapiQuoteBlock(section)) {
        return mapQuoteBlock(section);
      }
      if (isStrapiRichTextBlock(section)) {
        return mapRichTextBlock(section);
      }
      if (isStrapiImageBlock(section)) {
        return mapImageBlock(section);
      }
      if (isStrapiSliderBlock(section)) {
        return mapSliderBlock(section);
      }
      if (isStrapiVideoBlock(section)) {
        return mapVideoBlock(section);
      }
      if (isStrapiMediaBlock(section)) {
        return mapMediaBlock(section);
      }
      if (isStrapiListItemBlock(section)) {
        return mapListItemBlock(section);
      }
      if (isStrapiRichtextImageBlock(section)) {
        return mapRichtextImageBlock(section);
      }
      if (isStrapiRichtextVideoBlock(section)) {
        return mapRichtextVideoBlock(section);
      }
      // if (isStrapiBlogSection(section)) {
      //   return mapBlogSection(section, locale);
      // }

      console.warn(
        `[mapContentSections] Unknown section/block type: ${(section as UnknownStrapiDynamicBlock).__component}`
      );
      return null;
    } catch (error) {
      console.error(
        `[mapContentSections] Error mapping section ${section.__component} id: ${section.id}`,
        error
      );
      return null;
    }
  });

  const mappedSections = await Promise.all(mappedSectionPromises);
  const filteredSections = mappedSections.filter(
    (section): section is AnyDynamicBlock => section !== null
  );

  return filteredSections;
}
