# usePaymentProvider

## Features
`usePaymentProvider` composable is responsible for fetching a Shipping Method

## API
The `usePaymentProvider` composable implements custom factory `usePaymentProviderFactory` located in `packages/composables/src/factories/usePaymentProviderFactory.ts` and returns `UsePaymentProvider` interface:
```typescript
interface UsePaymentProvider<any, any> {
  error: ComputedProperty<UsePaymentProviderErrors>;
  loading: ComputedProperty<boolean>;
  state: ComputedProperty<any>;
  setState(state: any): void;
  load(params: { customQuery?: CustomQuery }): Promise<void>;
  save(params: { paymentMethod: any, customQuery?: CustomQuery }): Promise<void>;
}

export interface UsePaymentProviderErrors {
  load: Error;
  save: Error;
}
```
### `state`
Get all `PaymentProviders` as array.

### `setState`
Set one or more `PaymentProviders` state.

### `load`
Function that takes `customQuery` as param and gets the `state` array accordingly

### `save`
Function that takes `paymentMethod` as param and saves it

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { usePaymentProvider } from '@vue-storefront/magento';

export default {
  setup (props) {
    const { load, state, save } = usePaymentProvider();

    onMounted(async () => {
      await load();
    });

    const paymentMethods = computed(() => (Array.isArray(state.value) ? state.value.map((p) => ({
      label: p.title,
      value: p.code,
    })) : []));

    const definePaymentMethods = async (paymentMethod) => {
      try {
        await save({
          paymentMethod: {
            code: paymentMethod,
          },
        });

        emit('status', paymentMethod);
      } catch (e) {
        console.error(e);
      }
    };

    return {
      definePaymentMethods,
      state,
    }
  }
}
```
