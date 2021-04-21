import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';
import { RevokeCustomerTokenMutation } from '../../types/GraphQL';

export default async ({ client }: Context): Promise<FetchResult<RevokeCustomerTokenMutation>> => client
  .mutate<RevokeCustomerTokenMutation>({
  mutation,
});
