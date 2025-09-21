import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";
import { Icon, mapIcon, StrapiIcon } from "./icon";
import { Link, mapLink, StrapiLink } from "./link";

// Raw Strapi Type
export interface StrapiFeatureItem {
  __component: "elements.feature-item";
  id: number;
  heading: string;
  description?: string | null;
  image: { data: StrapiMedia };
  cta: StrapiLink;
  icon?: StrapiIcon | null;
}

// Mapped Frontend Type
export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  cta: Link;
  icon: Icon | null;
}

export function mapFeatureItem(item: StrapiFeatureItem): FeatureItem {
  return {
    id: item.id,
    title: item.heading,
    description: item.description ?? "",
    imageUrl: getStrapiMedia(item.image?.data?.url) ?? "/placeholder.jpg",
    imageAlt: item.image?.data?.alternativeText ?? item.heading,
    cta: mapLink(item.cta),
    icon: item.icon ? mapIcon(item.icon) : null,
  };
}
