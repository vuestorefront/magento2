import { ApolloQueryResult } from '@apollo/client/core';
import { CustomQuery, CartQuery, CartQueryVariables } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import query from './cartTotalQty';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  cartId: string,
  customQuery: CustomQuery = { cartTotalQty: 'cartTotalQty' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<CartQuery>> => {
  const { cartTotalQty } = context.extendQuery(
    customQuery,
    {
      cartTotalQty: {
        query,
        variables: { cartId: cartId ?? '' },
      },
    },
  );
  return context.client.query<CartQuery, CartQueryVariables>({
    query: cartTotalQty.query,
    variables: cartTotalQty.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
