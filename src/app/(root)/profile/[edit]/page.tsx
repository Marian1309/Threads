import { currentUser } from '@clerk/nextjs';

import { fetchUser } from '@/actions/user';

import { AccountProfile } from '@/components/forms';

const ProfileEditPage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  const userData = {
    id: user?.id,
    objectId: userInfo?.id || '',
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    bio: userInfo?.bio || '',
    image: userInfo?.image || user?.imageUrl
  };

  return (
    <main className="mx-auto flex max-w-2xl flex-col justify-start rounded-lg lg:max-w-4xl">
      <h1 className="mt-24 text-[30px] font-bold leading-[140%] text-white">
        Profile
      </h1>
      <p className="mt-3 text-[16px] font-normal leading-[140%] text-[#EFEFEF]">
        Make some changes
      </p>

      <section className="mt-9">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
};

export default ProfileEditPage;
