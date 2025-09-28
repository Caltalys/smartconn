import { StrapiEntity, StrapiResponse } from "../strapi";

export interface StrapiTopbar extends StrapiEntity {
  message: string | null;
  phoneNumber: string | null;
  email: string | null;
  ctaButtonText: string | null;
  ctaButtonUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  address: string | null;
}

// Mapped for frontend
export interface Topbar extends StrapiEntity {
  message: string | null;
  phoneNumber: string | null;
  email: string | null;
  ctaButtonText: string | null;
  ctaButtonUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  address: string | null;
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type TopbarResponse = StrapiResponse<StrapiTopbar>;

export function mapTopbar(topbar: StrapiTopbar | null): Topbar | null {
  if (!topbar) {
    return null;
  }
  return {
    ...topbar,
  };
}
