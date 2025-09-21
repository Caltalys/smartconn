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
import { AnySharedBlock, StrapiSharedBlock } from "../blocks";
import { mapImageBlock } from "../shared/image";
import { mapListItemBlock } from "../shared/list-item";
import { mapMediaBlock } from "../shared/media";
import { mapQuoteBlock } from "../shared/quote";
import { mapRichTextBlock } from "../shared/rich-text";
import { mapRichtextImageBlock } from "../shared/richtext-image";
import { mapRichtextVideoBlock } from "../shared/richtext-video";
import { mapSliderBlock } from "../shared/slider";
import { mapVideoBlock } from "../shared/video";
import { AboutSectionData, mapAboutSection, StrapiAboutSection } from "./about";
import {
  AdvantagesSectionData,
  mapAdvantagesSection,
  StrapiAdvantagesSection,
} from "./advantages";
import { HeroSection, mapHeroSection, StrapiHeroSection } from "./hero";
import {
  mapPartnersSection,
  PartnersSectionData,
  StrapiPartnersSection,
} from "./partners";
import {
  mapServicesSection,
  ServicesSectionData,
  StrapiServicesSection,
} from "./services";

/**
 * Union type cho tất cả các block (section + shared) thô từ Strapi Dynamic Zone.
 * Dùng trong tầng data fetching và mapping.
 */
export type AnyStrapiContentBlock =
  | StrapiHeroSection
  | StrapiAboutSection
  | StrapiServicesSection
  | StrapiAdvantagesSection
  | StrapiPartnersSection
  //   | StrapiBlogSection
  | StrapiSharedBlock; // ← StrapiSharedBlock đã là union của tất cả shared block

/**
 * Kiểu dự phòng cho các block chưa được định nghĩa.
 */
export interface UnknownStrapiContentBlock {
  __component: string;
  id: number;
  [key: string]: unknown;
}

/**
 * Union type cho tất cả các block (section + shared) đã được ánh xạ cho frontend.
 * Dùng trong PageRenderer và BlockRenderer để render UI.
 */
export type AnyContentBlock =
  | HeroSection
  | AboutSectionData
  | ServicesSectionData
  | AdvantagesSectionData
  | PartnersSectionData
  //   | BlogSectionData
  | AnySharedBlock; // ← AnySharedBlock đã là union của tất cả shared block

/**
 * Kiểu dự phòng cho các block chưa được hỗ trợ trong frontend.
 */
export interface UnknownContentBlock {
  __component: string;
  id: number;
}

export async function mapContentSections(
  sections: AnyStrapiContentBlock[],
  locale: string
): Promise<AnyContentBlock[]> {
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
      //   if (isStrapiBlogSection(section)) {
      // Lưu ý: Việc mapping cho Blog section yêu cầu gọi API để lấy bài viết.
      // Logic này nên được đặt ở tầng API (`lib/api`) thay vì ở đây để tránh circular dependency.
      //   }

      console.warn(
        `[mapContentSections] Unknown section/block type: ${(section as UnknownStrapiContentBlock).__component}`
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
    (section): section is AnyContentBlock => section !== null
  );

  return filteredSections;
}
