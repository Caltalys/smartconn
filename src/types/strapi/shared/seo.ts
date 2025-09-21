import { StrapiMedia } from "../strapi";

export interface StrapiSeo {
  __component: "shared.seo";
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: StrapiMedia | null;
  metaSocial: string | null; // ← nếu có
}

export interface Seo {
  title: string | null;
  description: string | null;
  image: string | null;
}

export function mapSeo(seo: StrapiSeo): Seo {
  return {
    title: seo.metaTitle ?? null,
    description: seo.metaDescription ?? null,
    image: seo.metaImage ? seo.metaImage.url : null,
  };
}
