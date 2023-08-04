import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { ICONS } from '@/lib/constants';

const TopBar: FC = () => {
  return (
    <nav className="fixed top-0 z-30 w-full bg-[#121417] px-6 py-3 flex-between">
      <Link href="/" className="flex items-center gap-4">
        <Image src={ICONS.logo} alt="logo" width={28} height={28} />
        <p className="text-[24px] font-bold leading-[140%] text-white max-xs:hidden">
          Threads
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer gap-x-2">
                <Image src={ICONS.logout} alt="logout" width={24} height={24} />
                <UserButton />
              </div>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <SignInButton>Sign In</SignInButton>
          </SignedOut>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'py-2 px-4'
            }
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
