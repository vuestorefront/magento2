# useUserOrder

`useUserOrders` composable is responsible, as it's name suggests for interactions with user's order history from your eCommerce.

## API

```typescript
interface UseUserOrder<ORDERS, ORDER_SEARCH_PARAMS> {
  orders: ComputedProperty<ORDERS>;
  search(params: ComposableFunctionArgs<ORDER_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUserOrderErrors>;
}
```

* `orders` - a main data object that contains an array of orders fetched by searchOrders method.
* `totalOrder` - Returns the total `number` of `orders` for the current User
* `error` - reactive object containing the error message, if some properties failed for any reason.
* `loading` - a reactive object containing information about loading state of your searchOrders method.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useUserOrder } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';

export default {
  setup() {
    const {
      orders,
      searchOrders
    } = useUserOrders();

    onSSR(async () => {
      await searchOrder();
    });

    return {
      orders: computed(() => orders ? orders.value : [])
    }
  }
}
```
