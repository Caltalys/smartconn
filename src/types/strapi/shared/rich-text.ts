// Raw Strapi Type
export interface StrapiRichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string; // rich text content (HTML or Markdown)
}

// Mapped Frontend Type
export interface RichTextBlock {
  __component: "shared.rich-text";
  id: number;
  body: string;
}

export function mapRichTextBlock(block: StrapiRichTextBlock): RichTextBlock {
  return {
    __component: block.__component,
    id: block.id,
    body: block.body,
  };
}
