import { currentUser } from '@clerk/nextjs';

import { fetchUser } from '@/actions/user';

import { PostThread } from '@/components/forms';

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  return (
    <div className="mt-24 max-w-5xl">
      <h1 className="text-[30px] font-bold leading-[140%] text-white">
        Create Thread
      </h1>

      <PostThread userId={userInfo?.id || ''} />
    </div>
  );
};

export default Page;
