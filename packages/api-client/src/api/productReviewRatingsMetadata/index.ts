import { ApolloQueryResult } from 'apollo-client';
import { ProductReviewRatingsMetadataQuery } from '../../types/GraphQL';
import query from './query.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>> => client
  .query<ProductReviewRatingsMetadataQuery>({
  query,
  fetchPolicy: 'no-cache',
});
