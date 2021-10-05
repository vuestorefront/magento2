# useCustomQuery

## Features
`useCustomQuery` composition function can be used to execute custom Queries on the Magento GraphQL API.

What makes it powerful is the ability to accept any GraphQL query, and execute it.

## API
```typescript
export interface UseCustomQuery<QUERY, QUERY_VARIABLES, QUERY_RETURN, API extends PlatformApi = any> extends Composable<API> {
  setQueryString: (newQueryString: string) => void;
  queryString: ComputedProperty<QUERY>;
  query: ({ variables, fetchPolicy, }: {
    variables: QUERY_VARIABLES,
    fetchPolicy?: FetchPolicy,
  }) => Promise<QUERY_RETURN>;
  result: ComputedProperty<QUERY_RETURN>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseUpsellProductsErrors>;
}
```

### `setQueryString`
Function to define the query to be executed on the GraphQL Query

### `queryString`
`sharedRef` of the GraphQL query string

### `query`
Actual query function to fetch the data under the Magento GraphQL API.

### `result`
Reactive object containing the result information from query method.

### `loading`
Reactive object containing the loading state of the query function.

### `error`
Reactive object containing the error message, if query failed for any reason.

## Example
`customQueryExample.ts`

```typescript
import { useCustomQuery } from '@vue-storefront/magento';

export const customQuery = (id?: string) => {
  const {
    error,
    loading,
    query,
    result,
    setQueryString,
  } = useCustomQuery(id);

  setQueryString(`
  query urlResolver($url: String!) {
    urlResolver(url:$url) {
      id,
      redirectCode,
      relative_url,
      type
      entity_uid
    }
  }`);

  return {
    error,
    loading,
    query,
    result,
  };
};
```

`Any File`
```typescript
import { customQuery } from '~/composables/customQueryExample.ts';

const { query } = customQuery(path);

await query({
  variables: {
    url: path.replace(/\/[cp|]\//gi, ''),
  },
});
```
