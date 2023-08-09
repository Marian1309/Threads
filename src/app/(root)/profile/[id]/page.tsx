import type { Metadata } from 'next';
import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';

import { profileTabs } from '@/lib/constants';

import { fetchUser } from '@/actions/user';

import { ProfileHeader, ThreadsTab } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Profile • Threads'
};

const ProfileIdPage = async ({ params }: Props) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo?.id || ''}
        authUserId={user.id}
        name={userInfo?.name || ''}
        username={userInfo?.username || ''}
        imgUrl={userInfo?.image || ''}
        bio={userInfo?.bio || ''}
      />

      <div className="mt-4">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center bg-[#121417] p-0 text-[#EFEFEF] data-[state=active]:bg-[#0e0e12] data-[state=active]:text-[#EFEFEF]">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[50px] flex-1 items-center gap-x-3 bg-[#121417] text-[#EFEFEF] data-[state=active]:bg-[#0e0e12] data-[state=active]:text-[#EFEFEF]"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className="ml-1 rounded-sm bg-[#5C5C7B] px-2 py-1 font-medium text-[#EFEFEF]">
                    {userInfo?.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-white"
            >
              {/* @ts-ignore React Server Component */}
              <ThreadsTab
                currentUserId={user?.id}
                accountId={userInfo?.id || ''}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProfileIdPage;
