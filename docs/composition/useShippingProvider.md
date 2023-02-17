# useShippingProvider composable

`useShippingProvider` composable allows loading the shipping provider for the current cart and saving (selecting) other shipping provider for the same cart.

## API
`useShippingProvider` composable returns the following properties:

- `load` - function that loads the shipping provider for current cart.
- `save` - function that saves new shipping provider for current cart.
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

interface UseShippingProviderErrors {
  load: Error | null;
  save: Error | null;
}

type UseShippingProviderLoadParams = ComposableFunctionArgs<{}>;
type UseShippingProviderSaveParams = ComposableFunctionArgs<{
  shippingMethod: ShippingMethodInput;
}>;

interface UseShippingProviderInterface {
  error: Readonly<Ref<UseShippingProviderErrors>>;
  loading: Readonly<Ref<boolean>>;
  load(params?: UseShippingProviderLoadParams): Promise<SelectedShippingMethod | null>;
  save(params: UseShippingProviderSaveParams): Promise<SelectedShippingMethod | null>;
}
```

## Example

Save new shipping provider:

```ts
import useShippingProvider from '~/composables';
import type { AvailableShippingMethod } from '~/modules/GraphQL/types';

setup() {
  const { save } = useShipping();

  const selectShippingMethod = async (method: AvailableShippingMethod) => {
    const shippingData = {
      carrier_code: method.carrier_code,
      method_code: method.method_code,
    };

    await saveShippingProvider({
      shippingMethod: shippingData,
    });
  };
}
```