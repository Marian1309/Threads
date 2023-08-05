import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (date: Date, format: string) => {
  return dayjs(date).format(format);
};

export const copyToClipboard = (text: string, whatCopied?: string) => {
  navigator.clipboard.writeText(text);

  if (whatCopied) {
    toast.success(`${whatCopied} copied to the clipboard.`);
  }
};

export const isBase64Image = (imageData: string) => {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
};

export const formatDateString = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });

  return `${time} - ${formattedDate}`;
};
