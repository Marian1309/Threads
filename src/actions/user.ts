'use server';

import { revalidatePath } from 'next/cache';

import type {
  FetchUserFn,
  FetchUsersFn,
  UpdateUserFn
} from '@/types/functions';

import prismaClient from '@/lib/prisma-client';

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
    throw new Error('Failed');
  }
};

const fetchUsers: FetchUsersFn = async ({
  userId,
  searchString = '',
  sortBy = 'desc',
  pageNumber = 1,
  pageSize = 20
}) => {
  try {
    const skipAmount = (pageNumber - 1) * pageSize;

    const searchTerm = `%${searchString}%`;

    const orderBy =
      sortBy === 'asc' ? { createdAt: 'asc' } : { createdAt: 'desc' };

    const users = await prismaClient.user.findMany({
      where: {
        id: { not: userId }, // Exclude the current user from the results.
        OR: [
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      orderBy,
      skip: skipAmount,
      take: pageSize
    });

    const totalUsersCount = await prismaClient.user.count({
      where: {
        id: { not: userId },
        OR: [
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } }
        ]
      }
    });

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (err: unknown) {
    throw new Error('Failed');
  }
};

const getActivity = async (userId: string) => {
  try {
    const userThreads = await prismaClient.thread.findMany({
      where: {
        authorId: userId
      },
      include: {
        children: true
      }
    });

    const childThreadIds = userThreads.flatMap((userThread) =>
      userThread.children.map((thread) => thread.id)
    );

    const replies = await prismaClient.thread.findMany({
      where: {
        id: {
          in: childThreadIds
        },
        authorId: {
          not: {
            equals: userId
          }
        }
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            id: true
          }
        }
      }
    });

    return replies;
  } catch (error) {
    console.error('Error fetching replies: ', error);
    throw error;
  }
};

export { fetchUser, updateUser, fetchUserPosts, fetchUsers, getActivity };
