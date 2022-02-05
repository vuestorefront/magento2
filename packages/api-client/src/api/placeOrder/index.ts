import { FetchResult } from '@apollo/client/core';
import gql from 'graphql-tag';
import { CustomQuery } from '@absolute-web/vsf-core';
import placeOrderQuery from './placeOrder';
import {
  PlaceOrderInput,
  PlaceOrderMutation,
  PlaceOrderMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: PlaceOrderInput,
  customQuery: CustomQuery = { placeOrder: 'placeOrder' },
): Promise<FetchResult<PlaceOrderMutation>> => {
  const { placeOrder } = context.extendQuery(customQuery, {
    placeOrder: {
      query: placeOrderQuery,
      variables: { input },
    },
  });

  return await context.client.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
    mutation: placeOrder.query,
    variables: placeOrder.variables,
  });
};
