# useShipping composable

`useShipping` composable allows loading the shipping information for the current cart and saving (selecting) other shipping information for the same cart.

## API
`useShipping` composable returns the following properties:

- `load` - function that loads the shipping information for current cart.
- `save` - function that saves new shipping information for current cart.
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