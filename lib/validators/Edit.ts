"use client";

import * as z from "zod";

export const formSchema = z.object({
  book_name: z.string().min(5).max(200),
  available: z.coerce.number().min(0).max(50),
  image: z.string().url(),
});
