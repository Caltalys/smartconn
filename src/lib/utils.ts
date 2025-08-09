import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiMedia(url: string | undefined): string | null {
  if (url === undefined || url === null) {
    return null;
  }
  if (url.startsWith("http")) {
    return url;
  }
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL?.replace('/api', '') || "http://localhost:1337";
  return `${baseUrl}${url}`;
}
