import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiPartnerItem {
  __component: "elements.partner-item";
  id: number;
  heading: string;
  href: string;
  image: StrapiMedia;
  title?: string | null;
  alt?: string | null;
}

// Mapped Frontend Type
export interface PartnerItem {
  id: number;
  name: string;
  href: string;
  logoUrl: string;
  title: string | null;
  alt: string;
}

export function mapPartnerItem(item: StrapiPartnerItem): PartnerItem {
  return {
    id: item.id,
    name: item.heading,
    href: item.href,
    logoUrl: getStrapiMedia(item.image?.url) ?? "/placeholder.png",
    title: item.title ?? null,
    alt: item.alt ?? item.heading,
  };
}
