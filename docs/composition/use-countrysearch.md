# useCountrySearch composable

`useCountrySearch` composable allows fetching a list of countries or a single country by ID.

## API
`useCountrySearch` composable returns the following properties:

- `load` - function that fetches the array of registered countries
- `search` - function that fetches a country by its id
- `error` - ref that contains an errors from the composable methods
- `loading` - ref that contains information whether any of the composable methods is loading

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

type UseCountrySearchParams = ComposableFunctionArgs<{
  id: string;
}>;

interface UseCountrySearchErrors {
  search: Error | null
  load: Error | null
}

interface UseCountrySearchInterface {
  load(): Promise<Array<Countries>>;
  search(params: UseCountrySearchParams): Promise<Maybe<Country>>;
  loading: DeepReadonly<Ref<boolean>>;
  error: DeepReadonly<Ref<UseCountrySearchErrors>>;
}
```
## Example

Load registered countries and display them in the component:

```ts
<template>
  <div>
    <UserBillingAddresses
      :countries="countries"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from '@nuxtjs/composition-api';
import { useCountrySearch } from '~/composables';

export default {
  setup() {
    const countries = ref<Array<Country>>([]);
    const { load } = useCountrySearch();

    onMounted(async () => {
      const loadedCountries = await load();

      countries.value = loadedCountries;
    });

    return {
      countries,
      load,
    };
  }
}

</script>
```