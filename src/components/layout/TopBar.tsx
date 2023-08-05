'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { ICONS } from '@/lib/constants';

import { Button } from '../ui/button';

const TopBar: FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 z-30 min-h-[63px] w-full px-6 py-3 flex-between dark:bg-[#121417]">
      <Link href="/" className="flex items-center gap-4">
        <Image src={ICONS.logo} alt="logo" width={28} height={28} />
        <p className="text-[24px] font-bold leading-[140%] text-black dark:text-white max-xs:hidden">
          Threads
        </p>
      </Link>

      <div className="flex-center">
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4'
            }
          }}
        />

        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <Button className="ml-[6px] cursor-pointer">Sign Out</Button>
          </SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button className="font-bold">Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};

export default TopBar;
