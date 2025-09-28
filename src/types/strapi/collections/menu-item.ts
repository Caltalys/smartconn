// types/strapi/entities/menu-item.ts

import { Icon, mapIcon, StrapiIcon } from "../elements/icon";
import { StrapiEntity } from "../strapi";

export interface StrapiMenuItem extends StrapiEntity {
  title: string;
  subtitle: string | null;
  url: string;
  icon: StrapiIcon | null;
  children: StrapiMenuItem[];
  parent: StrapiMenuItem | null;
}

// Mapped for frontend
export interface MenuItem extends StrapiEntity {
  title: string;
  subtitle: string | null;
  url: string;
  icon: Icon | null; // ← mapped from StrapiIcon
  children: MenuItem[];
}

export function mapMenuItem(item: StrapiMenuItem): MenuItem {
  return {
    ...item,
    icon: item.icon ? mapIcon(item.icon) : null,
    children: (item.children ?? []).map(mapMenuItem), // ← đệ quy
  };
}
