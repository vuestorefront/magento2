import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import mergeCarts from './mergeCarts';
import { MergeCartsMutation, MergeCartsMutationVariables } from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  sourceCartId: string,
  destinationCartId: string,
  customQuery: CustomQuery = { mergeCarts: 'mergeCarts' },
): Promise<FetchResult<MergeCartsMutation>> => {
  const { mergeCarts: mergeCartsGQL } = context.extendQuery(
    customQuery,
    {
      mergeCarts: {
        query: mergeCarts,
        variables: {
          sourceCartId,
          destinationCartId,
        },
      },
    },
  );

  return context.client.mutate<MergeCartsMutation, MergeCartsMutationVariables>({
    mutation: mergeCartsGQL.query,
    variables: {
      sourceCartId,
      destinationCartId,
    },
  });
};
