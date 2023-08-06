'use server';

import { revalidatePath } from 'next/cache';

import { AxiosError } from 'axios';

import type { FetchUserFn, UpdateUserFn } from '@/types/functions';

import prismaClient from '@/lib/prisma-client';

const fetchUser: FetchUserFn = async (userId) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    });

    return user;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Failed to fetch user: ${err.message}`);
    }
  }
};

const updateUser: UpdateUserFn = async (userId, data) => {
  const { username, name, bio, image, path } = data;

  try {
    await prismaClient.user.update({
      where: {
        id: userId
      },
      data: {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      }
    });

    if (path === `/profile/${userId}`) {
      revalidatePath(path);
    }
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw new Error(`Failed to fetch user: ${err.message}`);
    }
  }
};

export { fetchUser, updateUser };
