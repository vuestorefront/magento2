import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import { CreateEmptyCartMutation } from '../../types/GraphQL';
import createEmptyCart from './createEmptyCart';
import { Context } from '../../types/context';

export default async (
  context: Context,
  customQuery: CustomQuery = { createEmptyCart: 'createEmptyCart' },
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
  });
};
