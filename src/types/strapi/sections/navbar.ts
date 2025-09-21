import { StrapiEntity, StrapiResponse, StrapiResponseCollection } from "../strapi";

/**
 * Cấu trúc dữ liệu Navbar cuối cùng, đã được đơn giản hóa để sử dụng trong các component frontend.
 * Đây là kiểu dữ liệu "sạch" sau khi đã qua hàm `mapNavbar`.
 */
export interface Navbar {
  id: number;
  name: string;
  items: NavbarItem[];
}

/**
 * Cấu trúc dữ liệu của một mục trong Navbar, đã được đơn giản hóa cho frontend.
 * Hỗ trợ các menu con lồng nhau (đệ quy) thông qua thuộc tính `children`.
 */
export interface NavbarItem {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  children: NavbarItem[];
}

// --- Các type cho dữ liệu thô từ API của Strapi ---
// Các type này mô hình hóa cấu trúc "phẳng" (đã qua transformer) từ API Strapi.

/**
 * Đại diện cho cấu trúc dữ liệu thô của một mục trong Navbar từ API (đã qua transformer).
 * Đây là "Source of Truth" được dùng để ánh xạ sang `NavbarItem`.
 * Nó bao gồm tất cả các trường được Strapi trả về.
 * Kế thừa từ `StrapiEntity` để có các trường metadata chung.
 */
export interface StrapiNavbarItem extends StrapiEntity {
  title: string;
  subtitle: string | null;
  url: string;
  children: StrapiNavbarItem[];
}

/**
 * Đại diện cho cấu trúc dữ liệu thô của một tài liệu Navbar từ API (đã qua transformer).
 * Một tài liệu tương ứng với một menu cụ thể trong Strapi (ví dụ: "Main Menu", "Footer Menu").
 */
export interface NavbarDocument extends StrapiEntity {
  name: string;
  items: StrapiNavbarItem[];
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu Navbar đơn lẻ. */
export type NavbarResponse = StrapiResponse<NavbarDocument>;

/**
 * Lớp vỏ (wrapper) của Strapi cho một danh sách (collection) các tài liệu Navbar.
 */
export type NavbarCollectionResponse = StrapiResponseCollection<NavbarDocument>;
