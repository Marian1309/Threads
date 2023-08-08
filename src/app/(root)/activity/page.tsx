import Image from 'next/image';
import Link from 'next/link';

import { currentUser } from '@clerk/nextjs';
import { ArrowBigRightDash } from 'lucide-react';

import { fetchUser, getActivity } from '@/actions/user';

const ActivityPage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  const activities = await getActivity(userInfo?.id || '');

  return (
    <>
      <h1 className="mt-24 text-4xl font-bold">Activity</h1>

      <section className="mt-5 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <article className="flex items-center gap-2 rounded-md bg-[#121417] px-7 py-4">
                <Image
                  src={activity.author.image || ''}
                  alt="user_logo"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />

                <div className="flex w-full items-center justify-between font-normal text-white">
                  <p className="text-[16px]">
                    <span className="mr-1">{activity.author.name}</span>
                    <span>replied to your thread</span>
                  </p>

                  <Link
                    key={activity.id}
                    href={`/thread/${activity.parentId}`}
                    className="text-white flex-center"
                  >
                    <p className="peer">See commented thread</p>
                    <ArrowBigRightDash
                      size={24}
                      className="trans text-white transition-colors duration-200 peer-hover:text-favorite"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </>
        ) : (
          <p className="font-normal text-[#101012]">No activity yet</p>
        )}
      </section>
    </>
  );
};

export default ActivityPage;
