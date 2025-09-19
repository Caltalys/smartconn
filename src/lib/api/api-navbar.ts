import { strapiClient } from "../strapi-client";
import type {
  Navbar,
  NavbarResponse,
  NavbarCollectionResponse,
} from "../../types/strapi/sections/navbar";


/**
 * --------------------------
 *  Mapper functions
 * --------------------------
 */
export function mapNavbar(resp: NavbarResponse): Navbar {
  const { id, name, items } = resp.data;

  return {
    id,
    name,
    items: items || [],
  };
}

/**
 * --------------------------
 *  API functions
 * --------------------------
 */
export async function fetchAllNavbars(locale?: string): Promise<Navbar[]> {
  const client = strapiClient(locale);

  const resp = (await client
    .collection("navbars")
    .find({
      ...(locale && { locale }),
      populate: {
        items: {
          populate: {
            children: {
              populate: { children: true },
            },
          },
        },
      },
    })) as unknown as NavbarCollectionResponse;
  return resp.data.map((doc) => mapNavbar({ data: doc, meta: {} }));
}

// Fetch Navbar theo id
export async function fetchNavbar(
  id: string,
  locale: string
): Promise<Navbar | null> {
  const client = strapiClient(locale);

  const resp = (await client
    .collection("navbars")
    .findOne(id, {
      ...(locale && { locale }),
      populate: {
        items: {
          populate: {
            children: {
              populate: { children: true },
            },
          },
        },
      },
    })) as unknown as NavbarResponse | null;
  return resp ? mapNavbar(resp) : null;
}