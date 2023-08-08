import Image from 'next/image';
import Link from 'next/link';

import { Button } from '../ui/button';

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  members: {
    image: string;
  }[];
}

function CommunityCard({ id, name, username, imgUrl, bio, members }: Props) {
  return (
    <article className="w-full rounded-lg bg-[#101012] px-4 py-5 sm:w-96">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/communities/${id}`} className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="community_logo"
            fill
            className="rounded-full object-cover"
          />
        </Link>

        <div>
          <Link href={`/communities/${id}`}>
            <h4 className="font-semibold text-white">{name}</h4>
          </Link>
          <p className="font-medium text-[#697C89]">@{username}</p>
        </div>
      </div>

      <p className="text-subtle-medium mt-4 text-[#697C89]">{bio}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/communities/${id}`}>
          <Button
            size="sm"
            className="font-white rounded-lg bg-favorite px-5 py-1.5 font-normal hover:bg-slate-500"
          >
            View
          </Button>
        </Link>

        {members.length > 0 && (
          <div className="flex items-center">
            {members.map((member, index) => (
              <Image
                key={index}
                src={member.image}
                alt={`user_${index}`}
                width={28}
                height={28}
                className={`${
                  index !== 0 && '-ml-2'
                } rounded-full object-cover`}
              />
            ))}
            {members.length > 3 && (
              <p className="ml-1 font-medium text-[#697C89]">
                {members.length}+ Users
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default CommunityCard;
