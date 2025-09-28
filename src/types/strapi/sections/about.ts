import { getStrapiMedia } from "@/lib/utils";
import { Link, mapLink, StrapiLink } from "../elements/link";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiAboutSection extends StrapiComponent {
  __component: "sections.about";
  title?: string | null;
  heading: string;
  description?: string | null;
  ctas: StrapiLink[];
  image: { data: BaseMedia };
}

// Mapped Frontend Type
export interface AboutSectionData extends StrapiComponent {
  __component: "sections.about";
  pretitle: string;
  title: string;
  description: string;
  ctas: Link[];
  imageUrl: string;
  imageAlt: string;
}

export function mapAboutSection(section: StrapiAboutSection): AboutSectionData {
  return {
    ...section,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    ctas: (section.ctas ?? []).map(mapLink),
    imageUrl: getStrapiMedia(section.image?.data?.url) ?? "/fallback-about.jpg",
    imageAlt: section.image?.data?.alternativeText ?? section.heading,
  };
}
