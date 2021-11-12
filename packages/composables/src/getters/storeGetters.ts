import { AgnosticStore, UseStoreGetters } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getItems(stores: any, criteria: any = {}): AgnosticStore[] {
  return [];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSelected(stores: any): AgnosticStore | undefined {
  return null;
}

const storeGetters: UseStoreGetters<any, any> = {
  getItems,
  getSelected,
};

export default storeGetters;
