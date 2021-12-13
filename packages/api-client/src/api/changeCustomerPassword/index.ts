import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import changeCustomerPassword from './changeCustomerPassword';
import {
  ChangeCustomerPasswordMutation,
  ChangeCustomerPasswordMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: { currentPassword: string; newPassword: string; },
  customQuery: CustomQuery = { changeCustomerPassword: 'changeCustomerPassword' },
): Promise<FetchResult<ChangeCustomerPasswordMutation>> => {
  const { changeCustomerPassword: changeCustomerPasswordGQL } = context.extendQuery(
    customQuery,
    {
      changeCustomerPassword: {
        query: changeCustomerPassword,
        variables: { ...params },
      },
    },
  );
  return await context.client
    .mutate<ChangeCustomerPasswordMutation, ChangeCustomerPasswordMutationVariables>({
    mutation: changeCustomerPasswordGQL.query,
    variables: changeCustomerPasswordGQL.variables,
  });
};
