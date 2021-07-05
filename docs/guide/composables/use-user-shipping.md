# useUserShipping

`useShipping` composable can be used for:
* Loading shipping address for the current cart.
* Saving shipping address for the current cart.

## API
````typescript
interface UseUserShipping<USER_SHIPPING, USER_SHIPPING_ITEM> {
    shipping: ComputedProperty<USER_SHIPPING>;
    addAddress: (params: {
        address: USER_SHIPPING_ITEM;
    }) => Promise<void>;
    deleteAddress: (params: {
        address: USER_SHIPPING_ITEM;
    }) => Promise<void>;
    updateAddress: (params: {
        address: USER_SHIPPING_ITEM;
    }) => Promise<void>;
    load: () => Promise<void>;
    setDefaultAddress: (params: {
        address: USER_SHIPPING_ITEM;
    }) => Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseUserShippingErrors>;
}
````

* `load` - function for fetching shipping address. When invoked, it requests data from the API and populates shipping property. This method accepts a single optional params object. 
* `save` - function for saving shipping address. This method accepts a single saveParams object.
* `shipping` - a main data object that contains a shipping address.
* `addAddress` - function for adding a shipping address. This method accepts addressParams object
* `deleteAddress` - function for deleting a shipping address. This method accepts addressParams object
* `updateAddress` - function for updating a shipping address. This method accepts addressParams object
* `loading` -  a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

## Example
```javascript
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
```
