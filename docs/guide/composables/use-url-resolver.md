# useUrlResolver

## Features
`useUrlResolver` composable is responsible for fetching a list of categories. A common usage scenario for this composable is navigation.

## API
```typescript
interface UseRouter<ROUTE> {
  search: (url: string) => Promise<void>;
  result: ComputedProperty<ROUTE>;
  loading: ComputedProperty<boolean>;
  error: ComputedProperty<UseRouterErrors>;
}
```

### `search`
Function that takes `url` as identifier and gets the `result` accordingly

### `result`
Returns the url fetched by `search` method as a `computed` property.
``` typescript
export type UrlResloverQuery = {
  urlResolver?: Maybe<Pick<
    EntityUrl,
    'id' | 'redirectCode' | 'relative_url' | 'type' | 'entity_uid'
  >>
};
```

### `loading`
Returns the current state of `search` as `computed` boolean property

### `error`
Reactive object containing the error message, if search failed for any reason.

## Example
```javascript
import { onSSR } from '@vue-storefront/core';
import { useUrlResolver } from '@vue-storefront/magento';

export default {
  setup (props) {
    const {
      search: routeSearch,
      result: routeData,
      loading,
      error,
    } = useUrlResolver(`router:${props.identifier}`);

    onSSR(async () => {
      await routeSearch(props.identifier);
    });

    return {
      routeData,
      loading,
      error,
    }
  }
}
```
