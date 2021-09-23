import { FetchResult } from '@apollo/client/core';
import addProductsToCompareList from './addProductsToCompareList';
import {
  AddProductsToCompareListInput,
  AddProductsToCompareListMutation,
  MutationAddProductsToCompareListArgs,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: AddProductsToCompareListInput,
): Promise<FetchResult<AddProductsToCompareListMutation>> => client
  .mutate<AddProductsToCompareListMutation, MutationAddProductsToCompareListArgs>({
  mutation: addProductsToCompareList,
  variables: { input },
});
