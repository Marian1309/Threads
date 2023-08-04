import type { FC } from 'react';

import type { ToastOptions } from 'react-hot-toast';

type ToastProps = {
  title: string;
  description: string;
};

const ToastIn2Rows: FC<ToastProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col">
      <h1>{title}</h1>
      <p className="text-xs">{description}</p>
    </div>
  );
};

const toastOptions: ToastOptions = {
  style: { background: '#333', color: '#fff' },
  duration: 2500
};

export { ToastIn2Rows, toastOptions };
