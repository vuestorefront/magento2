# useRouter

`useRouter` composition API function is responsible, as its name suggests, for interactions with the routes in your eCommerce. This function returns following values:

## API
```typescript
interface UseRouter {
  search: (url: string) => Promise<void>; 
  route: Readonly<Ref<Readonly<Page>>>; 
  loading: Readonly<Ref<Readonly<boolean>>>;
}
```

* `search` - Function that takes in a `url` and fills the `route` property
* `route` - Returns the current Page
* `loading` - Returns state of `search`

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useRouter } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';

export default {
  setup(props, context) {
    const {
      path
    } = context.root.$route;
    const {
      loading,
      search,
      route
    } = useRouter('router:' + path);
    onSSR(async () => {
      await search(path);
      if (route.value.data.urlResolver === null) {
        context.root.$nuxt.error({
          statusCode: 404,
          message: 'Page not found'
        });
      }
    });

    const routeType = computed(() => {
      if (loading.value || route.value.data.urlResolver === null) {
        return {};
      }
      return route.value.data.urlResolver;
    });

    return {
      loading,
      routeType
    };
  }
};
```
