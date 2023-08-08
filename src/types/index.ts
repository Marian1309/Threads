export type User = {
  id: string;
  username: string;
  name: string;
  image: string | null;
  bio: string | null;
  onboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
} | null;

export type UpdateUserPayload = {
  username: string;
  name: string;
  bio: string;
  image: string;
};

export type CreateThreadPayload = {
  text: string;
  authorId: string;
  communityId: string | null;
};

export type FetchUsersPayload = {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: 'desc' | 'asc';
};
