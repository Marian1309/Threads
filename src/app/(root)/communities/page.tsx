import { currentUser } from '@clerk/nextjs';

import { fetchCommunities } from '@/actions/community';

import CommunityCard from '@/components/cards/community';
import { Pagination } from '@/components/common';
import Searchbar from '@/components/common/SearchBar';

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const CommunitiesPage = async ({ searchParams }: Props) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const { communities, isNext } = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25
  });

  return (
    <section className="mt-24">
      <h1 className="text-4xl font-bold text-white">Communities</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" placeholder="Search communities" />
      </div>

      <div className="mt-9 flex flex-wrap gap-4">
        {communities.length === 0 ? (
          <p className="text-center font-normal text-[#101012]">No Result</p>
        ) : (
          <>
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image || ''}
                bio={community.bio || ''}
                members={[]}
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default CommunitiesPage;
