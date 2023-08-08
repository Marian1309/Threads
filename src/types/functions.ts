import type { ChangeEvent } from 'react';

import type {
  CreateThreadPayload,
  FetchUsersPayload,
  UpdateUserPayload,
  User
} from '.';
import type { Thread } from '@prisma/client';

// Actions

export type UpdateUserFn = (
  userId: string,
  data: UpdateUserPayload,
  path: string
) => Promise<void>;

export type FetchUserFn = (
  userId: string
) => Promise<(User & { threads: Thread[] }) | null>;

export type CreateThreadFn = (data: CreateThreadPayload) => Promise<void>;

export type FetchUsersFn = ({
  userId,
  searchString,
  sortBy,
  pageNumber,
  pageSize
}: FetchUsersPayload) => Promise<{ users: User[]; isNext: boolean }>;

// Others

export type HandleChangeProfileImage = (
  e: ChangeEvent<HTMLInputElement>,
  fieldChange: (value: string) => void
) => void;
