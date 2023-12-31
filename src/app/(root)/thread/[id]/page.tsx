import { currentUser } from '@clerk/nextjs';

import prismaClient from '@/lib/prisma-client';

import { fetchThreadById } from '@/actions/thread';
import { fetchUser } from '@/actions/user';

import { ThreadCard } from '@/components/cards';
import { Comment } from '@/components/forms';

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

const ThreadIdPage = async ({ params }: Props) => {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  const thread = await fetchThreadById(params.id);

  const community = await prismaClient.community.findFirst({
    where: {
      id: thread?.communityId || ''
    }
  });

  return (
    <section className="relative mt-28">
      <div>
        <ThreadCard
          key={thread?.id}
          currentUserId={user.id}
          post={{
            id: thread?.id || '',
            parentId: thread?.parentId || '',
            content: thread?.text || '',
            author: {
              id: thread?.authorId || '',
              name: thread?.author?.name || '',
              image: thread?.author?.image || ''
            },
            createdAt: thread?.createdAt || '',
            comments:
              thread?.children.map((comment) => ({
                author: { image: comment.author.image || '' }
              })) || [],
            community: community || null
          }}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread?.id || ''}
          currentUserImg={userInfo?.image || ''}
          currentUserId={JSON.stringify(userInfo?.id)}
        />
      </div>

      <div className="mt-10 flex flex-col gap-5 pl-16">
        {thread?.children.map((childrenItem) => {
          const { id, parentId, text, authorId, author, createdAt, children } =
            childrenItem;

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
                community: community || null
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ThreadIdPage;
