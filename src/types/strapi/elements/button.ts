export interface StrapiButton {
  __component: "elements.button";
  id: number;
  label: string;
  subLabel?: string | null;
  ariaLabel?: string | null;
  style?: string | null;
  url: string;
  isExternal: boolean;
  target: "_blank" | "_self";
}

export interface Button {
  id: number;
  label: string;
  subLabel: string | null;
  ariaLabel: string | null;
  style: string | null;
  href: string;
  isExternal: boolean;
  target: "_blank" | "_self";
}

export function mapButton(button: StrapiButton): Button {
  return {
    id: button.id,
    label: button.label,
    subLabel: button.subLabel ?? null,
    ariaLabel: button.ariaLabel ?? null,
    style: button.style ?? null,
    href: button.url,
    isExternal: button.isExternal,
    target: button.target,
  };
}
