import { ApolloQueryResult, gql } from '@apollo/client/core';
import { WishlistQuery } from '@vue-storefront/magento-types';

import type { CustomHeaders } from '@vue-storefront/magento-types';
import wishlistItemsCountQuery from './wishlistItemsCount';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (context: Context, customHeaders: CustomHeaders = {}): Promise<ApolloQueryResult<WishlistQuery>> =>
  context.client.query<WishlistQuery>({
    query: gql`
      ${wishlistItemsCountQuery}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
