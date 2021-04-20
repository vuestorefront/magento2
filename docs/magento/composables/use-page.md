# usePage

`usePage` composition API function is responsible, as its name suggests, for interactions with the cms pages in your eCommerce. This function returns following values:

## API
```typescript
interface UsePage<PAGE> {
  page: ComputedProperty<PAGE>;
  loadPage: (identifier: string) => Promise<void>;
  loading: ComputedProperty<boolean>;
}
```

* `loadPage` - Function that takes an `identifier` and loads the `page`
* `page` - Returns the `page` data
* `loading` - indicates the State of `loadPage`

## Example
```javascript
import {
  usePage
} from '@vue-storefront/magento';
import {
  onSSR
} from '@vue-storefront/core';

export default {
  setup(props) {
    const {
      page,
      loadPage,
      loading
    } = usePage('cmsPage');

    onSSR(async () => {
      await loadPage(props.identifier);
    });

    return {
      page,
      loading
    };
  }
}
```
