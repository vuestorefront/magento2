import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/middleware';
import { ProductReviewRatingsMetadataQuery } from '../../types/GraphQL';
import productReviewRatingsMetadata from './productReviewRatingsMetadata';
import { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import getHeaders from '../getHeaders';

/**
 * Returns additional product reviews data
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { productReviewRatingsMetadata: 'productReviewRatingsMetadata' },
  customHeaders: CustomHeaders = {},
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
