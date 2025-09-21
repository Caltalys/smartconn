import { Media, StrapiComponent } from "../strapi";

/**
 * Cấu trúc dữ liệu thô của một Slide.
 * API ID: elements.slide
 */
export interface StrapiSlide extends StrapiComponent {
    image: Media;
    alternativeText?: string | null;
    caption?: string | null;
}

/**
 * Cấu trúc dữ liệu của một Slide đã được ánh xạ cho frontend.
 */
export type Slide = Omit<StrapiSlide, '__component'>;