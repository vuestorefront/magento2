import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
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
  mutation,
  variables: { input },
});
