'use client';

import type { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDEBAR_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const BottomBar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="gap-3 flex-between xs:gap-5">
        {SIDEBAR_LINKS.map((sidebarLink) => {
          const { route, label, imgURL } = sidebarLink;

          const isActive = route === pathname;

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5',
                isActive && 'bg-[#877EFF]'
              )}
            >
              <Image
                src={imgURL}
                alt={label}
                width={24}
                height={24}
                className="object-contain"
              />
              <p className="text-[12px] font-medium leading-[16px] text-white">
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
