import { getStrapiMedia } from "@/lib/utils";
import { BaseMedia, StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiIcon extends StrapiComponent {
  __component: "elements.icon";
  name: string | null;
  iconName: string | null;
  iconImage: BaseMedia | null;
  svgContent: string | null;
}

// Mapped Frontend Type
export interface Icon extends StrapiComponent {
  name: string | null;
  iconName: string | null;
  imageUrl: string | null;
  svgContent: string | null;
}

export function mapIcon(icon: StrapiIcon): Icon {
  return {
    ...icon,
    iconName: icon.iconName ?? null,
    imageUrl: icon.iconImage ? getStrapiMedia(icon.iconImage.url) : null,
    svgContent: icon.svgContent ?? null,
  };
}
