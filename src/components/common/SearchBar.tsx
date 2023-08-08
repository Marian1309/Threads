'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Input } from '../ui/input';

type Props = {
  routeType: string;
};

function Searchbar({ routeType }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=${search}`);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType, router]);

  return (
    <div className="mt-6 flex gap-1 rounded-lg bg-[#101012] px-4 py-2">
      <Image
        src="/icons/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />

      <Input
        id="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`${
          routeType !== '/search' ? 'Search communities' : 'Search creators'
        }`}
        className="border-none bg-[#101012] font-normal text-[#5C5C7B] outline-none
        focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
    </div>
  );
}

export default Searchbar;
