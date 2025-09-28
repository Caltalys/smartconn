import {
  StrapiEntity,
  StrapiResponse,
  StrapiResponseCollection,
} from "../strapi";
import { mapMenuItem, MenuItem, StrapiMenuItem } from "./menu-item";
export interface StrapiNavbar extends StrapiEntity {
  name: string;
  items: StrapiMenuItem[];
}

// Mapped for frontend
export interface Navbar extends StrapiEntity {
  name: string;
  items: MenuItem[]; // ← mapped from StrapiMenuItem
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu Navbar đơn lẻ. */
export type NavbarResponse = StrapiResponse<StrapiNavbar>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu Navbar.
 */
export type NavbarCollectionResponse = StrapiResponseCollection<StrapiNavbar>;

export function mapNavbar(navbar: StrapiNavbar | null): Navbar | null {
  if (!navbar) return null;

  return {
    ...navbar,
    items: (navbar.items ?? []).map(mapMenuItem),
  };
}
