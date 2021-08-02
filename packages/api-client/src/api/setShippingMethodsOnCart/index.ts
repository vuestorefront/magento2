import { FetchResult } from '@apollo/client';
import setShippingMethodsOnCart from './setShippingMethodsOnCart';
import {
  SetShippingMethodsOnCartInput,
  SetShippingMethodsOnCartMutation,
  SetShippingMethodsOnCartMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: SetShippingMethodsOnCartInput,
): Promise<FetchResult<SetShippingMethodsOnCartMutation>> => client
  .mutate<SetShippingMethodsOnCartMutation, SetShippingMethodsOnCartMutationVariables>({
  mutation: setShippingMethodsOnCart,
  variables: { input },
});
