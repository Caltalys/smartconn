import { StrapiComponent } from '../strapi';
import { FeatureItem, StrapiFeatureItem } from './services';

/**
 * Cấu trúc dữ liệu thô của Advantages Section từ Strapi.
 * API ID: sections.advantages
 */
export interface StrapiAdvantagesSection extends StrapiComponent {
    __component: 'sections.advantages';
    title?: string | null; // Sẽ được map thành pretitle
    heading: string; // Sẽ được map thành title
    description?: string | null;
    items: StrapiFeatureItem[];
}

/**
 * Cấu trúc dữ liệu của Advantages Section đã được ánh xạ cho frontend.
 */
export type AdvantagesSectionData = {
    id: number;
    __component: 'sections.advantages';
    pretitle: string;
    title: string;
    description: string;
    items: FeatureItem[];
};