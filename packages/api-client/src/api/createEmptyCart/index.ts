import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import { CreateEmptyCartMutation } from '../../types/GraphQL';
import createEmptyCart from './createEmptyCart';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  customQuery: CustomQuery = { createEmptyCart: 'createEmptyCart' },
  customHeaders: Record<string, string> = {},
): Promise<FetchResult<CreateEmptyCartMutation>> => {
  const { createEmptyCart: createEmptyCartGQL } = context.extendQuery(
    customQuery,
    {
      createEmptyCart: {
        query: createEmptyCart,
      },
    },
  );

  return context.client.mutate<CreateEmptyCartMutation>({
    mutation: createEmptyCartGQL.query,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
