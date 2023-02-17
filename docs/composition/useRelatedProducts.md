# useRelatedProducts composable

`useRelatedProducts` composable allows searching for related products with params for sort, filter and pagination.

## API
`useRelatedProducts` composable returns the following properties:

- `search` - function that searches for the related products with params for sort, filter and pagination.
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

type UseRelatedProductsSearchParams = ComposableFunctionArgs<GetProductSearchParams>;

interface UseRelatedProductsErrors {
  search: Error | null;
}

interface UseRelatedProductsInterface {
  error: DeepReadonly<Ref<UseRelatedProductsErrors>>;
  loading: Readonly<Ref<boolean>>;
  search(params: UseRelatedProductsSearchParams): Promise<RelatedProduct[]>;
}
```

## Example

Search for related products by filter `sku`.

```ts
import useRelatedProducts from '~/composables';
import { usePageStore } from '~/stores/page';

const { search, loading } = useRelatedProducts();
const { routeData } = usePageStore();
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
```