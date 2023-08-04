import type { FC } from 'react';

const RightSidebar: FC = () => {
  return (
    <section
      className="custom-scrollbar border-l-dark-4 sticky right-0
      top-0 z-20 flex w-fit flex-col justify-between gap-12
      overflow-auto border-l bg-black px-10 pb-6 pt-28 max-xl:hidden"
    >
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-white">Suggested Communities</h3>
      </div>
    </section>
  );
};

export default RightSidebar;
