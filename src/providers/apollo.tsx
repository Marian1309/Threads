'use client';

import type { FC, ReactNode } from 'react';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client';

import client from '@/lib/graphql/apollo-client';

const ApolloProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
  );
};

export default ApolloProvider;
