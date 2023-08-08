'use client';

import type { FC } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

type Props = {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
};

const UserCard: FC<Props> = ({ id, name, username, imgUrl, personType }) => {
  const router = useRouter();

  const isCommunity = personType === 'Community';

  const handleOnViewClick = () => {
    if (isCommunity) {
      router.push(`/communities/${id}`);
    } else {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <article
      className="flex flex-col justify-between gap-4 max-xs:rounded-xl max-xs:bg-[#101012]
      max-xs:p-4 xs:flex-row xs:items-center"
    >
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="font-normal text-white">{name}</h4>
          <p className="font-semibold text-[#697C89]">@{username}</p>
        </div>
      </div>

      <Button
        className="bg-favorite leading-[1px] hover:bg-slate-500"
        onClick={handleOnViewClick}
      >
        View
      </Button>
    </article>
  );
};

export default UserCard;
