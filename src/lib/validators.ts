import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(3)
});
export type FormSchema = z.infer<typeof formSchema>;
