/**
 * @deprecated Will be removed in 1.1.0 release
 * @use @vue-storefront/magento-theme/composables/useApi instead
 */
import { Context, Logger } from '@vue-storefront/core';
import {
  useCustomQueryFactory,
} from '../../factories/useCustomQueryFactory';
import { FetchPolicy } from '../../types';

/**
 * @deprecated Will be removed in 1.1.0 release
 * @use @vue-storefront/magento-theme/composables/useApi instead
 */
export default useCustomQueryFactory({
  query: async (context: Context, {
    query,
    variables,
    fetchPolicy,
  }: {
    query: string,
    variables: any,
    fetchPolicy?: FetchPolicy,
    // eslint-disable-next-line consistent-return
  }) => {
    Logger.debug('[Magento] Custom API Query', { variables });

    const result = await context.$magento.api.customQuery({
      query,
      queryVariables: variables,
      fetchPolicy,
    });

    Logger.debug('[Custom Query -> Result]:', result);

    return result;
  },
});
