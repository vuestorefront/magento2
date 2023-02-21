# useGuestUser

The `useGuestUser` allows you to set a guest email onto a cart. This means that the cart will have an associated email without requiring customers to go through the full process of registering an account.

## API

`useGuestUser` returns the following properties:
- `attachToCart` - attaches an email address to an anonymous cart
- `loading` - a boolean indicating if the request is in progress
- `error` - an error object if the request failed

## Example

Using this composable requires two things:
1. An email address that will be associated with the cart
2. A reactive reference to the current cart via the `useCart` composable.

```js
import useCart from '~/modules/checkout/composables/useCart';
import { useGuestUser } from '~/composables';

const email = ref(''); // get user input from a form
const { cart } = useCart();
const { attachToCart, loading, error } = useGuestUser();

await attachToCart({ email: email.value, cart })
```

## Types

```js
/** Errors returned by the {@link useGuestUser} composable */
export interface UseGuestUserErrors {
  attachToCart: Error;
}

/** Params used by {@link useGuestUser} composable's `attachToCart` method */
export interface AttachToCartParams {
  email: string;
  cart: ComputedRef<Cart>,
  [x: string]: any;
}

/**
 * Data and methods returned from the {@link useGuestUser}  composable
 */
export interface UseGuestUserInterface<REGISTER_GUEST_USER_PARAMS extends AttachToCartParams> {
  /** Attaches guest cart to user */
  attachToCart(params: ComposableFunctionArgs<REGISTER_GUEST_USER_PARAMS>): Promise<void>;
  /** Indicates the loading state for `attachToCart` */
  loading: DeepReadonly<Ref<boolean>>;
  /** Possible errors when calling `attachToCart` */
  error: DeepReadonly<Ref<UseGuestUserErrors>>;
}
```