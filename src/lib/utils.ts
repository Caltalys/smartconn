import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiMedia(url: string | undefined): string | null {
  if (url == null) {
    return null;
  }

  // Return data URIs or absolute URLs as is
  if (url.startsWith("data:") || url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_FILE_URL || "http://localhost:1337";
  
  // Ensure clean Base URL (remove trailing slash)
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");
  
  // Ensure clean URL (add leading slash if missing)
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;

  return `${cleanBaseUrl}${cleanUrl}`;
}
