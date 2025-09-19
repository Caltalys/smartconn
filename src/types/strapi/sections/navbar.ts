// src/types/strapi-navbar.ts

/**
 * Đây là cấu trúc Navbar cuối cùng, đã được đơn giản hóa để sử dụng ở frontend.
 * Nó là kết quả của việc ánh xạ (mapping) dữ liệu thô từ API.
 */
export interface Navbar {
  id: number;
  name: string;
  items: NavbarItem[];
}

/**
 * Đây là cấu trúc NavbarItem cuối cùng, đã được đơn giản hóa để sử dụng ở frontend.
 */
export interface NavbarItem {
  id: number;
  title: string;
  subtitle: string | null;
  url: string;
  children: NavbarItem[];
}

// --- Các type cho dữ liệu thô từ API của Strapi ---
// Các type này mô hình hóa cấu trúc "phẳng" từ API Strapi của bạn.

/**
 * Đại diện cho cấu trúc phẳng của một navbar item từ API.
 * Nó bao gồm tất cả các trường được Strapi trả về.
 */
export interface StrapiNavbarItem {
  id: number;
  documentId: string;
  title: string;
  subtitle: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  children: StrapiNavbarItem[];
}

/**
 * Đại diện cho cấu trúc phẳng của một navbar document từ API.
 * Lưu ý rằng nó KHÔNG có thuộc tính `attributes` lồng nhau.
 */
export interface NavbarDocument {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  items: StrapiNavbarItem[];
}

/**
 * Đây là lớp vỏ (wrapper) của Strapi cho một document đơn lẻ.
 */
export interface NavbarResponse {
  data: NavbarDocument;
  meta: Record<string, unknown>;
}

/**
 * Đây là lớp vỏ (wrapper) của Strapi cho một collection (danh sách).
 */
export interface NavbarCollectionResponse {
  data: NavbarDocument[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
