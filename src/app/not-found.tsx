'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    toast.error('Path not Found');
    router.replace('/');
    console.clear();
  }, [router]);

  return null;
};

export default NotFound;
