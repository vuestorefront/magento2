# useCurrency composable

`useCurrency` composable allows loading and changing the currency.

## API
`useCurrency` composable returns the following properties:

- `load` - function that loads the currency and updates the configuration store.
- `change` - function that changes the currency and reloads the page.
- `currency` - the currency information object that contains its symbol, code and how it should be displayed. It's a computed ref from currency state in the configuration store.
- `error` - ref that contains an errors from the composable methods.
- `loading` - ref that contains information whether any of the composable methods is loading.

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

type UseCurrencyLoadParams = ComposableFunctionArgs<{}>;

interface UseCurrencyErrors {
  load: Error | null;
  change: Error | null;
}

interface UseCurrencyInterface {
  load(params?: UseCurrencyLoadParams): Promise<void>;
  change(params: UseCurrencyChangeParams): void;
  error: DeepReadonly<Ref<UseCurrencyErrors>>;
  currency: ComputedRef<Currency>;
  loading: Readonly<Ref<boolean>>;
}
```
## Example

Check if currencies are loaded and load if not. Then display the list of available currencies. Handle currency change by calling `change` method:

```ts
<template>
    <SfList
      v-if="availableCurrencies.length > 1"
    >
      <SfListItem
        v-for="currency in availableCurrencies"
        :key="currency"
      >
        <a
          href="/"
          @click.prevent="change({id: currency})"
        >
          <SfCharacteristic class="currency">
            <template #title>
              <span>{{ currency }}</span>
            </template>
          </SfCharacteristic>
        </a>
      </SfListItem>
    </SfList>
</template>

<script>
import { useCurrency } from '~/composables';

setup() {
  const { currency, change, load } = useCurrency();

  const availableCurrencies =
    computed<string[]>(() => currencies.value?.available_currency_codes || []);

  onMounted(() => {
    if (currencies.value && currencies.value?.available_currency_codes) return;
    loadCurrencies();
  });

  return {
    change,
    availableCurrencies,
  };
}
</script>
```