import {
  mapPartnerItem,
  PartnerItem,
  StrapiPartnerItem,
} from "../elements/partner-item";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiPartnersSection extends StrapiComponent {
  __component: "sections.partners";
  title?: string | null;
  heading: string;
  items: StrapiPartnerItem[];
}

// Mapped Frontend Type
export interface PartnersSectionData extends StrapiComponent {
  __component: "sections.partners";
  pretitle: string;
  title: string;
  items: PartnerItem[];
}

export function mapPartnersSection(
  section: StrapiPartnersSection
): PartnersSectionData {
  return {
    ...section,
    pretitle: section.title ?? "",
    title: section.heading,
    items: (section.items ?? []).map(mapPartnerItem),
  };
}
