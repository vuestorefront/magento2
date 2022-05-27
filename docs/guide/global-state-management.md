# Global state management

For global state management, we decided to use the [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) library. We assume that only data needed in more than one place of the application should be kept globally. For example:

- store config
- categories used in navigation (different components for desktop and mobile)
- customer (user) data
- cart/checkout data

Data that is used in one place in the application should be stored locally in composables

## Difference between global and local state

An example of local state is when you download product data from Magento and display it . You need those products only in that one view. So you should keep that data contained locally only to that view.

On the other hand, some data should be accessible from more than one place in the app. Examples:

- cart - you fetch cart data so you can show its contents in the cart sidebar,  but also need cart data when  adding product to the cart from a product category page or a single product's page.
- UI state - information about global UI elements state (for example isOpen) like sidebars should be accessible globally.
- navigation - because of screen size limitations, certain UI elements use the same data, but display it in a different way. For example, when browsing the product category tree in our integration, the mobile category menu is a full page overlay, while on the desktop it's embedded in the page's top header. The mobile and desktop components are far away from each other in the application's structure, but thanks to global state they can get data from the same source.

## Pinia stores provided by Vue Storefront 2 for Magento integration

Take a look at stores provided by the integration OOTB:

- **Config store** - it provides information about available Magento stores, currency, and active store configuration
- **Category store** - it provides information about product categories
- **Customer store** - it provides information about the currently logged-in customer.  Initially, it contains a boolean flag that lets you know if there's a valid login session. If necessary, more detailed data (shipping, billing addresses etc.) are fetched.
- **Cart store** - it provides information about cart like items in cart, quantity and totals

## How to create a Pinia store

In the following example, I define a new store named `useWishlistStore`

```typescript
import { defineStore } from 'pinia';
import type { Wishlist } from '~/modules/GraphQL/types';

interface WishlistStore {
  wishlist: Wishlist[] | null
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistStore => ({
    wishlist: null,
  }),
});
```

The `useWishlistStore` has one state field: `wishlist` that is initially null.

### Cosuming data from Pinia store

Consuming data from the store is really straightforward. Basically you need to import it and use similarly as composable:

```typescript
import { useWishlistStore } from '~/stores/wishlistStore'

export default {
  setup() {
    const wishlistStore = useWishlistStore()

    return {
      // you can return the whole store instance to use it in the template
      wishlistStore
    }
  },
}
```

In case you want to return only **specific fields**, you need to wrap the field with `computed()`. If you don’t do that, reactivity will break.

```javascript
import { useWishlistStore } from '~/stores/wishlistStore'

export default {
  setup() {
    const { wishlist } = useWishlistStore();

    return {
      wishlistItems: computed(() => wishlist.items),
    }
  },
}
```

### Modifying data in Pinia store

To write data to the store we recommend using $patch like this:

```javascript
const { data } = await app.$vsf.$magento.api.wishlist();
  wishlistStore.$patch((state) => {
    state.wishlist = data.data?.customer?.wishlists ?? [];
  });
```

## How to use API in Pinia stores

If you want to communicate with an API directly in store it’s possibly by using the
$graphql Nuxt plugin. To do so you need to define a new action in store,
let’s define the `load` action that use the graphql plugin to fetch data from the API.

GraphQL plugin is accessible by the `this` keyword. It provides two objects: `query` (for getting data)and `mutate` (for saving data).

They `query` and `mutate` objects provides the request method that receives GraphQL query as and argument and the mutate method receive a GraphQL mutation as an argument.

The request method returns a **Promise**.

Take a look at the example:

```javascript
import { defineStore } from 'pinia';
import type { Wishlist } from '~/modules/GraphQL/types';
import wishlistGql from "./categoryList.gql";

interface WishlistStore {
  wishlist: Wishlist[] | null
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistStore => ({
    wishlist: null,
  }),
  actions: {
    async load() {
      const response = await this.$nuxt.$graphql.query.request<{ wishlist: Wishlist }>(wishlistGql);
      this.wishlist = response.wishlist;
    },
  },
});
```

The `wishlistGql` is the GraphQL query and can looks like this:

```javascript
import { gql } from 'graphql-request';

export default gql`
  query wishlist {
    customer {
      wishlists {
        id
        items_count
      }
    }
  }
`;
```

When you want to use the load action from the example above in a component you can do something like this:

```javascript
import { useWishlistStore } from '~/stores/wishlistStore'

export default {
  setup() {
    const wishlistStore = useWishlistStore()
    const wishlist = computed(() => wishlistStore.wishlist);

    onMounted(() => {
      wishlistStore.load(); // loading wishlist
    });

    return {
      wishlist,
    }
  },
}
```
