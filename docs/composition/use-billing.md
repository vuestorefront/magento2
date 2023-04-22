# useBilling composable

`useBilling` composable allows loading and manipulating billing information of the current user.

## API
`useBilling` composable returns the following properties:

- `load` - function that loads the billing information.
- `save` - function that Saves the billing information.
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

interface UseBillingError {
  load: Error | null;
  save: Error | null;
}

type UseBillingLoadParams = ComposableFunctionArgs<{}>;

type UseBillingSaveParams = ComposableFunctionArgs<{
  billingDetails: BillingDetails;
}>;

interface UseBillingInterface {
  load(params?: UseBillingLoadParams): Promise<BillingCartAddress | null>;
  save(params: UseBillingSaveParams): Promise<BillingCartAddress | null>;
  error: Readonly<Ref<UseBillingError>>;
  loading: Readonly<Ref<boolean>>;
}
```

## Example

Load user's billing information and handle the form submit:

```ts
import useBilling from '~/modules/checkout/composables/useBilling';

const { save, load } = useBilling();

onMounted(async () => {
  const billingInformation = await load();
});

const handleAddressSubmit = (reset: () => void) => async () => {
  const billingDetailsData = {
    billingDetails: {
      customerAddressId: addressId,
      sameAsShipping: false,
      save_in_address_book: false,
      },
    };

  await save(billingDetailsData);
};
```

