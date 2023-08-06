'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { SignOutButton, SignedIn } from '@clerk/nextjs';

import { ICONS, SIDEBAR_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const LeftSidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section
      className="custom-scrollbar sticky left-0 top-0 z-20
      w-fit flex-col overflow-y-auto bg-[#121417]
      pb-5 pt-28 flex-center max-md:hidden"
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {SIDEBAR_LINKS.map((sidebarLink) => {
          const { route, label, imgURL } = sidebarLink;
          const isActive = route === pathname;

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                'flex items-center justify-start gap-4 rounded-lg p-4 transition-colors',
                isActive && 'bg-[#641ae6]',
                !isActive && 'hover:bg-[#877EFF]'
              )}
            >
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p className="text-white max-lg:hidden">{label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg transition-colors hover:bg-[#877EFF]">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image src={ICONS.logout} alt="logout" width={24} height={24} />
              <p className="text-white max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
