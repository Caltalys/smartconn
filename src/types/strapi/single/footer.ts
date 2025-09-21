import { Link, mapLink, StrapiLink } from "../elements/link";
import { StrapiResponse } from "../strapi";

export interface StrapiFooter {
  id: number;
  description: string | null;
  address: string | null;
  phoneNumber: string | null;
  email: string | null;
  copyright: string | null;
  quickLinks: StrapiLink[];
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  quickLinksTitle: string | null;
  contactInfoTitle: string | null;
}

// Mapped for frontend
export interface Footer {
  description: string | null;
  address: string | null;
  phoneNumber: string | null;
  email: string | null;
  copyright: string | null;
  quickLinks: Link[]; // ← mapped from StrapiLink
  social: {
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
  };
  quickLinksTitle: string | null;
  contactInfoTitle: string | null;
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu Footer đơn lẻ. */
export type FooterResponse = StrapiResponse<StrapiFooter>;

export function mapFooter(footer: StrapiFooter): Footer {
  return {
    description: footer.description ?? null,
    address: footer.address ?? null,
    phoneNumber: footer.phoneNumber ?? null,
    email: footer.email ?? null,
    copyright: footer.copyright ?? null,
    quickLinks: (footer.quickLinks ?? []).map(mapLink),
    social: {
      facebook: footer.facebookUrl ?? null,
      twitter: footer.twitterUrl ?? null,
      instagram: footer.instagramUrl ?? null,
      linkedin: footer.linkedinUrl ?? null,
    },
    quickLinksTitle: footer.quickLinksTitle ?? null,
    contactInfoTitle: footer.contactInfoTitle ?? null,
  };
}
