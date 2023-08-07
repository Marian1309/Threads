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
    createdAt: Date;
    comments: {
      author: {
        image: string;
      };
    }[];
  };
  isComment?: boolean;
};

const ThreadCard: FC<Props> = ({ currentUserId, post, isComment }) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-[#121417] p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${post.author.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={post.author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${post.author.id}`} className="w-fit">
              <h4 className="text-base-semibold cursor-pointer text-white">
                {post.author.name}
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

                <Link href={`/thread/${post.id}`}>
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

      {!isComment && post.comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {post.comments.slice(0, 2).map((comment, index) => (
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
            <p className="text-subtle-medium text-gray-1 mt-1">
              {post.comments.length} repl
              {post.comments.length > 1 ? 'ies' : 'y'}
            </p>
          </Link>
        </div>
      )}

      {!isComment && post.community && (
        <Link
          href={`/communities/${post.community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(post.createdAt)}
            {post.community && ` - ${post.community.name} Community`}
          </p>

          <Image
            src={post.community.image}
            alt={post.community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
