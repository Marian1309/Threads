'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { formatDateString } from '@/lib/utils';

type Props = {
  currentUserId: string;
  post: {
    id: string;
    parentId: string;
    content: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: Date | string;
    comments:
      | {
          author: {
            image: string;
          };
        }[]
      | undefined;
  };
  isComment?: boolean;
};

const ThreadCard: FC<Props> = ({ currentUserId, post, isComment }) => {
  const { id, parentId, content, author, community, createdAt, comments } =
    post;

  return (
    <article className="flex w-full flex-col rounded-xl bg-[#121417] p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer font-semibold text-white">
                {author.name}
              </h4>
            </Link>

            <h2 className="text-[#EFEFEF]">{post.content}</h2>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/icons/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    src="/icons/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <Image
                  src="/icons/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />

                <Image
                  src="/icons/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isComment && comments?.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments?.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 pl-1 text-slate-500">
              {comments?.length} repl
              {comments?.length > 1 ? 'ies' : 'y'}
            </p>
          </Link>
        </div>
      )}

      {/* {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )} */}
    </article>
  );
};

export default ThreadCard;
