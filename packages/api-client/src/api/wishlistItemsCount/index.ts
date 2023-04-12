import { ApolloQueryResult } from '@apollo/client/core';
import {
  CustomQuery,
  WishlistQuery,
} from '@vsf-enterprise/magento-api-types';

import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import query from './wishlistItemsCount';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  customQuery: CustomQuery = { wishlistItemsCount: 'wishlistItemsCount' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<WishlistQuery>> => {
  const { wishlistItemsCount } = context.extendQuery(customQuery, {
    wishlistItemsCount: {
      query,
    },
  });
  try {
    return await context.client.query<WishlistQuery>({
      query: wishlistItemsCount.query,
      context: {
        headers: getHeaders(context, customHeaders),
      },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
