'use client';

import type { FC } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { UpdateUserPayload } from '@/types';
import type { HandleChangeProfileImage } from '@/types/functions';

import { ICONS } from '@/lib/constants';
import { useUploadThing } from '@/lib/uploadthing';
import { isBase64Image } from '@/lib/utils';
import type { UserSchema } from '@/lib/validators';
import { userSchema } from '@/lib/validators';

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
import { Textarea } from '../ui/textarea';

import { updateUser } from '@/actions/user';

type Props = {
  user: {
    id: string;
    objectId: string;
    username: string | null;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
};

const AccountProfile: FC<Props> = ({ user, btnTitle }) => {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing('media');
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      profile_photo: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || ''
    }
  });

  const onSubmit = async (values: UserSchema) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      try {
        const imagesResult = await startUpload(files);

        if (imagesResult && imagesResult[0].fileUrl) {
          values.profile_photo = imagesResult[0].fileUrl;
        }
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          throw new Error(`Failed to upload an Image: ${err.message}`);
        }
      }
    }

    const updateUserPayload: UpdateUserPayload = {
      ...values,
      image: values.profile_photo,
      path: pathname
    };

    try {
      await updateUser(user.id, updateUserPayload);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(`Failed to update a user: ${err.message}`);
      }
    }

    if (pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleChangeProfileImage: HandleChangeProfileImage = (
    e,
    fieldChange
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) {
        return;
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    } else {
      return toast.error('Failed to upload an Image');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-[#1F1F22]">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src={ICONS.profile}
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>

              <FormControl className="flex-1 text-[16px] font-semibold leading-[140%] text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-[#0095F6]"
                  onChange={(e) => handleChangeProfileImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-[16px] font-semibold leading-[140%] text-[#EFEFEF]">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border border-[#1F1F22] bg-[#101012] text-white focus-visible:ring-0
                  focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-[16px] font-semibold leading-[140%] text-[#EFEFEF]">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="border border-[#1F1F22] bg-[#101012] text-white focus-visible:ring-0
                  focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-light-2 text-[16px] font-semibold leading-[140%]">
                Bio
              </FormLabel>

              <FormControl>
                <Textarea
                  rows={6}
                  className="border border-[#1F1F22] bg-[#101012] text-white focus-visible:ring-0
                  focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#877EFF]">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
