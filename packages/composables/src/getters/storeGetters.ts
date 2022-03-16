/**
 * @deprecated since version 1.0.0
 */
import { AvailableStores, StoreConfig } from '@vue-storefront/magento-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(stores: AvailableStores, criteria: any = {}): AvailableStores {
  return stores;
}

function getSelected(config: StoreConfig, store: StoreConfig): boolean {
  return config.store_code === store.store_code;
}

const storeGetters = {
  getItems,
  getSelected,
};

export default storeGetters;
