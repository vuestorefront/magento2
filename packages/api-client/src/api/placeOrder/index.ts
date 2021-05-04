import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
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
  mutation,
  variables: { input },
});
