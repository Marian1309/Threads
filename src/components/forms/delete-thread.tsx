'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { ICONS } from '@/lib/constants';

import { deleteThread } from '@/actions/thread';

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === '/') {
    return null;
  }

  const handlePostDeleting = async () => {
    await deleteThread(JSON.parse(threadId), pathname);

    if (!parentId || !isComment) {
      router.push('/');
    }
  };

  return (
    <Image
      src={ICONS.delete}
      alt="delete"
      width={18}
      height={18}
      className="cursor-pointer object-contain hover:animate-spin"
      onClick={handlePostDeleting}
    />
  );
}

export default DeleteThread;
