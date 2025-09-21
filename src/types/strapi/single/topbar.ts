import { StrapiResponse } from "../strapi";

export interface StrapiTopbar {
  id: number;
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

// Mapped for frontend — giữ nguyên field, xử lý null ở mapper
export type Topbar = StrapiTopbar;

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu đơn lẻ. */
export type TopbarResponse = StrapiResponse<Topbar>;

export function mapTopbar(topbar: StrapiTopbar): Topbar {
  return {
    ...topbar,
    // message: topbar.message ?? null,
    // phoneNumber: topbar.phoneNumber ?? null,
    // email: topbar.email ?? null,
    // ctaButtonText: topbar.ctaButtonText ?? null,
    // ctaButtonUrl: topbar.ctaButtonUrl ?? null,
    // facebookUrl: topbar.facebookUrl ?? null,
    // twitterUrl: topbar.twitterUrl ?? null,
    // instagramUrl: topbar.instagramUrl ?? null,
    // linkedinUrl: topbar.linkedinUrl ?? null,
    // address: topbar.address ?? null,
  };
}
