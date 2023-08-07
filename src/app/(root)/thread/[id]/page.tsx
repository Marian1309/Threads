import { currentUser } from '@clerk/nextjs';

import { fetchThreadById } from '@/actions/thread';
import { fetchUser } from '@/actions/user';

import ThreadCard from '@/components/cards/thread-card';

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

const Page = async ({ params }: Props) => {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative mt-28">
      <div>
        <ThreadCard
          key={thread?.id}
          currentUserId={user.id}
          post={{
            id: thread?.id,
            parentId: thread?.parentId || '',
            content: thread?.text,
            author: {
              id: thread?.author?.id,
              name: thread?.author?.name,
              image: thread?.author?.image || ''
            },
            createdAt: thread?.createdAt,
            comments: thread?.children,
            community: thread?.community || null
          }}
        />
      </div>
    </section>
  );
};

export default Page;
