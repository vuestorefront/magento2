# useMagentoConfiguration

A wrapper around the `useConfig` composable that allows easy access to a Magento's major definitions like selected currency, locale, and store.

:::read-more
To get access to your entire configuration, see the [useConfig](/composables/useConfig) composable.
:::

```js
import { useMagentoConfiguration } from '~/composables';

const {
  storeConfig, // entire config from useConfig()
  selectedCurrency,
  selectedLocale,
  selectedStore
} = useMagentoConfiguration();
```
## Interfaces

```js
/**
 * Data and methods returned from the {@link useMagentoConfiguration|useMagentoConfiguration()} composable
 */
export interface UseMagentoConfigurationInterface {
  /**
   * Store configuration object.
   */
  storeConfig: ComputedRef<StoreConfig>;

  /**
   * Currently active currency
   */
  selectedCurrency: ComputedRef<string | undefined>;

  /**
   * Currently active locale
   */
  selectedLocale: ComputedRef<string | undefined>;

  /**
   * Currently active store
   */
  selectedStore: ComputedRef<string | undefined>;
}
```