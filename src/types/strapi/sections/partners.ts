import {
  mapPartnerItem,
  PartnerItem,
  StrapiPartnerItem,
} from "../elements/partner-item";

// Raw Strapi Type
export interface StrapiPartnersSection {
  __component: "sections.partners";
  id: number;
  title?: string | null;
  heading: string;
  items: StrapiPartnerItem[];
}

// Mapped Frontend Type
export interface PartnersSectionData {
  __component: "sections.partners";
  id: number;
  pretitle: string;
  title: string;
  items: PartnerItem[];
}

export function mapPartnersSection(
  section: StrapiPartnersSection
): PartnersSectionData {
  return {
    __component: section.__component,
    id: section.id,
    pretitle: section.title ?? "",
    title: section.heading,
    items: (section.items ?? []).map(mapPartnerItem),
  };
}
