import type { FC } from 'react';

const RightSidebar: FC = () => {
  return (
    <section
      className="custom-scrollbar sticky right-0 top-0
      z-20 flex w-fit flex-col justify-between gap-12 overflow-auto
      border-l border-l-[#5C5C7B] bg-[#121417] px-10 pb-6 pt-28 max-xl:hidden"
    >
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-[20px] font-normal leading-[140%] text-white">
          Suggested Communities
        </h3>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-[20px] font-normal leading-[140%] text-white">
          Suggested Users
        </h3>
      </div>
    </section>
  );
};

export default RightSidebar;
