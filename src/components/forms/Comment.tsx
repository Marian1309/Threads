'use client';

import type { FC } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { CommentSchema } from '@/lib/validators';
import { commentSchema } from '@/lib/validators';

import { addCommentToThread } from '@/actions/thread';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Input } from '../ui/input';

type Props = {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
};

const Comment: FC<Props> = ({ threadId, currentUserId, currentUserImg }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: ''
    }
  });

  const onSubmit = async (values: CommentSchema) => {
    try {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );
      form.reset();

      toast.success('Thread has been created.');

      router.refresh();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex items-center gap-4 border-y border-y-[#1F1F22] py-5 max-xs:flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="text-lg text-white outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="rounded-3xl bg-favorite px-8 py-2 text-white max-xs:w-full"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
