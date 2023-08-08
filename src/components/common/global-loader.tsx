'use client';

import type { FC } from 'react';

import { BounceLoader } from 'react-spinners';

import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const GlobalLoader: FC<Props> = ({ className }) => {
  return (
    <div className={cn('h-[100svh] flex-center', className)}>
      <BounceLoader color="#641ae6" size={40} loading />
    </div>
  );
};

export default GlobalLoader;
