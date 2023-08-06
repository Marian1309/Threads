import type { FC, ReactNode } from 'react';

const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <section className="px-6 xs:pt-[84px] sm:px-10">
      <div className="w-full max-w-5xl">{children}</div>
    </section>
  );
};

export default ProfileLayout;
