# useStore composable

`useStore` composable allows loading and changing currently active store.

## API
`useStore` composable returns the following properties:

- `load` - function that fetches a list of available stores.
- `change` - function that changes the current store and reloads the page.
- `stores` - main data object populated by the `load()` method.
- `error` - ref that contains an errors from the composable methods.
- `loading` - ref that contains information whether any of the composable methods is loading.

## Interfaces

```ts
interface UseStoreErrors {
  load: Error | null;
  change: Error | null;
}

interface UseStoreInterface {
  change(store: StoreConfig): void;
  load(customQuery?: { availableStores: string }): Promise<void>;
  stores: Ref<AvailableStores>;
  loading: DeepReadonly<Ref<boolean>>;
  error: DeepReadonly<Ref<UseStoreErrors>>;
}
```

## Example

Load available stores on mount and handle change of the store:

```ts
<template>
<SfList v-if="availableStores.length > 1">
  <SfListItem
    v-for="store in availableStores"
    :key="store.id"
  >
    <a
      href="/"
      @click.prevent="changeStore(store)"
      ...
    >
      <SfCharacteristic class="language">
          <span>{{ store.store_name }}</span>
          <SfImage
            :src="`/icons/langs/${store.locale}.webp`"
            ...
          />
      </SfCharacteristic>
    </a>
  </SfListItem>
</SfList>
</template>

<script>
import { useStore, AvailableStores } from '~/composables';

setup() {
  const { stores, load, change } = useStore();

  const availableStores = computed<AvailableStores>(() => stores.value ?? []);

  onMounted(() => {
    if (stores.value && stores.value?.length) return;
    load();
  });

  return {
    availableStores,
    change
  };
}
</script>
```