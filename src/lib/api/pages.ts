import { strapi } from "@/lib/api/client";
import { z } from "zod";
import { getStrapiClient } from "../api";

const BlogPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
});

export type BlogPage = z.infer<typeof BlogPageSchema>;

export async function getBlogPage(locale: string): Promise<{ data: BlogPage | null }> {
  try {
    const response = await getStrapiClient(locale).single("bai-viet").find();
    console.log(response.data);
    const validatedResponse = BlogPageSchema.parse(response.data);
    return { data: { ...validatedResponse } };
  } catch (error) {
    console.error("Failed to fetch or validate blog page data:", error);
    return { data: null };
  }
}