import { StrapiComponent, Media } from "../strapi";
import { StrapiLink, Link } from "../elements/link";

/**
 * Cấu trúc dữ liệu thô của About Section từ Strapi.
 * API ID: sections.about
 */
export interface StrapiAboutSection extends StrapiComponent {
  __component: 'sections.about';
  title?: string | null;
  heading: string;
  description?: string | null;
  ctas: StrapiLink[];
  image: Media;
}

/**
 * Cấu trúc dữ liệu của About Section đã được ánh xạ cho frontend.
 */
export type AboutSectionData = Omit<StrapiAboutSection, 'ctas' | 'image' | 'heading'> & {
  pretitle: string;
  title: string;
  description: string;
  ctas: Link[];
  imageUrl: string;
  imageAlt: string;
};