import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import { fetchPosts } from '@/actions/thread';

import ThreadCard from '@/components/cards/thread';

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const { posts } = await fetchPosts(1, 30);

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
    </>
  );
};

export default Page;
