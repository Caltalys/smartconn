import { Navbar } from "@/types/strapi/collections/navbar";
import { Footer } from "@/types/strapi/single/footer";
import { Topbar } from "@/types/strapi/single/topbar";
import { fetchFooter } from "./api-footer";
import { fetchAllNavbars } from "./api-navbar";
import { fetchTopbar } from "./api-topbar";

export interface GlobalLayoutData {
  topbar: Topbar | null;
  navbar: Navbar | null;
  footer: Footer | null;
}

/**
 * Fetches all the data required for the global layout (header, footer, topbar)
 * in a single, parallel operation. This optimizes data fetching by reducing
 * the number of separate await calls in the component.
 *
 * @param locale The locale to fetch data for.
 * @returns An object containing the data for the layout components.
 */
export async function fetchGlobalLayoutData(
  locale: string
): Promise<GlobalLayoutData> {
  // Use Promise.all to fetch all data in parallel, improving performance.
  const [topbarData, footerData, navbars] = await Promise.all([
    fetchTopbar(locale),
    fetchFooter(locale),
    fetchAllNavbars(locale),
  ]);

  return {
    topbar: topbarData,
    footer: footerData,
    // The API returns an array of navbars, but we typically only use the first one for the main header.
    navbar: navbars?.[0] || null,
  };
}
