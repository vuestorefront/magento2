# useMenuCategory

## Features
`useMenuCategory` composable is responsible for fetching a list of categories with a dedicated file structure for AppHeader Menu.

## API
The `useMenuCategory` composable implements `useCategoryFactory` from `@vue-storefront/core` wich exports return the `UseCategory` interface:
``` typescript
export interface UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
    categories: ComputedProperty<CATEGORY[]>;
    search(params: ComposableFunctionArgs<CATEGORY_SEARCH_PARAMS>): Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseCategoryErrors>;
}
```

### `search`
Function that takes `CategoryListQueryVariables` and `CustomQuery` as optional params and gets the `categories` accordingly
``` typescript
export type CategoryListQueryVariables = Exact<{ [key: string]: never; }>;

type CustomQuery = Record<string, string>;
```

### `categories`
Returns an array of categories fetched by `search` method as a `computed` property.
See [useCategory](use-category.html) for more information on `UseCategory` interface.

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useMenuCategory } from '@vue-storefront/magento';

export default {
  setup () {
    const { categories, search, loading } = useMenuCategory('category-id');

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
