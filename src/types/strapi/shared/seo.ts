import { BaseMedia, StrapiComponent } from "../strapi";

export interface StrapiSeo extends StrapiComponent {
  __component: "shared.seo";
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: BaseMedia | null;
  metaSocial: string | null; // ← nếu có
}

export interface Seo extends StrapiComponent {
  title: string | null;
  description: string | null;
  image: string | null;
}

export function mapSeo(seo: StrapiSeo): Seo {
  return {
    ...seo,
    title: seo.metaTitle ?? null,
    description: seo.metaDescription ?? null,
    image: seo.metaImage ? seo.metaImage.url : null,
  };
}
