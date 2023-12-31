'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ICONS } from '@/lib/constants';
import { formatDateString } from '@/lib/utils';

import DeleteThread from '../forms/delete-thread';

type Props = {
  currentUserId: string;
  post: {
    id: string;
    parentId: string | null;
    content: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string | null;
    } | null;
    createdAt: Date | string;
    comments: {
      author: {
        image: string;
      };
    }[];
  };
  isComment?: boolean;
};

const ThreadCard: FC<Props> = ({ currentUserId, post, isComment }) => {
  const { id, author, community, createdAt, comments, parentId } = post;

  const links: { imgUrl: string; alt: string }[] = [
    { imgUrl: ICONS.heartGray, alt: 'heart' },
    { imgUrl: ICONS.reply, alt: 'reply' },
    { imgUrl: ICONS.repost, alt: 'repost' },
    { imgUrl: ICONS.share, alt: 'share' }
  ];

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
                {links.map((link) => {
                  if (link.alt === 'reply') {
                    return (
                      <Link href={`/thread/${id}`}>
                        <Image
                          src="/icons/reply.svg"
                          alt="heart"
                          width={24}
                          height={24}
                          className="cursor-pointer object-contain"
                        />
                      </Link>
                    );
                  }

                  return (
                    <Image
                      src={link.imgUrl}
                      alt={link.alt}
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  );
                })}
              </div>

              {isComment && comments && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="text-gray-1 mt-1 font-medium">
                    {comments.length} repl{comments.length > 1 ? 'ies' : 'y'}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments && comments?.length > 0 && (
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

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="font-medium text-[#697C89]">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image || ''}
            alt={community.name}
            width={20}
            height={20}
            className="ml-2 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
