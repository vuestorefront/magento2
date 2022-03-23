/**
 * @deprecated since version 1.0.0
 */
import { Context, Logger } from '@vue-storefront/core';
import { FetchPolicy } from '../../types';
import { useCustomMutationFactory } from '../../factories/useMutationQueryFactory';

export default useCustomMutationFactory({
  mutation: async (context: Context, {
    mutation,
    variables,
    fetchPolicy,
  }: {
    mutation: string,
    variables: any,
    fetchPolicy?: Extract<FetchPolicy, 'network-only' | 'no-cache'>,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('[Magento] Custom API Mutation', { variables });

    const result = await context.$magento.api.customMutation({
      mutation,
      mutationVariables: variables,
      fetchPolicy,
    });

    Logger.debug('[Custom Mutation -> Result]:', result);

    return result;
  },
});
