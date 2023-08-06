import { redirect } from 'next/navigation';

import { currentUser } from '@clerk/nextjs';

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <p className="text-4xl font-bold">Home</p>;
};

export default Page;
