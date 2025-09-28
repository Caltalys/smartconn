import { Link, mapLink, StrapiLink } from "../elements/link";
import {
  ContactInfoData,
  SocialLinksData,
  StrapiEntity,
  StrapiResponse,
} from "../strapi";

export interface StrapiFooterEntity
  extends StrapiEntity,
    SocialLinksData,
    ContactInfoData {
  id: number;
  description: string | null;
  copyright: string | null;
  quickLinks: StrapiLink[];
  quickLinksTitle: string | null;
  contactInfoTitle: string | null;
}

// Mapped for frontend
export interface Footer extends StrapiEntity, SocialLinksData, ContactInfoData {
  id: number;
  description: string | null;
  copyright: string | null;
  quickLinks: Link[]; // ← mapped from StrapiLink
  quickLinksTitle: string | null;
  contactInfoTitle: string | null;
}

/** Lớp vỏ (wrapper) của Strapi cho một tài liệu Footer đơn lẻ. */
export type FooterResponse = StrapiResponse<StrapiFooterEntity>;

export function mapFooter(footer: StrapiFooterEntity | null): Footer | null {
  if (!footer) {
    return null;
  }

  return {
    ...footer,
    quickLinks: (footer.quickLinks ?? [])
      .map(mapLink)
      .filter((link): link is Link => link !== null),
  };
}
