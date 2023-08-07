import type { FC, ReactNode } from 'react';

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="px-4 sm:px-10">
      <div className="w-full max-w-5xl">{children}</div>
    </section>
  );
};

export default ProfileLayout;
