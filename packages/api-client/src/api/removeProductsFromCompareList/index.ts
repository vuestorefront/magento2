import { FetchResult } from '@apollo/client/core';
import removeProductsFromCompareList from './removeProductsFromCompareList';
import {
  MutationRemoveProductsFromCompareListArgs,
  RemoveProductsFromCompareListInput,
  RemoveProductsFromCompareListMutation,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RemoveProductsFromCompareListInput,
): Promise<FetchResult<RemoveProductsFromCompareListMutation>> => client
  .mutate<RemoveProductsFromCompareListMutation, MutationRemoveProductsFromCompareListArgs>({
  mutation: removeProductsFromCompareList,
  variables: { input },
});
