import { StrapiComponent } from "../strapi";

export interface StrapiButton extends StrapiComponent {
  __component: "elements.button";
  label: string;
  subLabel?: string | null;
  ariaLabel?: string | null;
  style?: string | null;
  url: string;
  isExternal: boolean;
  target: "_blank" | "_self";
}

export interface Button extends StrapiComponent {
  label: string;
  subLabel?: string | null;
  ariaLabel?: string | null;
  style?: string | null;
  href: string;
  isExternal: boolean;
  target: "_blank" | "_self";
}

export function mapButton(button: StrapiButton): Button {
  return {
    ...button,
    href: button.url,
  };
}
