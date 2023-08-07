import { redirect } from 'next/navigation';

import { fetchUserPosts } from '@/actions/user';

import ThreadCard from '@/components/cards/thread';

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

type Result = {
  name: string;
  image: string;
  id: string;
  threads: {
    id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string | null;
      id: string;
    };
    createdAt: Date;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
};

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  const result: Result = await fetchUserPosts(accountId);

  if (!result) {
    redirect('/');
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads?.map((thread) => (
        <ThreadCard
          key={thread.id}
          currentUserId={currentUserId}
          post={{
            id: thread.id,
            parentId: thread.parentId || '',
            content: thread.text,
            author:
              accountType === 'User'
                ? {
                    name: result.name,
                    image: result.image || '',
                    id: result.id
                  }
                : {
                    name: thread.author.name,
                    image: thread.author.image || '',
                    id: thread.author.id
                  },

            createdAt: thread.createdAt,
            comments: thread.children,
            community: null
          }}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
