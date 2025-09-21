import {
  FeatureItem,
  mapFeatureItem,
  StrapiFeatureItem,
} from "../elements/feature-item";

// Raw Strapi Type
export interface StrapiListItemBlock {
  __component: "shared.list-item";
  id: number;
  title: string;
  heading: string;
  itemJustify: "start" | "end" | "center" | "between" | "around" | "evenly";
  items: StrapiFeatureItem[];
}

// Mapped Frontend Type
export interface ListItemBlock {
  __component: "shared.list-item";
  id: number;
  pretitle: string;
  title: string;
  itemJustify: "start" | "end" | "center" | "between" | "around" | "evenly";
  items: FeatureItem[];
}

export function mapListItemBlock(block: StrapiListItemBlock): ListItemBlock {
  return {
    __component: block.__component,
    id: block.id,
    pretitle: block.title,
    title: block.heading,
    itemJustify: block.itemJustify,
    items: (block.items ?? []).map(mapFeatureItem),
  };
}
