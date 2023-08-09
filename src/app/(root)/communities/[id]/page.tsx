import type { Metadata } from 'next';
import Image from 'next/image';

import { currentUser } from '@clerk/nextjs';

import { communityTabs } from '@/lib/constants';

import { fetchCommunityDetails } from '@/actions/community';

import { UserCard } from '@/components/cards';
import { ProfileHeader, ThreadsTab } from '@/components/common';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params
}: Props): Promise<Metadata> => {
  const communityDetails = await fetchCommunityDetails(params.id);

  return {
    title: `${communityDetails?.name} Community • Threads`
  };
};

const CommunityIdPage = async ({ params }: Props) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails?.createdBy.id || ''}
        authUserId={user.id}
        name={communityDetails?.name || ''}
        username={communityDetails?.username || ''}
        imgUrl={communityDetails?.image || ''}
        bio={communityDetails?.bio || ''}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList
            className="flex min-h-[50px] flex-1 items-center bg-[#121417]
            p-0 text-[#EFEFEF] data-[state=active]:bg-[#0e0e12] data-[state=active]:text-[#EFEFEF]"
          >
            {communityTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[50px] flex-1 items-center gap-x-3 bg-[#121417] text-[#EFEFEF]
                data-[state=active]:bg-[#0e0e12] data-[state=active]:text-[#EFEFEF]"
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
                  <p className="ml-1 rounded-sm bg-[#1F1F22] px-2 py-1 font-medium text-[#EFEFEF]">
                    {communityDetails?.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-white">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails?.id || ''}
              accountType="Community"
            />
          </TabsContent>

          <TabsContent value="members" className="mt-9 w-full text-white">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="requests" className="w-full text-white">
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails?.id || ''}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CommunityIdPage;
