# useExternalCheckout

## Features
`useExternalCheckout` composable is responsible for redirecting checkout process and depends on [Magento 2 External Checkout for Vue Storefront](https://github.com/Vendic/magento2-external-checkout) repository.

## API
The `useExternalCheckout` composable implements custom factory `useExternalCheckoutFactory` located in `packages/composables/src/factories/useExternalCheckoutFactory.ts` and returns `UseExternalCheckout` interface:
```typescript
export interface UseExternalCheckout {
  initializeCheckout: (baseUrl: string) => Promise<string>;
  error: ComputedProperty<UseExternalCheckoutErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseExternalCheckoutErrors {
  initializeCheckout: Error;
}
```
### `initializeCheckout`
Function that takes `baseUrl`as search param.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example

```javascript
import { useExternalCheckout } from '@vue-storefront/magento';

export default {
  setup (props) {
    const { initializeCheckout } = useExternalCheckout();

    const goToCheckout = async () => {
      const redirectUrl = await initializeCheckout('/checkout/user-account');
      await router.push(redirectUrl);
    };

    return {
      goToCheckout,
    }
  }
}
```
