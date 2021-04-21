import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  AddConfigurableProductsToCartMutationVariables,
  AddConfigurableProductsToCartMutation,
  AddConfigurableProductsToCartInput,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddConfigurableProductsToCartInput,
): Promise<FetchResult<AddConfigurableProductsToCartMutation>> => client
  .mutate<any, AddConfigurableProductsToCartMutationVariables>({
  mutation,
  variables: { input },
});
