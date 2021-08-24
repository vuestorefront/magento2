import { FetchResult } from '@apollo/client';
import { Logger } from '@vue-storefront/core';
import requestPasswordResetEmail from './requestPasswordResetEmail';
import {
  RequestPasswordResetEmailMutation,
  RequestPasswordResetEmailMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: RequestPasswordResetEmailMutationVariables,
): Promise<FetchResult<RequestPasswordResetEmailMutation>> => {
  try {
    Logger.debug('[VSF: Magento] requestPasswordResetEmail', JSON.stringify(input, null, 2));
    const result = await client
      .mutate<RequestPasswordResetEmailMutation, RequestPasswordResetEmailMutationVariables>({
      mutation: requestPasswordResetEmail,
      variables: input,
    });

    if (!result.data.requestPasswordResetEmail) return await Promise.reject(false);

    return result;
  } catch (error) {
    // For error in data we don't throw 500, because it's not server error
    if (error.graphQLErrors) {
      Logger.debug(error);

      return {
        errors: error.graphQLErrors,
        data: null,
      };
    }
    Logger.error(error);
    throw error.networkError?.result || error;
  }
};
