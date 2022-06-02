# Global state management

We use the [Pinia](https://pinia.vuejs.org/ssr/nuxt.html) for global state management. However, to make the application performant and easy to work with, we use it only to store a specific set of data.

This document describes what data we store inside the global state and how we do it.

## Local and global state

Before we can dive deeper into the details, we need to answer one key question - what is the difference between global and local states?

**Local state** is the state loaded and available only in one view. It might be a single component or group of components that share the data using component props. An example could be product information loaded from the API because you likely only need this data on one page.

**Global state** is the state re-used across multiple views or components that are not directly related. This includes, but is not limited to:

- store configuration,
- categories in the navigation,
- customer (user) data,
- cart and checkout data.

## Pinia stores

Let's look at stores available out of the box:

- **Config store** - provides information about available Magento stores, currency, and active store configuration.
- **Category store** - provides information about product categories.
- **Customer store** - provides information about the currently logged-in customer. Initially, it contains a boolean flag that indicates if there's a valid login session. The application loads more detailed data (shipping, billing addresses, etc.) if necessary.
- **Cart store** - provides information about the cart, such as added items, quantity, and totals

## How to create a store

In the following example, we define a new store named `useWishlistStore`.

```typescript
import { defineStore } from 'pinia';
import type { Wishlist } from '~/modules/GraphQL/types';

interface WishlistStore {
  wishlist: Wishlist[] | null;
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): WishlistStore => ({
    wishlist: null,
  }),
});
```

The `useWishlistStore` has one state field: `wishlist` that is initially `null`.

### Consuming data from the store

Consuming data from the store is straightforward. All you need to do is to import it and use it similarly to composables:

```typescript
import { useWishlistStore } from '~/stores/wishlistStore';

export default {
  setup() {
    const wishlistStore = useWishlistStore();

    return {
      // you can return the whole store instance to use it in the template
      wishlistStore
    };
  },
}
```

If you want to return a specific set of fields, you need to wrap the field with `computed()`. If you don’t do that, reactivity will break.

```javascript
import { useWishlistStore } from '~/stores/wishlistStore';

export default {
  setup() {
    const { wishlist } = useWishlistStore();

    return {
      wishlistItems: computed(() => wishlist.items),
    };
  },
}
```

### Modifying data in the store

To write data to the store, we recommend using $patch like this:

```javascript
const { data } = await app.$vsf.$magento.api.wishlist();
  wishlistStore.$patch((state) => {
    state.wishlist = data.data?.customer?.wishlists ?? [];
  });
```

## How to call the API in the store

If you want to communicate with an API directly from the store, you need to use the `$graphql` Nuxt plugin accessible in the `this` keyword. It provides two objects:

- The `query` object for fetching data. It contains the `request` method that accepts GraphQL query as an argument.
- The `mutate` for submitting data. It contains the `mutate` method that accepts a GraphQL mutation as an argument

Both methods return a **Promise**.

Let's see an example in which we define a new `load` action in the store:

```javascript
import { defineStore } from 'pinia';
import type { Wishlist } from '~/modules/GraphQL/types';
import wishlistGql from "./categoryList.gql";

interface WishlistStore {
  wishlist: Wishlist[] | null;
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

The `wishlistGql` is the GraphQL query that can look like this:

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

When you want to use the `load` action from the example above in a component, you can do it like so:

```javascript
import { useWishlistStore } from '~/stores/wishlistStore';

export default {
  setup() {
    const wishlistStore = useWishlistStore();
    const wishlist = computed(() => wishlistStore.wishlist);

    onMounted(() => {
      wishlistStore.load(); // loading wishlist
    });

    return {
      wishlist,
    };
  },
}
```
