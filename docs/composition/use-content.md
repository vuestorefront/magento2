# useContent composable

`useContent` composable allows loading CMS Pages or Blocks from Magento API.

## API
`useContent` composable returns the following properties:

- `loadPage` - function that loads CMS page
- `loadBlocks` - function that loads CMS block
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

interface UseContentErrors {
  page: Error | null;
  blocks: Error | null;
}

interface UseContentInterface {
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<UseContentErrors>>;
  loadPage(params: ComposableFunctionArgs<{ identifier: string }>): Promise<CmsPage>;
  loadBlocks(params: ComposableFunctionArgs<{ identifiers: string[] }>): Promise<CmsBlock[]>;
}
```
## Example

### Load CMS Page

Load CMS Page using the useFetch hook:

```ts
import { useFetch, ref } from '@nuxtjs/composition-api';
import { useContent } from '~/composables';

export default {
  setup() {
    const { loading, error, loadPage } = useContent();

    const page = ref({});
    const pageId = 'about-us'

    useFetch(async () => {
      page.value = await loadPage({ identifier: pageId });

      if (error?.value?.page || !page.value) {
        // Handle error
      }
    });
  }
}
```

### Load CMS Blocks

Load CMS Block using the useFetch hook:

```typescript
import { useFetch, ref } from '@nuxtjs/composition-api';
import { useContent } from '~/composables';

export default {
  setup(props) {
    const { loadBlocks } = useContent();
    const blocks = ref([]);

    useFetch(async () => {
      if (props.identifiers) {
        blocks.value = await loadBlocks(['block-a', 'block-b`]);
      }
    });
  }
}
```