'use server';

import { revalidatePath } from 'next/cache';

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
    throw new Error('Something went wrong while fetching a user.');
  }
};

const updateUser: UpdateUserFn = async (userId, data, path) => {
  const { username, name, bio, image } = data;

  try {
    const userExists = await prismaClient.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!userExists) {
      await prismaClient.user.create({
        data: {
          id: userId,
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true
        }
      });

      return;
    }
  } catch (err: unknown) {
    throw new Error('Something went wrong while creating a user.');
  }

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
    throw new Error('Something went wrong while updating a user.');
  }
};

export { fetchUser, updateUser };
