# useAddresses composable

`useAddresses` composable allows loading and manipulating addresses of the current user. These addresses can be used for both billing and shipping.

This composable can be found in the `modules` folder.

## API
`useAddresses` composable returns the following properties:

- `load` - function that loads addresses of the current customer
- `save` - function that saves a new address in the profile of the current customer
- `update` - function that updates an existing address in the profile of the current customer
- `remove` - function that removes an existing address from the profile of the current customer
- `error` - ref that contains an errors from the composable methods
- `loading` - ref that contains information whether any of the composable methods is loading

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

interface CustomerAddress {
  /** The city or town */
  city?: Maybe<Scalars['String']>;
  /** The customer's company */
  company?: Maybe<Scalars['String']>;
  /** The customer's country */
  country_code?: Maybe<CountryCodeEnum>;
  /**
  The customer's country
  @deprecated Use `country_code` instead.
   */
  country_id?: Maybe<Scalars['String']>;
  /** @deprecated Custom attributes should not be put into container */
  custom_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /**
  The customer ID
  @deprecated customer_id is not needed as part of CustomerAddress, address ID (id) is unique identifier for the addresses.
   */
  customer_id?: Maybe<Scalars['Int']>;
  /** Indicates whether the address is the default billing address */
  default_billing?: Maybe<Scalars['Boolean']>;
  /** Indicates whether the address is the default shipping address */
  default_shipping?: Maybe<Scalars['Boolean']>;
  /** Address extension attributes */
  extension_attributes?: Maybe<Array<Maybe<CustomerAddressAttribute>>>;
  /** The fax number */
  fax?: Maybe<Scalars['String']>;
  /** The first name of the person associated with the shipping/billing address */
  firstname?: Maybe<Scalars['String']>;
  /** The ID assigned to the address object */
  id?: Maybe<Scalars['Int']>;
  /** The family name of the person associated with the shipping/billing address */
  lastname?: Maybe<Scalars['String']>;
  /** The middle name of the person associated with the shipping/billing address */
  middlename?: Maybe<Scalars['String']>;
  /** The customer's ZIP or postal code */
  postcode?: Maybe<Scalars['String']>;
  /** An honorific, such as Dr., Mr., or Mrs. */
  prefix?: Maybe<Scalars['String']>;
  /** An object containing the region name, region code, and region ID */
  region?: Maybe<CustomerAddressRegion>;
  /** The unique ID for a pre-defined region */
  region_id?: Maybe<Scalars['Int']>;
  /** An array of strings that define the street number and name */
  street?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** A value such as Sr., Jr., or III */
  suffix?: Maybe<Scalars['String']>;
  /** The telephone number */
  telephone?: Maybe<Scalars['String']>;
  /** The customer's Value-added tax (VAT) number (for corporate customers) */
  vat_id?: Maybe<Scalars['String']>;
}

interface UseAddressesParamsInput {
  address: CustomerAddress;
}

interface UseAddressesInterface {
  error: Ref<UseAddressesErrors>;
  loading: Ref<boolean>;
  load(customQuery?: CustomQuery, customHeaders?: CustomHeaders): Promise<CustomerAddress[]>;
  save(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<CustomerAddress>;
  update(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<CustomerAddress>;
  remove(params: ComposableFunctionArgs<UseAddressesParamsInput>): Promise<boolean>;
}
```
## Examples

### Loading addresses

Loading customer addresses on client side using the `onMounted` Composition API hook:

```typescript
import { onMounted, ref } from '@nuxtjs/composition-api';
import { useAddresses } from '~/composables';

export function {
  setup() {
    const { load } = useAddresses();
    const addresses = ref([]);

    onMounted(async () => {
      addresses.value = await load();
    });
  }
}
   ```

### Saving an address

Save a new customer address using an event handler/function:

```typescript
import { ref, useFetch } from '@nuxtjs/composition-api';
import { useAddresses, UseAddressesParamsInput } from '~/composables';

export default {
  setup(props) {
    const { error, load } = useAddresses();
    const addresses = ref([]);

    useFetch(async () => {
      addresses.value = await load();
    });

    const onSaveAddress = async (input: UseAddressesParamsInput) => {
      const newAddress = await save(input);

      if (error.value.save) {
        // handle saving error
      }
  
      addresses.value.push(newAddress);
    };
  }
}
```

### Updating an address

Update a customer address using an event handler/function:

```typescript
import { ref, useFetch } from '@nuxtjs/composition-api';
import { useAddresses, UseAddressesParamsInput } from '~/composables';
   
export default {
  setup(props) {
    const { error, load, update } = useAddresses();
    const addresses = ref([]);
   
    useFetch(async () => {
      addresses.value = await load();
    });
   
    const onUpdateAddress = async (input: UseAddressesParamsInput) => {
      const updatedAddress = await update(input);
   
      if (error.value.update) {
        // handle updating error
      }
   
      addresses.value = addresses.value.map((address) => {
        if (address.id === updatedAddress.id) {
          return updatedAddress;
        }
   
        return address;
      });
    };
  }
}
```

### Removing an address

Remove a customer address using event handler/function:
   
```typescript
import { ref, useFetch } from '@nuxtjs/composition-api';
import { useAddresses, UseAddressesParamsInput } from '~/composables';
   
export default {
  setup(props) {
    const { error, load, remove } = useAddresses();
    const addresses = ref([]);
   
    useFetch(async () => {
      addresses.value = await load();
    });
   
    const onRemoveAddress = async (input: UseAddressesParamsInput) => {
      const wasRemoved = await remove(input);
   
      if (error.value.remove || !wasRemoved) {
        // handle removing error
      }
   
      addresses.value = addresses.value.filter((address) => {
        return address.id !== input.address.id;
      });
    };
  }
}
```


