import { FetchResult } from '@apollo/client';
import placeOrder from './placeOrder';
import {
  PlaceOrderInput,
  PlaceOrderMutation,
  PlaceOrderMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: PlaceOrderInput,
): Promise<FetchResult<PlaceOrderMutation>> => client
  .mutate<PlaceOrderMutation, PlaceOrderMutationVariables>({
  mutation: placeOrder,
  variables: { input },
});
