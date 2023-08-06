export type User = {
  id: string;
  username: string;
  name: string;
  image: string | null;
  bio: string | null;
  onboarded: boolean;
  createAt: Date;
  updatedAt: Date;
} | null;

export type UpdateUserPayload = {
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};
