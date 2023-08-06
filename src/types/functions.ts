import type { ChangeEvent } from 'react';

import type { UpdateUserPayload, User } from '.';

export type UpdateUserFn = (
  userId: string,
  data: UpdateUserPayload
) => Promise<void>;

export type FetchUserFn = (userId: string) => Promise<User | undefined>;

export type HandleChangeProfileImage = (
  e: ChangeEvent<HTMLInputElement>,
  fieldChange: (value: string) => void
) => void;
