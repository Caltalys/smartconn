import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiRichText extends StrapiComponent {
  __component: "shared.rich-text";
  body: string; // rich text content (HTML or Markdown)
}

// Mapped Frontend Type
export interface RichTextBlock extends StrapiComponent {
  body: string;
}

export function mapRichTextBlock(block: StrapiRichText): RichTextBlock {
  return {
    ...block,
  };
}
