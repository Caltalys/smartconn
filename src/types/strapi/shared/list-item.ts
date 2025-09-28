import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";
import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiListItem extends StrapiComponent {
  __component: "shared.list-item";
  title: string;
  heading: string;
  itemJustify: "start" | "end" | "center" | "between" | "around" | "evenly";
  items: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface ListItemBlock extends StrapiComponent {
  pretitle: string;
  title: string;
  itemJustify: "start" | "end" | "center" | "between" | "around" | "evenly";
  items: FeatureItem[];
}

export function mapListItemBlock(block: StrapiListItem): ListItemBlock {
  return {
    ...block,
    pretitle: block.title,
    title: block.heading,
    items: (block.items ?? []).map(mapFeatureItem),
  };
}
