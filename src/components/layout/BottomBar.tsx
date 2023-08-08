'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDEBAR_LINKS } from '@/lib/constants';
import { cn, handleWidth } from '@/lib/utils';

const BottomBar: FC = () => {
  const [isMounted, setIsMoUnted] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(1920);
  const pathname = usePathname();

  useEffect(() => {
    setIsMoUnted(true);
    setWidth(handleWidth());
  }, []);

  if (!isMounted) {
    return null;
  }

  window.addEventListener('resize', () => setWidth(handleWidth()));

  return (
    <div className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-evenly gap-x-2 sm:gap-x-0">
        {SIDEBAR_LINKS.map((sidebarLink) => {
          const { route, label, imgURL } = sidebarLink;
          const isActive = route === pathname;

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                'relative flex-col gap-2 rounded-lg p-3 py-2 transition-colors flex-center sm:px-4 sm:py-2.5',
                isActive && 'bg-[#641ae6]',
                !isActive && 'hover:bg-[#877EFF]'
              )}
            >
              <Image
                src={imgURL}
                alt={label}
                width={width < 550 ? 16 : 24}
                height={width < 550 ? 16 : 24}
                className="object-contain"
              />

              <p className="text-[9px] font-medium leading-[16px] text-white xs:text-[10px]">
                {label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
