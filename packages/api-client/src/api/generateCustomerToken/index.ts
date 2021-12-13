import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@absolute-web/vsf-core';
import generateCustomerToken from './generateCustomerToken';
import {
  GenerateCustomerTokenMutation,
  GenerateCustomerTokenMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  context: Context,
  params: {
    email: string;
    password: string;
  },
  customQuery: CustomQuery = { generateCustomerToken: 'generateCustomerToken' },
): Promise<FetchResult<GenerateCustomerTokenMutation>> => {
  const { generateCustomerToken: generateCustomerTokenGQL } = context.extendQuery(
    customQuery,
    {
      generateCustomerToken: {
        query: generateCustomerToken,
        variables: {
          email: params.email,
          password: params.password,
        },
      },
    },
  );

  return await context.client
    .mutate<GenerateCustomerTokenMutation, GenerateCustomerTokenMutationVariables>({
    mutation: generateCustomerTokenGQL.query,
    variables: generateCustomerTokenGQL.variables,
  });
};
