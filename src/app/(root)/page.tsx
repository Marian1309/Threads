import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import prismaClient from '@/lib/prisma-client';

import { fetchPosts } from '@/actions/thread';

import ThreadCard from '@/components/cards/thread';
import { Pagination } from '@/components/common';

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const HomePage = async ({ searchParams }: Props) => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      id: user.id
    }
  });

  if (!userExists) {
    await prismaClient.user.create({
      data: {
        id: user.id,
        username: user.username || '',
        name: `${user.firstName} ${user.lastName}`,
        bio: '',
        image: user.imageUrl,
        onboarded: true
      }
    });
  }

  const { posts, isNext } = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <h1 className="mt-24 text-4xl font-bold">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="text-left text-xl text-[#7878A3]">No threads found.</p>
        ) : (
          posts.map((post) => {
            const {
              id,
              parentId,
              text,
              authorId,
              author,
              createdAt,
              children
            } = post;

            return (
              <ThreadCard
                key={id}
                currentUserId={user.id}
                post={{
                  id,
                  parentId: parentId || '',
                  content: text,
                  author: {
                    id: authorId,
                    name: author.name,
                    image: author.image || ''
                  },
                  createdAt,
                  comments: children.map((comment) => ({
                    author: { image: comment.author.image || '' }
                  })),
                  community: null
                }}
              />
            );
          })
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </>
  );
};

export default HomePage;
