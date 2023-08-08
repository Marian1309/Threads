import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

import { fetchUsers } from '@/actions/user';

import UserCard from '@/components/cards/user';
import { Pagination } from '@/components/common';
import Searchbar from '@/components/common/SearchBar';

type Props = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const SearchPage = async ({ searchParams }: Props) => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const { users, isNext } = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25
  });

  return (
    <section>
      <h1 className="mt-24 text-4xl font-bold">Search</h1>

      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {users.length === 0 ? (
          <p className="text-center font-normal text-[#101012]">No users</p>
        ) : (
          users.map((person) => (
            <UserCard
              key={person?.id}
              id={person?.id || ''}
              name={person?.name || ''}
              username={person?.username || ''}
              imgUrl={person?.image || ''}
              personType="User"
            />
          ))
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
      />
    </section>
  );
};

export default SearchPage;
