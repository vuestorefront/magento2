# useGetShippingMethods

## Features
`useGetShippingMethods` composable is responsible for fetching a Shipping Method

## API
The `useGetShippingMethods` composable implements custom factory `useGetShippingMethodsFactory` located in `packages/composables/src/factories/useGetShippingMethodsFactory.ts` and returns `UseGetShippingMethods` interface:
```typescript
export interface UseGetShippingMethods<ShippingMethod> {
  state: ComputedProperty<ShippingMethod[]>;
  setState(state: ShippingMethod[]): void;
  load: (params: { cartId: string }) => Promise<ShippingMethod[]>;
  result: ComputedProperty<ShippingMethod[]>;
  error: ComputedProperty<UseGetShippingMethodsErrors>;
  loading: ComputedProperty<boolean>;
}

export type ShippingMethod = AvailableShippingMethod;

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

export interface Money {
  /** A three-letter currency code, such as USD or EUR */
  currency?: Maybe<CurrencyEnum>;
  /** A number expressing a monetary value */
  value?: Maybe<Scalars['Float']>;
}
```
### `state`
Get all `ShippingMethods` as array.

### `setState`
Set one or more `ShippingMethods` state.

### `load`
Function that takes `cartId` as param and gets the `result` array accordingly

### `result`
Returns a list of `ShippingMethods` fetched by `load` method as a `computed` property.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useGetShippingMethods } from '@vue-storefront/magento';

export default {
  setup (props) {
    const {
      load,
      result: shippingMethods,
      loading: loadingShippingMethods,
      error: errorUseGetShippingMethods,
    } = useGetShippingMethods('VsfShippingProvider');


    onSSR(async () => {
      await load({
        cartId: props.identifier,
      });
    });

    return {
      shippingMethods,
      loadingShippingMethods,
      errorUseGetShippingMethods,
    }
  }
}
```
