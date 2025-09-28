import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiQuote extends StrapiComponent {
  __component: "shared.quote";
  id: number;
  title?: string | null;
  body: string;
  author?: string | null;
}

// Mapped Frontend Type
export interface QuoteBlock extends StrapiComponent {
  title: string;
  quote: string;
  author: string | null;
}

export function mapQuoteBlock(block: StrapiQuote): QuoteBlock {
  return {
    ...block,
    title: block.title ?? "",
    quote: block.body,
    author: block.author ?? null,
  };
}
