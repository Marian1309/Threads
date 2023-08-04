import type { NextRequest } from 'next/server';

import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import { resolvers, typeDefs } from '@/lib/graphql';

const server = new ApolloServer({
  resolvers,
  typeDefs
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

const GET = (request: NextRequest) => handler(request);

const POST = (request: NextRequest) => handler(request);

export { GET, POST };
