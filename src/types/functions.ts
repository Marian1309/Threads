import type { ChangeEvent } from 'react';

import type { CreateThreadPayload, UpdateUserPayload, User } from '.';

// Actions

export type UpdateUserFn = (
  userId: string,
  data: UpdateUserPayload,
  path: string
) => Promise<void>;

export type FetchUserFn = (userId: string) => Promise<User | null>;

export type CreateThreadFn = (data: CreateThreadPayload) => Promise<void>;

// Others

export type HandleChangeProfileImage = (
  e: ChangeEvent<HTMLInputElement>,
  fieldChange: (value: string) => void
) => void;
