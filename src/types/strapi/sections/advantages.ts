import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";

// Raw Strapi Type
export interface StrapiAdvantagesSection {
  __component: "sections.advantages";
  id: number;
  title?: string | null;
  heading: string;
  description?: string | null;
  items: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface AdvantagesSectionData {
  __component: "sections.advantages";
  id: number;
  pretitle: string;
  title: string;
  description: string;
  items: FeatureItem[];
}

export function mapAdvantagesSection(
  section: StrapiAdvantagesSection
): AdvantagesSectionData {
  return {
    __component: section.__component,
    id: section.id,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    items: (section.items ?? []).map(mapFeatureItem),
  };
}
