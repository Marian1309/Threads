'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SIDEBAR_LINKS } from '@/lib/constants';
import { cn, handleWidth } from '@/lib/utils';

const BottomBar: FC = () => {
  const [width, setWidth] = useState<number>(1920);
  const pathname = usePathname();

  useEffect(() => {
    setWidth(handleWidth());
  }, []);

  window.addEventListener('resize', () => setWidth(handleWidth()));

  return (
    <div className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-around">
        {SIDEBAR_LINKS.map((sidebarLink) => {
          const { route, label, imgURL } = sidebarLink;
          const isActive = route === pathname;

          return (
            <Link
              href={route}
              key={label}
              className={cn(
                'relative flex-col gap-2 rounded-lg p-2 px-4 transition-colors flex-center sm:py-2.5',
                isActive && 'bg-[#641ae6]',
                !isActive && 'hover:bg-[#877EFF]'
              )}
            >
              <Image
                src={imgURL}
                alt={label}
                width={width < 550 ? 18 : 24}
                height={width < 550 ? 18 : 24}
                className="object-contain"
              />

              <p className="text-[12px] font-medium leading-[16px] text-white">
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
