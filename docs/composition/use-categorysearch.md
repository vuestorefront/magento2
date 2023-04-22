# useCategorySearch composable

`useCategorySearch` composable allows searching for categories. It is commonly used in navigation menus, and provides the search function and refs for the categories, loading and error.

## API
`useCategorySearch` composable returns the following properties:

- `search` - function that searches for categories using the received filters and updates the categories with the results.
- `result` - the list of categories found by the last search. It's `null` if the search has not been executed yet or fails.
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

type UseCategorySearchParams = ComposableFunctionArgs<CategorySearchQueryVariables>;

interface UseCategorySearchInterface {
  search(searchParams: UseCategorySearchParams): Promise<void>;
  error: DeepReadonly<Ref<UseCategorySearchErrors>>;
  result: DeepReadonly<Ref<CategoryTree[] | null>>;
  loading: Readonly<Ref<boolean>>;
}
```
## Example

Search for a category by its uid and get its name:

```ts
import { useCategorySearch } from '~/modules/category/composables/useCategorySearch';

const { search } = useCategorySearch();

const myCategory = useAsync(async () => {
  const data = await search({ filters: { category_uid: { "eq": "MjA=" } } });

  return data?.[0] ?? {}
});

const myCategoryName = computed(() => myCategory.value.name);
 ```