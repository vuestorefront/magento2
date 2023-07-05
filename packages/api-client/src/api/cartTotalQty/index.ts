import { ApolloQueryResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { CartQuery, CartQueryVariables } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import cartTotalQtyQuery from './cartTotalQty';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (context: Context, cartId: string, customHeaders: CustomHeaders = {}): Promise<ApolloQueryResult<CartQuery>> =>
  context.client.query<CartQuery, CartQueryVariables>({
    query: gql`
      ${cartTotalQtyQuery}
    `,
    variables: { cartId },
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
