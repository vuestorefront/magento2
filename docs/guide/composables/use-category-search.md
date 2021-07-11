# useCategorySearch

## Features
`useCategorySearch` composable is responsible for fetching a list of categories based on search term provided. A common usage scenario for this composable is navigation subtrees.

## API
The `useCategorySearch` composable implements custom factory `useCategorySearchFactory` located in `packages/composables/src/factories/useCategorySearchFactory.ts` and returns `UseCategorySearch` interface:

```typescript
export interface UseCategorySearch<Category> {
  search: (params: { term: string }) => Promise<Category[]>;
  result: ComputedProperty<Category[]>;
  error: ComputedProperty<UseCategorySearchErrors>;
  loading: ComputedProperty<boolean>;
}

export interface UseCategorySearchErrors {
  search: Error;
}
```
> For more information on [Category interface](use-category) visit the dedicated documentation.

### `search`
Function that takes `term` as search param and gets the `categories` accordingly

### `result`
Returns an array of categories fetched by `search` method as a `computed` property.
See [useCategory](use-category.html) for more information on `categories` interface

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useCategorySearch } from '@vue-storefront/magento';

export default {
  setup () {
    const {
      loading,
      error,
      result: categories,
      search: categoriesSearch,
    } = useCategorySearch('AppHeader:Categories');

    onSSR(async () => {
      await categoriesSearch({
        term: 'value',
      });
    });

    return {
      categories,
      loading,
      error,
    }
  }
}
```
