import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  AddSimpleProductsToCartInput,
  AddSimpleProductsToCartMutation,
  AddSimpleProductsToCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';
// @TODO : Add Mutation FROM CodeGEN

export default async (
  { client }: Context,
  input: AddSimpleProductsToCartInput,
): Promise<FetchResult<AddSimpleProductsToCartMutation>> => client
  .mutate<AddSimpleProductsToCartMutation, AddSimpleProductsToCartMutationVariables>({
  mutation,
  variables: { input },
});
