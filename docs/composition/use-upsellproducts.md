# useUpsellProducts composable

`useUpsellProducts` composable that allows loading upsell products.

## API
`useUpsellProducts` composable returns the following properties:

- `search` - function that fetches upsell products matching the provided parameters.
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
}

interface UseUpsellProductsError {
  search: Error | null;
}

type UseUpsellProductsSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

interface UseUpsellProductsInterface {
  search(params?: UseUpsellProductsSearchParams): Promise<Maybe<UpsellProducts[]>>;
  loading: Readonly<Ref<boolean>>;
  error: DeepReadonly<Ref<UseUpsellProductsError>>;
}
```

## Example

Load upsell products on mount:

```ts
import { useUpsellProducts } from '~/composables';

setup() {
  const { search } = useUpsellProducts();
  const products = ref([]);

  onMounted(async () => {
    const baseSearchQuery = {
      filter: {
        sku: {
          eq: routeData.sku,
        },
      },
    };

    products.value = await search(baseSearchQuery);
  });
}
```