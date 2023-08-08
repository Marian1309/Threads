'use server';

import { revalidatePath } from 'next/cache';

import type { CreateThreadFn } from '@/types/functions';

import prismaClient from '@/lib/prisma-client';

const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
  const skipAmount = (pageNumber - 1) * pageSize;

  const posts = await prismaClient.thread.findMany({
    where: {
      parentId: null
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip: skipAmount,
    take: pageSize,
    include: {
      author: {
        select: {
          name: true,
          image: true
        }
      },
      children: {
        include: {
          author: {
            select: { id: true, name: true, image: true }
          }
        }
      }
    }
  });

  const totalPostsCount = await prismaClient.thread.count({
    where: {
      parentId: null
    }
  });

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
};

const createThread: CreateThreadFn = async ({
  text,
  authorId,
  communityId
}) => {
  try {
    const createdThread = await prismaClient.thread.create({
      data: {
        text,
        authorId,
        communityId: communityId ?? ''
      }
    });

    revalidatePath('/');

    await prismaClient.user.update({
      where: {
        id: authorId
      },
      data: {
        threads: {
          connect: {
            id: createdThread.id
          }
        }
      }
    });
  } catch (err: unknown) {
    console.log(err);
    throw new Error('Something went wrong while creating a thread.');
  }
};

const fetchThreadById = async (threadId: string) => {
  try {
    const thread = await prismaClient.thread.findUnique({
      where: {
        id: threadId
      },
      include: {
        author: { select: { id: true, name: true, image: true } },

        children: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true
              }
            },
            children: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    image: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return thread;
  } catch (err) {
    console.error('Error while fetching thread:', err);
    throw new Error('Unable to fetch thread');
  }
};

const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  try {
    const originalThread = await prismaClient.thread.findFirst({
      where: { id: threadId }
    });

    if (!originalThread) {
      throw new Error('Thread not found');
    }

    const commentThread = await prismaClient.thread.create({
      data: {
        text: commentText,
        authorId: userId,
        parentId: threadId,
        communityId: ''
      }
    });

    await prismaClient.thread.update({
      where: { id: threadId },
      data: {
        children: {
          connect: { id: commentThread.id }
        }
      }
    });

    revalidatePath(path);
  } catch (err: unknown) {
    throw new Error('Unable to add comment');
  }
};

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await prismaClient.thread.findMany({
    where: {
      parentId: threadId
    },
    include: {
      children: true
    }
  });

  const descendants: any[] = [];

  for (const childThread of childThreads) {
    descendants.push(childThread);
    const nestedDescendants = await fetchAllChildThreads(childThread.id);
    descendants.push(...nestedDescendants);
  }

  return descendants;
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    const descendantThreads = await fetchAllChildThreads(id);

    const descendantThreadIds = [
      ...descendantThreads.map((thread) => thread.id)
    ];

    await prismaClient.thread.updateMany({
      where: {
        id: {
          in: descendantThreadIds
        }
      },
      data: {
        parentId: null
      }
    });

    await prismaClient.thread.deleteMany({
      where: {
        id: {
          in: [...descendantThreadIds, id]
        }
      }
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

export { createThread, fetchPosts, fetchThreadById, addCommentToThread };
