# useConfig

useConfig` composition API function is responsible, as its name suggests, for interactions with the configuration in your eCommerce. This function returns following values:

## API
```typescript
interface UseConfig<Config> {
  config: ComputedRef<Config>;
  loadConfig: () => Promise<void>;
  loading: ComputedRef<boolean>;
}
```

* `config` - Returns the loaded `config` as `computed` property
* `loadConfig` - Function to load the `config`
* `loading` - Return state of `loadConfig` Function as `computed` property

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useConfig } from '@vue-storefront/magento';

export default {
  setup() {
    const {
      config,
      loadConfig,
      loading
    } = useConfig();

    onSSR(async () => {
      await loadConfig();
    })

    return {
      config,
      loading
    };
  }
};
```
