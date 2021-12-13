import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
  CustomerCreateInput,
} from '../../types/GraphQL';
import createCustomer from './createCustomer';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerCreateInput,
  customQuery: CustomQuery = { createCustomer: 'createCustomer' },
): Promise<FetchResult<CreateCustomerMutation>> => {
  const { createCustomer: createCustomerGQL } = context.extendQuery(
    customQuery,
    {
      createCustomer: {
        query: createCustomer,
        variables: { input },
      },
    },
  );

  return await context
    .client
    .mutate<CreateCustomerMutation, CreateCustomerMutationVariables>({
    mutation: createCustomerGQL.query,
    variables: createCustomerGQL.variables,
  });
};
