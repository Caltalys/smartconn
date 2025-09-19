
import { Link, StrapiLink } from "../elements/link";
import { Media, StrapiComponent } from "../strapi";

// --- Các component Media (dùng trong Hero Section) ---

/**
 * Cấu trúc dữ liệu thô của Media Image.
 * API ID: shared.image
 */
export interface StrapiMediaImage extends StrapiComponent {
  image: Media;
  alternativeText?: string | null;
  layout: 'background' | 'side-image';
}

/**
 * Cấu trúc dữ liệu của Media Image đã được ánh xạ cho frontend.
 */
export type MediaImage = Omit<StrapiMediaImage, '__component'>;

/**
 * Cấu trúc dữ liệu thô của Media Video.
 * API ID: shared.video
 */
export interface StrapiMediaVideo extends StrapiComponent {
  youtubeId: string;
  layout: 'background' | 'side-video';
}

/**
 * Cấu trúc dữ liệu của Media Video đã được ánh xạ cho frontend.
 */
export type MediaVideo = Omit<StrapiMediaVideo, '__component'>;

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

/**
 * Cấu trúc dữ liệu thô của Media Slider.
 * API ID: shared.slider
 */
export interface StrapiMediaSlider extends StrapiComponent {
  slides: StrapiSlide[];
}

/**
 * Cấu trúc dữ liệu của Media Slider đã được ánh xạ cho frontend.
 */
export type MediaSlider = Omit<StrapiMediaSlider, '__component' | 'slides'> & {
    slides: Slide[];
};


// --- Component Hero Section ---

/**
 * Cấu trúc dữ liệu thô của Hero Section từ Strapi.
 * API ID: sections.hero
 */
export interface StrapiHeroSection extends StrapiComponent {
  __component: 'sections.hero';
  heading: string;
  subheading?: string | null;
  description?: string | null; // Rich Text
  ctas: StrapiLink[];
  layout: 'text-left' | 'text-center' | 'text-right';
  mediaType: 'image' | 'video' | 'slider' | 'none';
  mediaImage?: StrapiMediaImage | null;
  mediaVideo?: StrapiMediaVideo | null;
  mediaSlider?: StrapiMediaSlider | null;
}

/**
 * Cấu trúc dữ liệu của Hero Section đã được ánh xạ cho frontend.
 */
export type HeroSection = Omit<StrapiHeroSection, 'mediaImage' | 'mediaVideo' | 'mediaSlider' | 'ctas'> & {
  ctas: Link[];
  mediaImage?: MediaImage | null;
  mediaVideo?: MediaVideo | null;
  mediaSlider?: MediaSlider | null;
};