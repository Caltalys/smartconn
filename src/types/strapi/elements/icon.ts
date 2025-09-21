import { getStrapiMedia } from "@/lib/utils";
import { StrapiMedia } from "../strapi";

// Raw Strapi Type
export interface StrapiIcon {
  __component: "elements.icon";
  id: number;
  name?: string | null;
  iconName?: string | null;
  iconImage?: StrapiMedia | null;
  svgContent?: string | null;
}

// Mapped Frontend Type
export interface Icon {
  id: number;
  name: string;
  iconName: string | null;
  imageUrl: string | null;
  svgContent: string | null;
}

export function mapIcon(icon: StrapiIcon): Icon {
  return {
    id: icon.id,
    name: icon.name ?? "",
    iconName: icon.iconName ?? null,
    imageUrl: icon.iconImage ? getStrapiMedia(icon.iconImage.url) : null,
    svgContent: icon.svgContent ?? null,
  };
}
