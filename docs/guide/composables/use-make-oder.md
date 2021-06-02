# useMakeOrder
`useMakeOrder` composable is responsible for making an order

## API
````typescript
interface UseMakeOrder<Order> {
  order: Ref<Order>;
  make(params: { customQuery?: CustomQuery }): Promise<void>;
  error: ComputedProperty<UseMakeOrderErrors>;
  loading: ComputedProperty<boolean>;
}

export interface Order extends OrderItem {
  /** @deprecated The order_id field is deprecated, use order_number instead. */
  order_id?: Maybe<Scalars['String']>;
  /** The unique ID for a `Order` object. */
  order_number: Scalars['String'];
}

export interface OrderItem {
  /** The final discount information for the product */
  discounts?: Maybe<Array<Maybe<Discount>>>;
  /** The entered option for the base product, such as a logo or image */
  entered_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The unique ID for a `OrderItemInterface` object */
  id: Scalars['ID'];
  /** The name of the base product */
  product_name?: Maybe<Scalars['String']>;
  /** The sale price of the base product, including selected options */
  product_sale_price: Money;
  /** The SKU of the base product */
  product_sku: Scalars['String'];
  /** The type of product, such as simple, configurable, etc. */
  product_type?: Maybe<Scalars['String']>;
  /** URL key of the base product */
  product_url_key?: Maybe<Scalars['String']>;
  /** The number of canceled items */
  quantity_canceled?: Maybe<Scalars['Float']>;
  /** The number of invoiced items */
  quantity_invoiced?: Maybe<Scalars['Float']>;
  /** The number of units ordered for this item */
  quantity_ordered?: Maybe<Scalars['Float']>;
  /** The number of refunded items */
  quantity_refunded?: Maybe<Scalars['Float']>;
  /** The number of returned items */
  quantity_returned?: Maybe<Scalars['Float']>;
  /** The number of shipped items */
  quantity_shipped?: Maybe<Scalars['Float']>;
  /** The selected options for the base product, such as color or size */
  selected_options?: Maybe<Array<Maybe<OrderItemOption>>>;
  /** The status of the order item */
  status?: Maybe<Scalars['String']>;
}
````
### `make`
function for making an order. This method accepts a single optional params object.

### `order`
a main data object that contains a made order.

### `loading`
a reactive object containing information about loading state of your make method.

### `error`
a reactive object containing the error message, if load or save failed for any reason.


## Getters
````typescript
interface UserOrderGetters<Order, OrderItem> {
    getDate: (order: Order) => string;
    getId: (order: Order) => string;
    getStatus: (order: Order) => string;
    getPrice: (order: Order) => number;
    getItems: (order: Order) => OrderItem[];
    getItemSku: (item: OrderItem) => string;
    getItemName: (item: OrderItem) => string;
    getItemQty: (item: OrderItem) => number;
    getItemPrice: (item: OrderItem) => number;
    getFormattedPrice: (price: number) => string;
}
````

## Example
````javascript
import { useMakeOrder } from '@vue-storefront/magento';
export default {
  setup () {
    const { order, make, loading } = useMakeOrder();

    const processOrder = async () => {
      await make();
      router.push(`/checkout/thank-you?order=${order.value.order_number}`);
    };

    return {
      processOrder,
      order,
      loading,
    };
  }
}
````
