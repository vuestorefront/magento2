import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import updateCustomer from './updateCustomer';
import {
  CustomerUpdateInput,
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  input: CustomerUpdateInput,
  customQuery: CustomQuery = { updateCustomer: 'updateCustomer' },
): Promise<FetchResult<UpdateCustomerMutation>> => {
  const { updateCustomer: updateCustomerGQL } = context.extendQuery(
    customQuery,
    {
      updateCustomer: {
        query: updateCustomer,
        variables: input,
      },
    },
  );

  return context.client.mutate<UpdateCustomerMutation, UpdateCustomerMutationVariables>({
    mutation: updateCustomerGQL.query,
    variables: updateCustomerGQL.variables,
  });
};
