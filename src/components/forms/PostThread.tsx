'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { ThreadSchema } from '@/lib/validators';
import { threadSchema } from '@/lib/validators';

import { createThread } from '@/actions/thread';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import { Textarea } from '../ui/textarea';

type Props = {
  userId: string;
};

const PostThread: FC<Props> = ({ userId }) => {
  const router = useRouter();
  const form = useForm<ThreadSchema>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: '',
      accountId: userId
    }
  });

  const onSubmit = async (values: ThreadSchema) => {
    try {
      await createThread({
        text: values.thread,
        authorId: userId,
        communityId: null
      });

      form.reset();

      toast.success('Thread has been created.');

      router.push('/');
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
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-[16px] font-semibold leading-[140%] text-[#EFEFEF]">
                Content
              </FormLabel>

              <FormControl
                className="border border-[#1F1F22] bg-[#101012] text-white
                focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              >
                <Textarea rows={12} {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-favorite">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default PostThread;
