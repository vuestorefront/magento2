import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import mergeCarts from './mergeCarts';
import { MergeCartsMutation, MergeCartsMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: {
    sourceCartId: string;
    destinationCartId: string;
  },
  customQuery: CustomQuery = { mergeCarts: 'mergeCarts' },
): Promise<FetchResult<MergeCartsMutation>> => {
  const { mergeCarts: mergeCartsGQL } = context.extendQuery(
    customQuery,
    {
      mergeCarts: {
        query: mergeCarts,
        variables: {
          sourceCartId: params.sourceCartId,
          destinationCartId: params.destinationCartId,
        },
      },
    },
  );

  return context.client.mutate<MergeCartsMutation, MergeCartsMutationVariables>({
    mutation: mergeCartsGQL.query,
    variables: mergeCartsGQL.variables,
    errorPolicy: 'all',
  });
};
