import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { ProductReviewRatingsMetadataQuery } from '../../types/GraphQL';
import productReviewRatingsMetadata from './productReviewRatingsMetadata';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns additional product reviews data
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { productReviewRatingsMetadata: 'productReviewRatingsMetadata' },
  customHeaders: Record<string, string> = {},
): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>> => {
  const { productReviewRatingsMetadata: productReviewRatingsMetadataGQL } = context.extendQuery(
    customQuery,
    {
      productReviewRatingsMetadata: {
        query: productReviewRatingsMetadata,
      },
    },
  );

  return context.client.query<ProductReviewRatingsMetadataQuery>({
    query: productReviewRatingsMetadataGQL.query,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
