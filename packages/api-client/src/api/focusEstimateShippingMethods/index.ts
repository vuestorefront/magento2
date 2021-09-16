import { FetchResult } from '@apollo/client/core';
import focusEstimateShippingMethods from './focusEstimateShippingMethods';
import {
  FocusEstimateShippingMethodsInput,
  FocusEstimateShippingMethodsMutation,
  FocusEstimateShippingMethodsMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  input: FocusEstimateShippingMethodsInput,
): Promise<FetchResult<FocusEstimateShippingMethodsMutation>> => client
  .mutate<FocusEstimateShippingMethodsMutation, FocusEstimateShippingMethodsMutationVariables>({
  mutation: focusEstimateShippingMethods,
  variables: { input },
});
