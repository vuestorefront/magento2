# useConfig composable

`useConfig` composable allows interacting with the store configuration.

## API
`useConfig` composable returns the following properties:

- `load` - function that loads store configuration
- `config` - ref that contains store configuration
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

Get store configuration and use it to retrieve logo information:

```ts
import { useConfig } from '~/composables';

const { config } = useConfig();

const logoSrc = computed(() => {
  const baseMediaUrl = config.value.base_media_url;
  const logo = config.value.header_logo_src;

  return baseMediaUrl && logo ? `${baseMediaUrl}logo/${logo}` : '';
});

const logoWidth = computed(
  () => config.value.logo_width || '35',
);

const logoHeight = computed(
  () => config.value.logo_height || '34',
);

const logoAlt = computed(
  () => config.value.logo_alt || '',
 ```