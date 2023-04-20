import { FetchResult } from '@apollo/client/core';
import { CustomQuery, MergeCartsMutation, MergeCartsMutationVariables } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import mergeCarts from './mergeCarts';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  params: {
    sourceCartId: string;
    destinationCartId: string;
  },
  customQuery: CustomQuery = { mergeCarts: 'mergeCarts' },
  customHeaders: CustomHeaders = {},
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
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
