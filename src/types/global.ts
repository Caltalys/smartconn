import { getStrapiMedia } from "@/lib/utils";
import React from "react";
import { mapSeo, Seo, StrapiSeo } from "./strapi/shared/seo";
import { BaseMedia, StrapiResponse } from "./strapi/strapi";

export interface BaseProps {
  params: { locale: string };
}

export interface AsyncBaseProps {
  params: Promise<{ locale: string }>;
}

export type AsyncProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export interface StrapiGlobal {
  id: number;
  siteName: string;
  favicon: BaseMedia | null;
  siteDescription: string;
  defaultSeo: StrapiSeo;
  logo: BaseMedia | null;
}

// Mapped for frontend
export interface GlobalConfig {
  siteName: string;
  faviconUrl: string | null;
  siteDescription: string;
  defaultSeo: Seo;
  logoUrl: string | null;
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type GlobalConfigResponse = StrapiResponse<GlobalConfig>;

export function mapGlobal(global: StrapiGlobal): GlobalConfig {
  return {
    siteName: global.siteName,
    faviconUrl: global.favicon ? getStrapiMedia(global.favicon.url) : null,
    siteDescription: global.siteDescription,
    defaultSeo: mapSeo(global.defaultSeo),
    logoUrl: global.logo ? getStrapiMedia(global.logo.url) : null,
  };
}
