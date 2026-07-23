import { z } from "zod";

export const projectBodySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  subtitle: z.string().min(1),
  shortDesc: z.string().min(1),
  longDesc: z.string().min(1),
  coverImage: z.string().min(1),
  aboutImage: z.string().min(1),
});

export const skillBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().optional(),
});

export const messageBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  content: z.string().min(1),
});

export const messagePatchSchema = z.object({
  isRead: z.boolean(),
});

export function slugify(input: string) {
  return input.toLowerCase().replace(/\s+/g, "-");
}
