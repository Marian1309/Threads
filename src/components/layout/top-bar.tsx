'use client';

import { memo } from 'react';
import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { OrganizationSwitcher, SignOutButton, SignedIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { ICONS } from '@/lib/constants';

import { Button } from '../ui/button';

const TopBar: FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-30 min-h-[63px] w-full bg-[#121417] px-6 py-3 flex-between">
      <Link href="/" className="flex items-center gap-4">
        <Image src={ICONS.logo} alt="logo" width={28} height={28} />
        <p className="text-[24px] font-bold leading-[140%] text-white">
          Threads
        </p>
      </Link>

      <div className="flex-center">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'p-2 mr-2'
            }
          }}
        />

        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <Button className="ml-[6px] cursor-pointer bg-favorite font-bold transition-colors hover:bg-slate-700">
              Sign Out
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default memo(TopBar);
