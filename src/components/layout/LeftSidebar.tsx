'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';

import { cn } from '@/lib/utils';

import { ICONS, SIDEBAR_LINKS } from '@/constants';

const LeftSidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useAuth();

  return (
    <section
      className="sticky left-0 top-0 z-20
      h-screen w-fit flex-col bg-[#121417]
      pb-5 pt-28 flex-center max-md:hidden"
    >
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {SIDEBAR_LINKS.map((sidebarLink) => {
          const { label, imgURL } = sidebarLink;
          const isActive = sidebarLink.route === pathname;
          if (sidebarLink.route === '/profile') {
            sidebarLink.route = `${sidebarLink.route}/${userId}`;
          }

          return (
            <Link
              href={sidebarLink.route}
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
