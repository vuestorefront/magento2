# useBilling
`useUserBilling` composable can be used to:

* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API

```typescript
interface UseBilling<BILLING, BILLING_PARAMS> {
  error: ComputedProperty<UseBillingErrors>;
  loading: ComputedProperty<boolean>;
  billing: ComputedProperty<BILLING>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save: (params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<void>;
}
```

* `load` - loads the users billing addresses
* `save` - saves new address
* `error` - reactive object containing the error message, if some properties failed for any reason.
* `loading` - reactive object containing information about loading state of `load` and `save`
* `billing` - reactive data object containing response from the backend.

## Getters

```typescript
interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
    getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
    getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
    getTotal: (billing: USER_BILLING) => number;
    getPostCode: (address: USER_BILLING_ITEM) => string;
    getStreetName: (address: USER_BILLING_ITEM) => string;
    getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
    getCity: (address: USER_BILLING_ITEM) => string;
    getFirstName: (address: USER_BILLING_ITEM) => string;
    getLastName: (address: USER_BILLING_ITEM) => string;
    getCountry: (address: USER_BILLING_ITEM) => string;
    getPhone: (address: USER_BILLING_ITEM) => string;
    getEmail: (address: USER_BILLING_ITEM) => string;
    getProvince: (address: USER_BILLING_ITEM) => string;
    getCompanyName: (address: USER_BILLING_ITEM) => string;
    getTaxNumber: (address: USER_BILLING_ITEM) => string;
    getId: (address: USER_BILLING_ITEM) => string;
    getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
    isDefault: (address: USER_BILLING_ITEM) => boolean;
}
```
* `getAddresses` - returns list of billing addresses.
* `getDefault` - returns a default billing address.
* `getTotal` - returns total number of billing addresses user has.
* `getId` - returns id from an individual address.
* `getPostCode` - returns post code from an individual address.
* `getStreetName` - returns street name from an individual address.
* `getStreetNumber` - returns street number from an individual address.
* `getCity` - returns city name from an individual address.
* `getFirstName` - returns first name from an individual address.
* `getLastName` - returns last name from an individual address.
* `getCountry` - returns country name from an individual address.
* `getPhone` - return phone number from an individual address.
* `getEmail` - returns e-mail address from an individual address.
* `getProvince` - returns province (state) from an individual address.
* `getCompanyName` - returns company name from an individual address.
* `getTaxNumber` - returns tax number from an individual address.
* `getApartmentNumber` - returns apartment number from an individual address.
* `isDefault` - return information if address is current default.

## Example

````javascript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserBilling();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
      userBillingGetters
    };
  }
};
````
