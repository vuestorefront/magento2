# useMenuCategory

## Features
`useMenuCategory` composable is responsible for fetching a list of categories with a dedicated file structure for AppHeader Menu.

## API
```typescript
export interface UseCategory<CategoryMenu, CategoryFilter> {
    categories: ComputedProperty<CategoryMenu[]>;
    search(params: ComposableFunctionArgs<CategoryFilter>): Promise<void>;
    loading: ComputedProperty<boolean>;
    error: ComputedProperty<UseCategoryErrors>;
}

export type CategoryMenu = CategoryTree;
```
> For more information on [Category Tree interface](use-category) visit the dedicated documentation.

### `search`
Function that takes `CategoryListQueryVariables` and `CustomQuery` as optional params and gets the `categories` accordingly

### `categories`
Returns an array of categories fetched by `search` method as a `computed` property.

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
