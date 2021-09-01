import {
  Context,
} from '@absolute-web/vsf-core';
import { useCache } from '@absolute-web/vsf-cache';
import { FocusProductInventoryItem } from '@absolute-web/magento-api';
import { UseInventoryFactory, useInventoryFactory } from '../../factories/useInventoryFactory';
import { UseInventory } from '../../types/composables';

const constructFilterObject = (inputFilters: Object) => {
  const filter = {};

  Object.keys(inputFilters).forEach((key) => {
    if (typeof inputFilters[key] === 'string') {
      filter[key] = { in: [inputFilters[key]] };
    } else {
      filter[key] = { in: inputFilters[key] };
    }
  });

  return filter;
};

const factoryParams: UseInventoryFactory<FocusProductInventoryItem> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (context: Context, params = {}): Promise<FocusProductInventoryItem[]> => {
    const { data } = await context.$magento.getApi.focusInventory({ filter: constructFilterObject({ ...params }) });

    if (data?.cacheTags) {
      context.cache.addTagsFromString(data.cacheTags);
    }

    return data.focusInventory.items;
  },
};

const useInventory: (cacheId?: string) => UseInventory<FocusProductInventoryItem> = useInventoryFactory<FocusProductInventoryItem>(factoryParams);

export default useInventory;
