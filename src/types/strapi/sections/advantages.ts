import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiAdvantagesSection extends StrapiComponent {
  __component: "sections.advantages";
  title?: string | null;
  heading: string;
  description?: string | null;
  items: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface AdvantagesSectionData extends StrapiComponent {
  __component: "sections.advantages";
  pretitle: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

export function mapAdvantagesSection(
  section: StrapiAdvantagesSection
): AdvantagesSectionData {
  return {
    ...section,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    items: (section.items ?? []).map(mapFeatureItem),
  };
}
