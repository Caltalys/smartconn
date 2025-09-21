import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";

// Raw Strapi Type
export interface StrapiServicesSection {
  __component: "sections.services";
  id: number;
  title?: string | null;
  heading: string;
  description?: string | null;
  services: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface ServicesSectionData {
  __component: "sections.services";
  id: number;
  pretitle: string;
  title: string;
  description: string;
  services: FeatureItem[];
}

export function mapServicesSection(
  section: StrapiServicesSection
): ServicesSectionData {
  return {
    __component: section.__component,
    id: section.id,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    services: (section.services ?? []).map(mapFeatureItem),
  };
}
