'use client';

import type { FC } from 'react';

import { BounceLoader } from 'react-spinners';

const GlobalLoader: FC = () => {
  return (
    <div className="h-[100svh] flex-center">
      <BounceLoader color="#22c55e" size={40} loading />
    </div>
  );
};

export default GlobalLoader;
