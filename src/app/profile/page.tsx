import { currentUser } from '@clerk/nextjs';

import { AccountProfile } from '@/components/blocks';

const Page = async () => {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start rounded-lg px-10">
      <h1 className="text-[30px] font-bold leading-[140%] text-white">
        Onboarding
      </h1>
      <p className="mt-3 text-[16px] font-normal leading-[140%] text-[#EFEFEF]">
        Complete your profile now to use Threads
      </p>

      <section className="mt-9 bg-[#121417] p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default Page;
