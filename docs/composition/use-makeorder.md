# useMakeOrder

The `useMakeOrder` composable can be used to make an order with current cart.

## API

`useMakeOrder` returns the following properties:
- `make` - creates an order from the current cart
- `error` - error object
- `loading` - boolean indicating if the request is in progress

## Example
The `make` function retrieves the active cart from the `useCart` composable, creates an order, and then returns a `PlacedOrderOutput` that contains information about the requested order.

```js
import { useMakeOrder } from '~/modules/checkout/composables/useMakeOrder';

const { make, error, loading } = useMakeOrder();

const orderOutput = await make();

const orderId = orderOutput.order.order_number;
```


## Interfaces

```js

export interface PlaceOrderOutput {
  order: Order;
}

/** Contains details about the requested order */
export interface Order {
  /** An array containing the items purchased in this order */
  items?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** @deprecated The order_id field is deprecated, use order_number instead. */
  order_id?: Maybe<Scalars['String']>;
  /** The unique ID for a `Order` object. */
  order_number: Scalars['String'];
  /** Contains the calculated total for this order */
  total?: Maybe<Scalars['String']>;
}

/**
 * The {@link useMakeOrder} error object. The properties values' are the errors
 * thrown by its methods.
 */
export interface UseMakeOrderErrors {
  /** Error when making an order fails, otherwise is `null`. */
  make: Error | null;
}

/**
 * Data and methods returned from the {@link useRelatedProducts} composable.
 */
export interface UseMakeOrderInterface {
  /** Makes an order with current cart. */
  make(params?: ComposableFunctionArgs<{}>): Promise<PlaceOrderOutput | null>;

  /**
   * Contains errors from any of the composable methods.
   *
   * Read {@link UseMakeOrderErrors} documentation for more details.
   */
  error: Readonly<Ref<UseMakeOrderErrors>>;

  /** Indicates whether any of the composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
}
```