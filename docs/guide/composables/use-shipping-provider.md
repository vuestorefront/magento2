# useShippingProvider
`useShippingProvider` composable can be used for:
* Loading shipping methods for the current cart.
* Selecting shipping method for the current cart.

> WIP

## API
```typescript
interface UseShippingProvider<STATE, SHIPPING_METHOD> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<STATE>;
  setState(state: STATE): void;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save(params: { shippingMethod: SHIPPING_METHOD, customQuery?: CustomQuery }): Promise<void>;
}
```
* `load` - function for fetching shipping method. When invoked, it requests data from the API and populates the response key inside the state property. This method accepts a single optional params object.
* `save` - function for selecting shipping method. This method accepts a single saveParams object.
* `state` - function for selecting shipping method. This method accepts a single saveParams object.
* `loading` - a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

## Example
````javascript
import { useShippingProvider } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  setup () {
    const { load, state } = useShippingProvider();

    onSSR(async () => {
      await load();
    });

    return {
      selectedShippingMethod: computed(() => state.value && state.value.response)
    };
  }
}
````
