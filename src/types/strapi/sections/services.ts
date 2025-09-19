import { StrapiComponent, Media } from "../strapi";
import { StrapiLink, Link } from "../elements/link";
import { Icon, StrapiIcon } from "../elements/icon";

/**
 * Cấu trúc dữ liệu thô của một Feature Item từ Strapi.
 * API ID: elements.feature-item
 */
export interface StrapiFeatureItem extends StrapiComponent {
  __component: 'elements.feature-item';
  heading: string;
  description?: string | null;
  image: Media;
  cta: StrapiLink;
  icon?: StrapiIcon | null;
}

/**
 * Cấu trúc dữ liệu của Feature Item đã được ánh xạ cho frontend.
 */
export type FeatureItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  cta: Link;
  icon: Icon | null;
};

/**
 * Cấu trúc dữ liệu thô của Services Section từ Strapi.
 * API ID: sections.services
 */
export interface StrapiServicesSection extends StrapiComponent {
  __component: 'sections.services';
  title?: string | null;
  heading: string;
  services: StrapiFeatureItem[];
}

/**
 * Cấu trúc dữ liệu của Services Section đã được ánh xạ cho frontend.
 */
export type ServicesSectionData = Omit<StrapiServicesSection, 'title' | 'heading' | 'services'> & {
  pretitle: string;
  title: string;
  services: FeatureItem[];
};