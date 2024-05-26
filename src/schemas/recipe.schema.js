import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().min(3),
  category: z.string(),
  image: z.string(),
  country: z.string(),
  video: z
    .string()
    .regex(
      /^(?:https?:\/\/)?(?:(?:www\.)?youtube\.com\/(?:watch\?v=)?|youtu\.be\/)([\w-]{11})(?:\?[^#\s]*)?$/,
      { message: "Please, enter a valid video url" }
    ),
  cookTime: z.number(),
  author: z.string(),

  instructions: z.string().min(10),

  ingredients: z.array(
    z.object({
      name: z.string().min(1),
      measure: z.string().min(1),
    })
  ),
});
