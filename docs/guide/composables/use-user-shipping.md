# useUserShipping

## Features
`useShipping` composable can be used for:
* Loading shipping address for the current cart.
* Saving shipping address for the current cart.

## API
```typescript
export interface UseUserShipping<USER_SHIPPING, USER_SHIPPING_ITEM> {
  shipping: ComputedProperty<USER_SHIPPING>;
  addAddress: (params: {
    address: USER_SHIPPING_ITEM;
    customQuery?: CustomQuery;
  }) => Promise<void>;
  deleteAddress: (params: {
    address: USER_SHIPPING_ITEM;
    customQuery?: CustomQuery;
  }) => Promise<void>;
  updateAddress: (params: {
    address: USER_SHIPPING_ITEM;
    customQuery?: CustomQuery;
  }) => Promise<void>;
  load: () => Promise<void>;
  setDefaultAddress: (params: {
    address: USER_SHIPPING_ITEM;
    customQuery?: CustomQuery;
  }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserShippingErrors>;
}
```

* `shipping` - a main data object that contains a shipping address.
* `addAddress` - function for adding a shipping address. This method accepts addressParams object
* `deleteAddress` - function for deleting a shipping address. This method accepts addressParams object
* `updateAddress` - function for updating a shipping address. This method accepts addressParams object
* `load` - function for fetching shipping address. When invoked, it requests data from the API and populates shipping property. This method accepts a single optional params object.
* `setDefaultAddress` - function for setting default shipping address. This method accepts a single address object.
* `loading` -  a reactive object containing information about loading state of your load or save method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

## Getters
```typescript
interface UserShippingGetters<USER_SHIPPING, USER_SHIPPING_ITEM> {
    getAddresses: (shipping: USER_SHIPPING, criteria?: Record<string, any>) => USER_SHIPPING_ITEM[];
    getDefault: (shipping: USER_SHIPPING) => USER_SHIPPING_ITEM;
    getTotal: (shipping: USER_SHIPPING) => number;
    getPostCode: (address: USER_SHIPPING_ITEM) => string;
    getStreetName: (address: USER_SHIPPING_ITEM) => string;
    getStreetNumber: (address: USER_SHIPPING_ITEM) => string | number;
    getCity: (address: USER_SHIPPING_ITEM) => string;
    getFirstName: (address: USER_SHIPPING_ITEM) => string;
    getLastName: (address: USER_SHIPPING_ITEM) => string;
    getCountry: (address: USER_SHIPPING_ITEM) => string;
    getPhone: (address: USER_SHIPPING_ITEM) => string;
    getEmail: (address: USER_SHIPPING_ITEM) => string;
    getProvince: (address: USER_SHIPPING_ITEM) => string;
    getCompanyName: (address: USER_SHIPPING_ITEM) => string;
    getTaxNumber: (address: USER_SHIPPING_ITEM) => string;
    getId: (address: USER_SHIPPING_ITEM) => string | number;
    getApartmentNumber: (address: USER_SHIPPING_ITEM) => string | number;
    isDefault: (address: USER_SHIPPING_ITEM) => boolean;
}
```

## Example
```javascript
import { useUserShipping } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { shipping, load: loadUserShipping, setDefault } = useUserShipping();

    onSSR(async () => {
      await loadUserShipping();
    });

    return {
      shipping,
      setDefault,
    };
  }
}
```
