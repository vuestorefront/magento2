# useBilling

## Features
`useBilling` composable can be used to:
* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API

### `load`
Function that takes in `CustomQuery` as optional params and gets the `billing` accordingly

### `billing`
Returns `billing` as a `computed` property
```typescript
// packages/composables/src/composables/useBilling/index.ts
export default useBillingFactory<BillingCartAddress, any>(factoryParams);

// packages/api-client/src/types/GraphQL.ts
interface BillingCartAddress {
  city: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  country: CartAddressCountry;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<CartAddressRegion>;
  street: Array<Maybe<Scalars['String']>>;
  telephone: Scalars['String'];
}
```

### `save`
Saves new address

### `loading`
Returns the `loading` state of `search`

### `error`
reactive object containing the error message, if search failed for any reason.

## Getters
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

```typescript
interface UserBillingGetters {
    getAddresses: (billing, criteria?: Record<string, any>) => any[];
    getDefault: (billing) => any;
    getTotal: (billing) => number;
    getPostCode: (address) => string;
    getStreetName: (address) => string;
    getStreetNumber: (address) => string | number;
    getCity: (address) => string;
    getFirstName: (address) => string;
    getLastName: (address) => string;
    getCountry: (address) => string;
    getPhone: (address) => string;
    getEmail: (address) => string;
    getProvince: (address) => string;
    getCompanyName: (address) => string;
    getTaxNumber: (address) => string;
    getId: (address) => string;
    getApartmentNumber: (address) => string | number;
    isDefault: (address) => boolean;
}
```

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useBilling, userBillingGetters } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useBilling();

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
```
