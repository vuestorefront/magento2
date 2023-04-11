import { GraphQLError } from 'graphql';

export type ErrorResponse = {
  graphQLErrors?: GraphQLError[];
  clientErrors?: string[];
  message?: string;
  networkError?: string | null;
};
