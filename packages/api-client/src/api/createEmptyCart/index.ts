import { FetchResult } from '@apollo/client';
import { CreateEmptyCartMutation } from '../../types/GraphQL';
import mutation from './mutation.graphql';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<FetchResult<CreateEmptyCartMutation>> => client
  .mutate<CreateEmptyCartMutation>({
  mutation,
});
