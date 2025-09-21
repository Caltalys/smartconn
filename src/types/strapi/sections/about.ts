import { getStrapiMedia } from "@/lib/utils";
import { Link, mapLink, StrapiLink } from "../elements/link";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiAboutSection {
  __component: "sections.about";
  id: number;
  title?: string | null;
  heading: string;
  description?: string | null;
  ctas: StrapiLink[];
  image: { data: StrapiMedia };
}

// Mapped Frontend Type
export interface AboutSectionData {
  __component: "sections.about";
  id: number;
  pretitle: string;
  title: string;
  description: string;
  ctas: Link[];
  imageUrl: string;
  imageAlt: string;
}

export function mapAboutSection(section: StrapiAboutSection): AboutSectionData {
  return {
    __component: section.__component,
    id: section.id,
    pretitle: section.title ?? "",
    title: section.heading,
    description: section.description ?? "",
    ctas: (section.ctas ?? []).map(mapLink),
    imageUrl: getStrapiMedia(section.image?.data?.url) ?? "/fallback-about.jpg",
    imageAlt: section.image?.data?.alternativeText ?? section.heading,
  };
}
