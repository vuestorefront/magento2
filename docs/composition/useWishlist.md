# `useWishlist`


`useWishlist` composable is responsible for integrating with a wishlist from Magento. 

The state of the wishlist is kept in [Pinia](https://pinia.vuejs.org/) Store and is accessible through `useWishlistStore()` composable.

We use Pinia store to keep the same state for Wishlist across the whole application. There is always one instance of wishlist no matter how many times you instantiate `useWishlist` composable.

## Features

`useWishlist` returns following properties:
- `loadItemsCount` -  fetches the number of items on wishlist for the current user and saves it to the Pinai store.
- `isInWishlist` - checks if a given product is already in wishlist
- `addItem` - Adds product to the wishlist for the current user
- `load` - Fetches wishlist of the current customer and saves to the wishlist store
- `removeItem` - Removes item from the wishlist for the current user.
- `clear` - Removes all items from wishlist for the current user.
- `setWishlist` - Overrides the wishlist of the current user.
- `afterAddingWishlistItemToCart` - Run it after adding a product from the wishlist to the cart to remove it from the wishlist and trigger in-app notification.
- `addOrRemoveItem` - Adds item to the wishlist if is not already added, otherwise remove it from the wishlist.
-  `loading` - Indicates whether any of the methods is in progress.
-   `error` - Contains errors from any of the composable methods.

## Interfaces

```ts
/**
 * Almost every method is extending this type
 */
export declare type ComposableFunctionArgs<T> = T & {
  customQuery?: CustomQuery;
  customHeaders?: CustomHeaders;
};

export interface UseWishlistErrors {
  addItem: Error | null;
  removeItem: Error | null;
  load: Error | null;
  clear: Error | null;
  loadItemsCount: Error | null;
  afterAddingWishlistItemToCart: Error | null,
}

export type UseWishlistLoadItemsCountParams = ComposableFunctionArgs<{}>;

export type UseWishlistIsInWishlistParams = { product: Product };

export type UseWishlistAddItemParams = ComposableFunctionArgs<{
  product: Product;
}>;

export type UseWishlistLoadParams = ComposableFunctionArgs<{
  searchParams?: Partial<{
    currentPage: number;
    pageSize: number;
  }>
}>;

export type UseWishlistRemoveItemParams = ComposableFunctionArgs<{
  product: Product;
}>;

export type UseWishlistClearParams = {
  currentWishlist: Wishlist;
};

export type UseWishlistAfterAddingWishlistItemToCartParams = ComposableFunctionArgs<{
  product: Product;
  cartError: Error;
}>;

export interface UseWishlistInterface {
  loadItemsCount(): Promise<number | null>;
  isInWishlist(params: UseWishlistIsInWishlistParams): boolean;
  addItem(params: UseWishlistAddItemParams): Promise<void>;
  load(params?: UseWishlistLoadParams): Promise<Wishlist>;
  removeItem(params: UseWishlistRemoveItemParams): Promise<void>;
  clear(params: UseWishlistClearParams): Promise<any>;
  setWishlist(newWishlist: Wishlist): void;
  afterAddingWishlistItemToCart(params): UseWishlistAfterAddingWishlistItemToCartParams): void;
  addOrRemoveItem(params: UseWishlistAddItemParams): Promise<void>;
  loading: Readonly<Ref<boolean>>;
  error: DeepReadonly<Ref<UseWishlistErrors>>;
}
```

## Example

Below we can see part of the code from the `AppHeader.vue` component. Let's break it down to understand how to use `useWishlist` composable.

```typescript
import {
  computed,
  ref,
  defineComponent,
  onMounted,
} from '@nuxtjs/composition-api';

import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { useWishlistStore } from '~/modules/wishlist/store/wishlistStore';

export default defineComponent({
  setup() {
    const { loadItemsCount } = useWishlist();

    const wishlistStore = useWishlistStore();
    const wishlistItemsQty = computed(() => wishlistStore.wishlist?.items_count ?? 0);
    const wishlistHasProducts = computed(() => wishlistItemsQty.value > 0);

    onMounted(async () => {
        await loadItemsCount();
    });

    return {
      wishlistHasProducts,
      wishlistItemsQty,
    };
  },
});
```

The above code does following things:

```js
const { loadItemsCount } = useWishlist();
```
1. First we are calling `useWishlist` composable that returns a function called `loadItemsCount`. As the name suggests it returns a number of items in the wishlist.
```js
const wishlistStore = useWishlistStore();
```
2. Next we are calling `useWishlistStore`. The store is used by `useWishlist` under the hood to keep the wishlist state. It synchronizes with the backend automatically when you performa any add/remove operations through `useWishlist` composable. 
```js
const wishlistItemsQty = computed(() => wishlistStore.wishlist?.items_count ?? 0);
const wishlistHasProducts = computed(() => wishlistItemsQty.value > 0); 
```
3. We used computed properties to keep the extracted properties in sync with the application state. If you change the state through any of `useWishlist` methods, the computed properties will update automatically.
```js
onMounted(async () => {
    await loadItemsCount();
});
```
4. At the very end we call `loadItemsCount()` function that populates the `wishlistStore.wishlist.items_count` value with the amount of items in the wishlist. We are using `onMounted` hook instead of `useFetch` to fetch the wishlist data only on the frontend. This way the cached SSR response will not contain the data specific to a certain user ([read more on that](https://dev.to/vue-storefront/how-to-deal-with-caching-and-dynamic-content-2ilk))


## Getters

- `getItems` - returns list of products on the wishlist

- `getItemName` - returns product's name from the wishlist.

- `getItemImage` - returns product's image from the wishlist.

- `getItemPrice` - returns product's price from the wishlist.

- `getItemQty` - returns a quantity of product which is on the wishlist.

- `getItemAttributes` - returns product variant attribute chosen by its name.

- `getItemSku` - returns product's SKU code.

- `getTotals` - returns price of products.

- `getTotalItems` - returns an amount of all items that are currently on the wishlist.

- `getFormattedPrice` - returns price in a formatted manner, taking into account local specifics.


