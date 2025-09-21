import { StrapiResponse, StrapiResponseCollection } from "../strapi";
import { mapMenuItem, MenuItem, StrapiMenuItem } from "./menu-item";
export interface StrapiNavbar {
  id: number;
  name: string;
  items: StrapiMenuItem[];
}

// Mapped for frontend
export interface Navbar {
  id: number;
  name: string;
  items: MenuItem[]; // ← mapped from StrapiMenuItem
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu Navbar đơn lẻ. */
export type NavbarResponse = StrapiResponse<StrapiNavbar>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu Navbar.
 */
export type NavbarCollectionResponse = StrapiResponseCollection<StrapiNavbar>;

export function mapNavbar(navbar: StrapiNavbar): Navbar {
  return {
    id: navbar.id,
    name: navbar.name,
    items: (navbar.items ?? []).map(mapMenuItem),
  };
}
