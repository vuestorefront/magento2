import { FetchResult } from '@apollo/client/core';
import deleteCompareList from './deleteCompareList';
import {
  DeleteCompareListMutation,
  MutationDeleteCompareListArgs,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  uid: string,
): Promise<FetchResult<DeleteCompareListMutation>> => client
  .mutate<DeleteCompareListMutation, MutationDeleteCompareListArgs>({
  mutation: deleteCompareList,
  variables: { uid },
});
