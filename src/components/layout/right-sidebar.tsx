import { currentUser } from '@clerk/nextjs';

import { fetchCommunities } from '@/actions/community';
import { fetchUsers } from '@/actions/user';

import { UserCard } from '../cards';

const RightSidebar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const similarMinds = await fetchUsers({
    userId: user.id,
    pageSize: 4
  });

  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section
      className="sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between
      gap-12 overflow-auto bg-[#121417] px-10 pb-6 pt-28 max-xl:hidden"
    >
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-medium text-white">Suggested Communities</h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image || ''}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="font-normal text-[#7878A3]">No communities yet</p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="font-medium text-white">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person?.id}
                  id={person?.id || ''}
                  name={person?.name || ''}
                  username={person?.username || ''}
                  imgUrl={person?.image || ''}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="font-normal text-[#7878A3]">No users yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
