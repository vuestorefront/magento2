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
interface UseConfigInterface {
  config: ComputedRef<StoreConfig>,
  loading: DeepReadonly<Ref<boolean>>,
  load(): Promise<void>
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