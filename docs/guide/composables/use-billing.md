# useBilling

## Features
`useBilling` composable can be used to:
* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API
```typescript
interface UseBilling<BILLING, BILLING_PARAMS> {
  billing: ComputedProperty<BILLING>;
  error: ComputedProperty<UseBillingErrors>;
  load(): Promise<void>;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  loading: ComputedProperty<boolean>;
  save: (params: { params: BILLING_PARAMS; billingDetails: BILLING; customQuery?: CustomQuery }) => Promise<void>;
}
```

### `load`
Function that takes in `CustomQuery` as optional params and gets the `billing` accordingly
``` typescript
type CustomQuery = Record<string, string>;
```

### `billing`
Returns `billing` as a `computed` property
``` typescript
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
