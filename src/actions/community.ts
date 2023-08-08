'use server';

import prismaClient from '@/lib/prisma-client';

const createCommunity = async (
  id: string,
  name: string,
  username: string,
  image: string,
  bio: string,
  createdById: string
) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: createdById
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const createdCommunity = await prismaClient.community.create({
      data: {
        id,
        name,
        username,
        image,
        bio,
        createdBy: {
          connect: { id: user.id }
        }
      }
    });

    await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        communities: {
          connect: {
            id: createdCommunity.id
          }
        }
      }
    });

    return createdCommunity;
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

export async function fetchCommunityDetails(id: string) {
  try {
    const communityDetails = await prismaClient.community.findUnique({
      where: {
        id
      },
      include: {
        createdBy: true,
        members: {
          select: {
            name: true,
            username: true,
            image: true,
            id: true
          }
        }
      }
    });

    return communityDetails;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching community details:', error);
    throw error;
  }
}

export async function fetchCommunityPosts(id: string) {
  try {
    const communityPosts = await prismaClient.community.findUnique({
      where: {
        id
      },
      include: {
        threads: {
          include: {
            author: {
              select: {
                name: true,
                image: true,
                id: true
              }
            },
            children: {
              include: {
                author: {
                  select: {
                    image: true,
                    id: true
                  }
                }
              }
            }
          }
        }
      }
    });

    return communityPosts;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching community posts:', error);
    throw error;
  }
}

export async function fetchCommunities({
  searchString = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc'
}: {
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: 'asc' | 'desc';
}) {
  try {
    // Calculate the number of communities to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive search term for the provided search string.
    const searchTerm = `%${searchString}%`;

    const orderBy =
      sortBy === 'asc' ? { createdAt: 'asc' } : { createdAt: 'desc' };

    // Create a Prisma query to filter and fetch communities.
    const communities = await prismaClient.community.findMany({
      where: {
        OR: [
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      orderBy,
      skip: skipAmount,
      take: pageSize,
      include: {
        members: true
      }
    });

    // Count the total number of communities that match the search criteria (without pagination).
    const totalCommunitiesCount = await prismaClient.community.count({
      where: {
        OR: [
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { name: { contains: searchTerm, mode: 'insensitive' } }
        ]
      }
    });

    // Check if there are more communities beyond the current page.
    const isNext = totalCommunitiesCount > skipAmount + communities.length;

    return { communities, isNext };
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
}

export async function addMemberToCommunity(
  communityId: string,
  memberId: string
) {
  try {
    // Find the community by its unique id
    const community = await prismaClient.community.findUnique({
      where: {
        id: communityId
      },
      include: {
        members: true
      }
    });

    if (!community) {
      throw new Error('Community not found');
    }

    // Find the user by their unique id
    const user = await prismaClient.user.findUnique({
      where: {
        id: memberId
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user is already a member of the community
    if (community.members.includes(user.id)) {
      throw new Error('User is already a member of the community');
    }

    // Update the community to include the user as a member
    const updatedCommunity = await prismaClient.community.update({
      where: {
        id: community.id
      },
      data: {
        members: {
          connect: {
            id: user.id
          }
        }
      }
    });

    // Update the user to include the community as a joined community
    await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        communities: {
          connect: {
            id: community.id
          }
        }
      }
    });

    return updatedCommunity;
  } catch (error) {
    // Handle any errors
    console.error('Error adding member to community:', error);
    throw error;
  }
}

export async function updateCommunityInfo(userId: string, communityId: string) {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const community = await prismaClient.community.findUnique({
      where: {
        id: communityId
      }
    });

    if (!community) {
      throw new Error('Community not found');
    }

    // Update the community to remove the user as a member
    const updatedCommunity = await prismaClient.community.update({
      where: {
        id: community.id
      },
      data: {
        members: {
          disconnect: {
            id: user.id
          }
        }
      }
    });

    // Update the user to remove the community from their joined communities
    await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        communities: {
          disconnect: {
            id: community.id
          }
        }
      }
    });

    return { success: true };
  } catch (error) {
    // Handle any errors
    console.error('Error removing user from community:', error);
    throw error;
  }
}

export async function deleteCommunity(communityId: string) {
  try {
    // Find the community by its ID and delete it
    const deletedCommunity = await prismaClient.community.delete({
      where: {
        id: communityId
      }
    });

    if (!deletedCommunity) {
      throw new Error('Community not found');
    }

    // Delete all threads associated with the community
    await prismaClient.thread.deleteMany({
      where: {
        communityId
      }
    });

    // Find all users who are part of the community
    const communityUsers = await prismaClient.user.findMany({
      where: {
        communities: {
          some: {
            id: communityId
          }
        }
      }
    });

    // Remove the community from the 'communities' array for each user
    const updateUserPromises = communityUsers.map(async (user) => {
      await prismaClient.user.update({
        where: {
          id: user.id
        },
        data: {
          communities: {
            disconnect: {
              id: communityId
            }
          }
        }
      });
    });

    await Promise.all(updateUserPromises);

    return deletedCommunity;
  } catch (error) {
    console.error('Error deleting community: ', error);
    throw error;
  }
}

export { createCommunity };
