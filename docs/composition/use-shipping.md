# useShipping composable

`useShipping` composable allows loading the shipping information for the current cart and saving (selecting) other shipping information for the same cart.

## API
`useShipping` composable returns the following properties:

- `load` - function that loads the shipping information for current cart.
- `save` - function that saves new shipping information for current cart.
- `error` - ref that contains an errors from the composable methods.
- `loading` - ref that contains information whether any of the composable methods is loading.

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

interface UseShippingErrors {
  load: Error | null;
  save: Error | null;
}

type UseShippingLoadParams = ComposableFunctionArgs<{}>;

type UseShippingSaveParams = ComposableFunctionArgs<{
  shippingDetails: any;
}>;

interface UseShippingInterface {
  error: Readonly<Ref<UseShippingErrors>>;
  loading: Readonly<Ref<boolean>>;
  load(params?: UseShippingLoadParams): Promise<ShippingCartAddress | null>
  save(params: UseShippingSaveParams): Promise<ShippingCartAddress | null>;
}
```

## shippingGetters

`shippingGetters` is a set of helper functions that can be used to get data from the user object. They receive user object as a parameter and return the data from it.

- `getAddresses` - returns shipping addresses.
- `getDefault` - returns default shipping address.
- `getTotal` - returns total shipping addresses count.
- `getPostCode` - returns shipping address post code.
- `getStreetName` - returns shipping address street name.
- `getApartmentNumber` - returns shipping address apartment number.
- `getCity` - returns shipping address city.
- `getFirstName` - returns shipping address first name.
- `getLastName` - returns shipping address last name.
- `getCountry` - returns shipping address country.
- `getPhone` - returns shipping address phone number.
- `getEmail` - returns shipping address email address.
- `getProvince` - returns shipping address province.
- `getCompanyName` - returns shipping address company name.
- `getId` - returns shipping address id.
- `isDefault` - returns shipping address default status.


## shippingGetters usage

```ts
import shippingGetters from '~/modules/catalog/product/getters/shippingGetters';

const postCode = shippingGetters.getPostCode(address);
const shippingEmail = shippingGetters.getEmail(address);
const companyName = shippingGetters.getCompanyName(address);
```

## Example

Fetch shipping details on mount and create a new shipping address handler:

```ts
import useShipping from '~/composables';

setup() {
  const { load, save } = useShipping();

  const handleAddressSubmit = async (shippingDetails) => {
    await save({ shippingDetails });
  };

  onMounted(async () => {
    await load();
  });

  return {
    handleAddressSubmit
  };
}
```