import { FetchResult } from '@apollo/client/core';
import type { CustomHeaders } from '@vue-storefront/magento-types';
import { CreateEmptyCartMutation } from '@vue-storefront/magento-types';
import gql from 'graphql-tag';
import createEmptyCart from './createEmptyCart';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (context: Context, customHeaders: CustomHeaders = {}): Promise<FetchResult<CreateEmptyCartMutation>> =>
  context.client.mutate<CreateEmptyCartMutation>({
    mutation: gql`
      ${createEmptyCart}
    `,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
