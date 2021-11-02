import { ApolloQueryResult } from 'apollo-client';
import { ProductReviewRatingsMetadataQuery } from '../../types/GraphQL';
import productReviewRatingsMetadata from './productReviewRatingsMetadata';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>> => client
  .query<ProductReviewRatingsMetadataQuery>({
  query: productReviewRatingsMetadata,
});
