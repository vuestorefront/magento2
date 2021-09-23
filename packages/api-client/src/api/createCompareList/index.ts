import { FetchResult } from '@apollo/client/core';
import createCompareList from './createCompareList';
import {
  CreateCompareListInput,
  CreateCompareListMutation,
  MutationCreateCompareListArgs,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: CreateCompareListInput,
): Promise<FetchResult<CreateCompareListMutation>> => client
  .mutate<CreateCompareListMutation, MutationCreateCompareListArgs>({
  mutation: createCompareList,
  variables: { input },
});
