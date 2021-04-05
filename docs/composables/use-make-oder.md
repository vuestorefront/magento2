
# useMakeOrder
`useMakeOrder` composable is responsible for making an order

## API
````typescript
interface UseMakeOrder<ORDER> {
  order: Ref<ORDER>;
  make(params: { customQuery?: CustomQuery }): Promise<void>;
  error: ComputedProperty<UseMakeOrderErrors>;
  loading: ComputedProperty<boolean>;
}
````

* `make` - function for making an order. This method accepts a single optional params object.
* `order` - a main data object that contains a made order.
* `loading` - a reactive object containing information about loading state of your make method.
* `error` - a reactive object containing the error message, if load or save failed for any reason.

## Getters
````typescript
interface UserOrderGetters<ORDER, ORDER_ITEM> {
    getDate: (order: ORDER) => string;
    getId: (order: ORDER) => string;
    getStatus: (order: ORDER) => string;
    getPrice: (order: ORDER) => number;
    getItems: (order: ORDER) => ORDER_ITEM[];
    getItemSku: (item: ORDER_ITEM) => string;
    getItemName: (item: ORDER_ITEM) => string;
    getItemQty: (item: ORDER_ITEM) => number;
    getItemPrice: (item: ORDER_ITEM) => number;
    getFormattedPrice: (price: number) => string;
    [getterName: string]: (element: any, options?: any) => unknown;
}
````

> To be implemented

## Example
````javascript
import { useMakeOrder } from '@vue-storefront/magento';
export default {
  setup () {
    const { make, order } = useMakeOrder();
    return {
      make,
      order
    };
  }
}
````
