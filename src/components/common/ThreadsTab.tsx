import { redirect } from 'next/navigation';

import { fetchCommunityPosts } from '@/actions/community';
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
  let result: Result;

  if (accountType === 'Community') {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  console.log(result);

  if (!result) {
    redirect('/');
  }

  return (
    <section className="mt-4 flex flex-col gap-4">
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
            community: {
              id: thread.id || '',
              name: community?.name || '',
              image: community?.image || ''
            }
          }}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
