import { z } from 'zod';

export const userSchema = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  username: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(30, { message: 'Maximum 30 caracters.' }),
  bio: z
    .string()
    .min(3, { message: 'Minimum 3 characters.' })
    .max(30, { message: 'Maximum 30 caracters.' })
});
export type UserSchema = z.infer<typeof userSchema>;

export const threadSchema = z.object({
  thread: z.string().nonempty().min(3, { message: 'Minimum 3 characters.' }),
  accountId: z.string()
});
export type ThreadSchema = z.infer<typeof threadSchema>;
