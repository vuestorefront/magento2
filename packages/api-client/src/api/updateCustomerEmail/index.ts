import { FetchResult } from '@apollo/client/core';
import { CustomQuery, UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import updateCustomerEmail from './updateCustomerEmail';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

export default async (
  context: Context,
  input: UpdateCustomerEmailMutationVariables,
  customQuery: CustomQuery = { updateCustomerEmail: 'updateCustomerEmail' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<UpdateCustomerEmailMutation>> => {
  const { updateCustomerEmail: updateCustomerEmailGQL } = context.extendQuery(
    customQuery,
    {
      updateCustomerEmail: {
        query: updateCustomerEmail,
        variables: { ...input },
      },
    },
  );

  return context.client.mutate<UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables>({
    mutation: updateCustomerEmailGQL.query,
    variables: updateCustomerEmailGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};
