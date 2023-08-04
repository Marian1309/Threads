'use client';

import type { FC } from 'react';

import { Toaster } from 'react-hot-toast';

import { toastOptions } from '../lib/hot-toast';

const HotToastProvider: FC = () => {
  return <Toaster toastOptions={toastOptions} />;
};

export default HotToastProvider;
