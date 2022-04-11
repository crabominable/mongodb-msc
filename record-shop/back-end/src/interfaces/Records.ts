import { z } from 'zod';

const recordsZodSchema = z.object({
  title: z.string(),
  artist: z.string(),
  format: z.string(),
  yearPublished: z.number(),
  new: z.boolean() });

type Records = z.infer<typeof recordsZodSchema>;

export default Records;
export { recordsZodSchema };