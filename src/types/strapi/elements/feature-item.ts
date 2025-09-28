import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";
import { Icon, mapIcon, StrapiIcon } from "./icon";
import { Link, mapLink, StrapiLink } from "./link";

// Raw Strapi Type
export interface StrapiFeatureItem extends StrapiComponent {
  __component: "elements.feature-item";
  heading: string;
  description?: string | null;
  image: BaseMedia;
  cta: StrapiLink;
  icon?: StrapiIcon | null;
}

// Mapped Frontend Type
export interface FeatureItem extends StrapiComponent {
  __component: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  imageAlt: string;
  cta: Link;
  icon: Icon | null;
}

export function mapFeatureItem(item: StrapiFeatureItem): FeatureItem {
  return {
    ...item,
    title: item.heading,
    imageUrl: getStrapiMedia(item.image?.url) ?? "/placeholder.jpg",
    imageAlt: item.image?.alternativeText ?? item.heading,
    cta: mapLink(item.cta),
    icon: item.icon ? mapIcon(item.icon) : null,
  };
}
