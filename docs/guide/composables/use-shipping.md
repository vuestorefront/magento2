# useShipping
`useShipping` composable can be used for:
* Loading shipping address for the current cart.
* Saving shipping address for the current cart.

> WIP

## API
```typescript
interface UseShipping<SHIPPING, SHIPPING_PARAMS> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  shipping: ComputedProperty<SHIPPING>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save: (params: { params: SHIPPING_PARAMS; shippingDetails: SHIPPING; customQuery?: CustomQuery }) => Promise<void>;
}
```
* `load` - function for fetching shipping address. When invoked, it requests data from the API and populates shipping property. This method accepts a single optional params object.
* `save` - function for saving shipping address. This method accepts a single saveParams object.
* `shipping` - a main data object that contains a shipping address.
* `loading` - a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

## Example
````javascript
import { useShipping } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load, shipping } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping
    };
  }
}
````
