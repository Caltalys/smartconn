// Raw Strapi Type
export interface StrapiLink {
  __component: "elements.link";
  id: number;
  url: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  text: string;
  isExternal: boolean;
}

// Mapped Frontend Type
export interface Link {
  id: number;
  href: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  label: string;
  isExternal: boolean;
}

export function mapLink(strapiLink: StrapiLink): Link {
  return {
    id: strapiLink.id,
    href: strapiLink.url,
    target: strapiLink.target,
    label: strapiLink.text,
    isExternal: strapiLink.isExternal,
  };
}
