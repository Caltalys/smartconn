import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiServicesSection extends StrapiComponent {
  __component: "sections.services";
  title?: string | null;
  heading: string;
  description?: string | null;
  services: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface ServicesSectionData extends StrapiComponent {
  __component: "sections.services";
  pretitle: string;
  title: string;
  description: string;
  services: FeatureItem[];
}

export function mapServicesSection(
  section: StrapiServicesSection
): ServicesSectionData {
  return {
    ...section,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    services: (section.services ?? []).map(mapFeatureItem),
  };
}
