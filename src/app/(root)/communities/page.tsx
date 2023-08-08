import { currentUser } from '@clerk/nextjs';

import { fetchCommunities } from '@/actions/community';
import { fetchUser } from '@/actions/user';

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
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25
  });

  console.log(result);

  return (
    <>
      <h1 className="head-text">Communities</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" />
      </div>

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
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
      </section>

      <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
};

export default CommunitiesPage;
