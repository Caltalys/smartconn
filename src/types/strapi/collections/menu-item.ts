// types/strapi/entities/menu-item.ts

import { Icon, mapIcon, StrapiIcon } from "../elements/icon";

export interface StrapiMenuItem {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  icon: StrapiIcon | null;
  children: StrapiMenuItem[];
  parent: StrapiMenuItem | null;
}

// Mapped for frontend
export interface MenuItem {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  icon: Icon | null; // ← mapped from StrapiIcon
  children: MenuItem[];
}

export function mapMenuItem(item: StrapiMenuItem): MenuItem {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    url: item.url,
    icon: item.icon ? mapIcon(item.icon) : null,
    children: (item.children ?? []).map(mapMenuItem), // ← đệ quy
  };
}
