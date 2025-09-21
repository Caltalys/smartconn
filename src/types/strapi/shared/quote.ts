// Raw Strapi Type
export interface StrapiQuoteBlock {
  __component: "shared.quote";
  id: number;
  title?: string | null;
  body: string;
  author?: string | null;
}

// Mapped Frontend Type
export interface QuoteBlock {
  __component: "shared.quote";
  id: number;
  pretitle: string;
  quote: string;
  author: string | null;
}

export function mapQuoteBlock(block: StrapiQuoteBlock): QuoteBlock {
  return {
    __component: block.__component,
    id: block.id,
    pretitle: block.title ?? "",
    quote: block.body,
    author: block.author ?? null,
  };
}
