'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
};

const ProfileHeader: FC<Props> = ({
  accountId,
  authUserId,
  username,
  imgUrl,
  bio,
  name,
  type
}) => {
  return (
    <div className="mt-24 flex w-full flex-col justify-start p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="logo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left font-bold text-white">{name}</h2>
            <p className="text-gray-1 font-medium">@{username}</p>
          </div>
        </div>

        {accountId === authUserId && type !== 'Community' && (
          <Link href="/profile/edit">
            <div className="flex cursor-pointer gap-3 rounded-lg bg-[#101012] px-4 py-2">
              <Image
                src="/icons/edit.svg"
                alt="logout"
                width={16}
                height={16}
              />

              <p className="text-[#EFEFEF] max-sm:hidden">Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className="mt-6 max-w-lg font-normal text-[#EFEFEF]">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-[#101012]" />
    </div>
  );
};

export default ProfileHeader;
