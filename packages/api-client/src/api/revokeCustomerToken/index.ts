import { FetchResult } from '@apollo/client';
import revokeCustomerToken from './revokeCustomerToken';
import { Context } from '../../types/context';
import { RevokeCustomerTokenMutation } from '../../types/GraphQL';

export default async ({ client }: Context): Promise<FetchResult<RevokeCustomerTokenMutation>> => client
  .mutate<RevokeCustomerTokenMutation>({
  mutation: revokeCustomerToken,
});
