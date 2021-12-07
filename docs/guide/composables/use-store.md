# `useStore`

## Features

`useStore` composable is responsible, for interactions with the available stores in Magento. It allows to:
* fetch available stores
* switch to another store

## API
The `useStore` composable implements custom factory `useStoreFactory` located in `packages/composables/src/factories/useStoreFactory.ts`  and returns `UseStore` interface:
```typescript
interface UseStore<STORES, STORE, API extends PlatformApi = any> extends Composable<API> {
  load: () => Promise<void>;
  change: (params: ComposableFunctionArgs<STORE>) => void;
  stores: ComputedRef<STORES>;
  loading: ComputedRef<boolean>;
}

export interface AvailableStores = {
  availableStores? : Maybe<Array<Maybe<StoreConfig>>>
};
```

## Getters

`storeGetter` object contains following methods:

* `getItems` - returns list of available stores.
* `getSelected` - returns if the selected store is equal to the config store.


## Example

```js
import { useStore, storeGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load: loadStores, stores } = useStore();

    onSSR(async () => {
      await loadStores();
    });

    return {
      stores: storesGetters.getItems(stores.value),
      selectedStore: storesGetters.getSelected(stores.value)
    };
  }
}
```
