import { StrapiComponent } from "../strapi";

// Raw Strapi Type
export interface StrapiLink extends StrapiComponent {
  __component: "elements.link";
  url: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  text: string;
  isExternal: boolean;
}

// Mapped Frontend Type
export interface Link extends StrapiComponent {
  href: string;
  target: "_blank" | "_self" | "_parent" | "_top";
  label: string;
  isExternal: boolean;
}

export function mapLink(strapiLink: StrapiLink): Link {
  return {
    ...strapiLink,
    href: strapiLink.url,
    label: strapiLink.text,
  };
}
