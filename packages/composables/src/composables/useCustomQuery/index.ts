import { Context, Logger } from '@absolute-web/vsf-core';
import {
  useCustomQueryFactory,
} from '../../factories/useCustomQueryFactory';
import { FetchPolicy } from '../../types';

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

    const result = await context.$magento.getApi.customQuery({
      query,
      queryVariables: variables,
      fetchPolicy,
    });

    Logger.debug('[Custom Query -> Result]:', result);

    if (result?.data?.cacheTags) {
      context.cache.addTagsFromString(result.data.cacheTags);
    }

    return result;
  },
});
