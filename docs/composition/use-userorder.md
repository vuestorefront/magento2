# useUserOrder composable

`useUserOrder` composable allows fetching customer orders.

## API
`useUsuseUserOrderer` composable returns the following properties:

- `search` - function that fetches orders of the current customer.
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

interface UseUserOrderErrors {
  search: Error | null;
}

type UseUserOrderSearchParams = ComposableFunctionArgs<CustomerOrdersQueryVariables>;

interface UseUserOrderInterface {
  search(params: UseUserOrderSearchParams) : Promise<Maybe<CustomerOrders>>;
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<UseUserOrderErrors>>;
}
```

## Example

Load all orders of the current customer:

```ts
import { useUserOrder } from '~/composables';
import { useRoute, useFetch } from '@nuxtjs/composition-api';

setup() {
  const { search } = useUserOrder();
  const route = useRoute();
  const {
    query: {
      page,
      itemsPerPage,
    },
  } = route.value;

  const rawCustomerOrders = ref<CustomerOrders | null>(null);

  useFetch(async () => {
    rawCustomerOrders.value = await search({
      currentPage: Number.parseInt(page as string, 10) || 1,
      pageSize: Number.parseInt(itemsPerPage as string, 10) || 10,
    });
  });
}
```