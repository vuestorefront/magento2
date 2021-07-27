# useGuestUser

## Features
`useGuestUser` composable is responsible for fetching a Shipping Method

## API
The `useGuestUser` composable implements custom factory `useGuestUserFactory` located in `packages/composables/src/factories/useGuestUserFactory.ts` and returns `UseGuestUser` interface:
```typescript
export interface UseGuestUser<any> {
  guestUser: ComputedProperty<any>;
  setGuestUser: (user: any) => void;
  attachToCart: (params: { user: UseGuestUserRegisterParams }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseGuestUserErrors>;
}

export interface UseGuestUserRegisterParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  [x: string]: any;
}

export interface UseGuestUserErrors {
  attachToCart: Error;
}
```
### `guestUser`
Returns a User as a computed property

### `setGuestUser`
Set the User

### `attachToCart`
Function that takes `user` as `UseGuestUserRegisterParams` param.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useGuestUser } from '@vue-storefront/magento';

export default {
  setup (props) {
    const {
      attachToCart,
      loading: loadingGuestUser,
      error: errorGuestUser,
    } = useGuestUser();

    const handleFormSubmit = () => async () => {
      await attachToCart({ user: props.user });
    };

    return {
      handleFormSubmit,
      loadingGuestUser,
      errorGuestUser,
    }
  }
}
```
