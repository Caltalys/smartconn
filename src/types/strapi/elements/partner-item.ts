import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiPartnerItem extends StrapiComponent {
  __component: "elements.partner-item";
  heading: string;
  href: string;
  image: BaseMedia;
  title: string | null;
  alt: string | null;
}

// Mapped Frontend Type
export interface PartnerItem extends StrapiComponent {
  name: string;
  href: string;
  logoUrl: string;
  title: string | null;
  alt: string;
}

export function mapPartnerItem(item: StrapiPartnerItem): PartnerItem {
  return {
    ...item,
    name: item.heading,
    logoUrl: getStrapiMedia(item.image?.url) ?? "/placeholder.png",
    alt: item.alt ?? item.heading,
  };
}
