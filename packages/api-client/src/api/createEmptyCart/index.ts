import { FetchResult } from '@apollo/client';
import { CreateEmptyCartMutation } from '../../types/GraphQL';
import createEmptyCart from './createEmptyCart';
import { Context } from '../../types/context';

export default async ({ client }: Context): Promise<FetchResult<CreateEmptyCartMutation>> => client
  .mutate<CreateEmptyCartMutation>({
  mutation: createEmptyCart,
});
