import {
  mapTopbar,
  Topbar,
  TopbarResponse,
} from "@/types/strapi/single/topbar";
import { strapiClient } from "../custom-strapi-client";

export async function fetchTopbar(locale: string): Promise<Topbar | null> {
  const client = strapiClient(locale);
  try {
    const response = (await client.single("topbar").find({
      ...(locale && { locale }),
    })) as unknown as TopbarResponse;
    return mapTopbar(response.data);
  } catch (error) {
    console.error("API Error: Could not fetch topbar data.", error);
    return null;
  }
}
