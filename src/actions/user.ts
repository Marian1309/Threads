'use server';

import { revalidatePath } from 'next/cache';

import prismaClient from '@/lib/prisma-client';
import type { FetchUserFn, UpdateUserFn } from '@/lib/types/functions';

const fetchUser: FetchUserFn = async (userId) => {
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId
      },
      include: {
        threads: true
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

    // TODO rewrite when /profile/edit will be
    if (path === `/profile/${userId}`) {
      revalidatePath(path);
    }
  } catch (err: unknown) {
    throw new Error('Something went wrong while updating a user.');
  }
};

const fetchUserPosts = async (userId: string) => {
  try {
    const userThreads = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        threads: {
          include: {
            children: {
              include: {
                author: {
                  select: {
                    name: true,
                    id: true,
                    image: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return userThreads || [];
  } catch (err: unknown) {
    console.log(err);
    throw new Error('Failed');
  }
};

export { fetchUser, updateUser, fetchUserPosts };
