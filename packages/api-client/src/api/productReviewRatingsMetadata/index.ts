import { ApolloQueryResult, gql } from '@apollo/client/core';
import { CustomQuery, ProductReviewRatingsMetadataQuery } from '@vue-storefront/magento-types';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import productReviewRatingsMetadata from './productReviewRatingsMetadata';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns the active ratings attributes and the values each rating can have.
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { productReviewRatingsMetadata: 'productReviewRatingsMetadata' },
  customHeaders: CustomHeaders = {}
): Promise<ApolloQueryResult<ProductReviewRatingsMetadataQuery>> => {
  const { productReviewRatingsMetadata: productReviewRatingsMetadataGQL } = context.extendQuery(customQuery, {
    productReviewRatingsMetadata: {
      query: productReviewRatingsMetadata,
    },
  });

  return context.client.query<ProductReviewRatingsMetadataQuery>({
    query: gql`
      ${productReviewRatingsMetadataGQL.query}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
