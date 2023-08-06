import { generateReactHelpers } from '@uploadthing/react/hooks';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

export { useUploadThing, uploadFiles };
