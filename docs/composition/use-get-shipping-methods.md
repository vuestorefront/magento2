# useGetShippingMethods

Fetches the available shipping methods for a given cart and supports both guest checkouts and checkouts for logged in customers.

For guest checkouts, you need to provide a `cartId` as a parameter. For logged in customers, the shipping methods are automatically fetched for the current cart.

In both cases, you will receive an array of `AvailableShippingMethods`.

```js
import useGetShippingMethods from '~/modules/checkout/composables/useGetShippingMethods';

const { load, error, loading } = useGetShippingMethods();

// guest
const shippingMethods = await load({ cartId: 'cart-id' });

// logged in customer
const shippingMethods = await load();

```


## Types

```js
/** Errors returned by the {@link useGetShippingMethods} composable */
export interface UseGetShippingMethodsErrors {
  load: Error;
}

/**
 * Data and methods returned from the {@link useGetShippingMethods} composable
 */
export interface UseGetShippingMethodsInterface<SHIPPING_METHOD> {
  /** Loads the shipping methods for a cart */
  load (params: ComposableFunctionArgs<{ cartId: string }>): Promise<SHIPPING_METHOD[]>;
  /** Possible errors when loading shipping methods */
  error: Readonly<Ref<UseGetShippingMethodsErrors>>;
  /** Indicates whether the shipping methods are already being loaded */
  loading: Readonly<Ref<boolean>>;
}

export interface AvailableShippingMethod {
  amount: Money;
  available: Scalars['Boolean'];
  /** @deprecated The field should not be used on the storefront */
  base_amount?: Maybe<Money>;
  carrier_code: Scalars['String'];
  carrier_title: Scalars['String'];
  error_message?: Maybe<Scalars['String']>;
  /** Could be null if method is not available */
  method_code?: Maybe<Scalars['String']>;
  /** Could be null if method is not available */
  method_title?: Maybe<Scalars['String']>;
  price_excl_tax: Money;
  price_incl_tax: Money;
}
```