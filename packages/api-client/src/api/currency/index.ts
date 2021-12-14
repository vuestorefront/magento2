import { ApolloQueryResult } from 'apollo-client';
import {
  CurrencyQuery,
} from '../../types/GraphQL';
import currency from './currency';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<CurrencyQuery>> => client
  .query<CurrencyQuery>({
    query: currency,
  });
