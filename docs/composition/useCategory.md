# useCategory composable

`useCategory` composable allows loading categories from Magento API. It is commonly used in navigation menus, and provides the load function and refs for the categories, loading and error.

## API
`useAddresses` composable returns the following properties:

- `load` - function that loads loads the list of categories and updates `categories`
- `loadCategoryMeta` - function that loads the category metadata
- `categories` - the array of categories fetched in the `load` method, otherwise is `null`.
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

interface UseCategoryErrors {
  /** Error when loading categories fails, otherwise is `null`. */
  load: Error;
  loadCategoryMeta: Error;
}

type UseCategoryParamsInput = ComposableFunctionArgs< {
  pageSize: number;
}>;

type UseCategoryMetaParamsInput = ComposableFunctionArgs< {
  category_uid: string;
}>;

interface UseCategoryInterface {
  categories: Ref<CategoryTree[] | null>;
  error: Ref<UseCategoryErrors>;
  loading: Ref<boolean>;
  load(params: ComposableFunctionArgs<UseCategoryParamsInput>): Promise<void>;
  loadCategoryMeta(params: ComposableFunctionArgs<UseCategoryMetaParamsInput>): Promise<CategoryTree | null>;
}
```
## Example

Load categories on client side using the `onMounted` Composition API hook:

```ts
<template>
  <div v-if="loading">
    Loading categories…
  </div>
  <div v-else-if="error.load">
    Error: {{ error.load.message }}
  </div>
  <div v-else>
    <!-- Display 'categories' -->
  </div>
</template>

<script>
import { onMounted } from '@nuxtjs/composition-api';
import { useCategory } from '~/modules/catalog/category/composables/useCategory';

export default {
  setup() {
    const { categories, error, load, loading } = useCategory();

    onMounted(async () => {
      await load({ pageSize: 10 });
    });

    return {
      error,
      loading,
      categories,
    };
  },
};
</script>
 ```