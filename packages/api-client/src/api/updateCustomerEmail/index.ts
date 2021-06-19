import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';
import { UpdateCustomerEmailMutation, UpdateCustomerEmailMutationVariables } from '../../types/GraphQL';

export default async ({ client }: Context, input: UpdateCustomerEmailMutationVariables): Promise<FetchResult<UpdateCustomerEmailMutation>> => client
  .mutate<UpdateCustomerEmailMutation,
UpdateCustomerEmailMutationVariables>({
  mutation,
  variables: { ...input },
  fetchPolicy: 'no-cache',
});
