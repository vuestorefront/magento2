import { FetchResult } from '@apollo/client';
import gql from 'graphql-tag';
import { CustomQuery } from '@vue-storefront/core';
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
  customQuery?: CustomQuery,
): Promise<FetchResult<PlaceOrderMutation>> => {
  const { placeOrder } = context.extendQuery(
    customQuery, {
      placeOrder: {
        query: placeOrderQuery,
        variables: input,
      },
    },
  );

  try {
    return await context.client.mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
      mutation: gql`${placeOrder.query}`,
      variables: { input },
    });
  } catch (error) {
    throw error.graphQLErrors?.[0].message || error.networkError?.result || error;
  }
};
