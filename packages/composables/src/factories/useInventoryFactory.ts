import { computed } from '@vue/composition-api';
import {
  configureFactoryParams,
  Context,
  FactoryParams,
  Logger,
  sharedRef,
} from '@absolute-web/vsf-core';
import { UseInventory, UseInventoryErrors } from '../types/composables';

export interface UseInventoryFactory<INVENTORY_ITEM> extends FactoryParams {
  search: (context: Context, params: any) => Promise<INVENTORY_ITEM[]>;
}

export function useInventoryFactory<INVENTORY_ITEM>(
  factoryParams: UseInventoryFactory<INVENTORY_ITEM>,
) {
  return function useInventory(id: string = ''): UseInventory<INVENTORY_ITEM> {
    const ssrKey = id || 'useInventory';
    // @ts-ignore
    const result = sharedRef<INVENTORY_ITEM[]>([], `${ssrKey}-result`);
    const loading = sharedRef(false, `${ssrKey}-loading`);
    const error = sharedRef<UseInventoryErrors>({
      search: null,
    }, `${ssrKey}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    // eslint-disable-next-line consistent-return
    const search = async (params: any): Promise<INVENTORY_ITEM[]> => {
      Logger.debug(`useInventory/${ssrKey}/search`);

      try {
        loading.value = true;

        const data = await _factoryParams.search(params);

        result.value = data;

        error.value.search = null;

        return data;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useInventory/${ssrKey}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  };
}
