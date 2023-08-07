import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import { fetchPosts } from '@/actions/thread';

import ThreadCard from '@/components/cards/thread-card';

const Page = async () => {
  const user = await currentUser();
  const { posts } = await fetchPosts(1, 30);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className="mt-24 text-4xl font-bold">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="text-left text-xl text-[#7878A3]">No threads found.</p>
        ) : (
          posts.map((post) => (
            <ThreadCard
              key={post.id}
              currentUserId={user.id}
              post={{
                id: post.id,
                parentId: post.parentId || '',
                content: post.text,
                author: {
                  id: post.author.id,
                  name: post.author.name,
                  image: post.author.image || ''
                },
                createdAt: post.createdAt,
                comments: post.children,
                community: post.community || null
              }}
            />
          ))
        )}
      </section>
    </>
  );
};

export default Page;
