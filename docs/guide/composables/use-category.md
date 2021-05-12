# useCategory

`useCategory` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API

```typescript
interface UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
  categories: ComputedProperty<CATEGORY[]>;
  search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseCategoryErrors>;
}
```

* `categories` - a main data object that contains an array of categories fetched by `search` method.
* `search` - Function that takes `categorySearchParams` as input and fill the `categories
* `loading` - Returns the current state of `search` as `computed` property
* `error` - reactive object containing the error message, if search failed for any reason.

## Getters
````typescript
interface CategoryGetters<CATEGORY> {
  getTree: (category: CATEGORY) => AgnosticCategoryTree | null;
  getBreadcrumbs: (category: CATEGORY) => AgnosticBreadcrumb[];
  getCategoryTree?: (
    category: CATEGORY,
    currentCategory: string,
    withProducts: boolean,
  ) => AgnosticCategoryTree | null;
  [getterName: string]: any;"
}
````
## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useCategory } from '@vue-storefront/magento';

export default {
  setup () {
    const { categories, search, loading } = useCategory('category-id');

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      loading
    }
  }
}
```
