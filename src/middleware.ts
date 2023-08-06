import { authMiddleware } from '@clerk/nextjs';

const middleware = authMiddleware({
  publicRoutes: ['/api/webhook/clerk'],
  ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};

export default middleware;
