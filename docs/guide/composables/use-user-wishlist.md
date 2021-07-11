# useWishlist

`useWishlist` composable is responsible, for integrating with wishlist from Commercetools. It allows to:
* fetch products from wishlist
* add products to wishlist
* remove products from wishlist
* check if product is on wishlist

## API 
```typescript
 interface UseWishlist<WISHLIST, WISHLIST_ITEM, PRODUCT> {
  wishlist: ComputedProperty<WISHLIST>;
  loading: ComputedProperty<boolean>;
  addItem(params: {
    product: PRODUCT;
    customQuery?: CustomQuery;
  }): Promise<void>;
  removeItem(params: {
    product: WISHLIST_ITEM;
    customQuery?: CustomQuery;
  }): Promise<void>;
  load(): Promise<void>;
  load(params: {
    customQuery?: CustomQuery;
  }): Promise<void>;
  clear(): Promise<void>;
  setWishlist: (wishlist: WISHLIST) => void;
  isOnWishlist({ product: PRODUCT }: {
    product: any;
  }): boolean;
  error: ComputedProperty<UseWishlistErrors>;
}
```

* `wishlist` - a main data object.
* `load` - function used to retrieve wishlist products. When invoked, it requests data from the API and populates wishlist property. This method accepts a single params object.
* `addItem` - function used to add new product to wishlist. When invoked, it submits data to the API and populates wishlist property with updated information. This method accepts a single params object.
* `removeItem` - function that removes products from the wishlist. It submits data to the API and populates updated wishlist property. This method accepts a single params object.
* `clear` - function that removes all products from the wishlist and populates clear wishlist property.
* `isOnWishlist` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single params object.
* `loading` - function that checks if product is on the wishlist. It returns boolean value. This method accepts a single params object.
* `error` - reactive object containing the error message, if some properties failed for any reason.

## Getters
> WIP

````typescript
interface WishlistGetters<WISHLIST, WISHLIST_ITEM> {
    getItems: (wishlist: WISHLIST) => WISHLIST_ITEM[];
    getItemName: (wishlistItem: WISHLIST_ITEM) => string;
    getItemImage: (wishlistItem: WISHLIST_ITEM) => string;
    getItemPrice: (wishlistItem: WISHLIST_ITEM) => AgnosticPrice;
    getItemAttributes: (wishlistItem: WISHLIST_ITEM, filters?: Array<string>) => Record<string, AgnosticAttribute | string>;
    getItemSku: (wishlistItem: WISHLIST_ITEM) => string;
    getTotals: (wishlist: WISHLIST) => AgnosticTotals;
    getTotalItems: (wishlist: WISHLIST) => number;
    getFormattedPrice: (price: number) => string;
    [getterName: string]: (element: any, options?: any) => unknown;
}
````
* `getItems` - returns list of products on wishlist
* `getItemName` - returns product's name from wishlist.
* `getItemImage` - returns product's image from wishlist.
* `getItemPrice` - returns product's price from wishlist.
* `getItemQty` - returns quantity of product which is on wishlist.
* `getItemAttributes` - returns product variant attribute chosen by its name.
* `getItemSku` - returns product's SKU code.
* `getTotals` - returns price of products.
* `getTotalItems` - returns amount of all items that are currently on wishlist.
* `getFormattedPrice` - returns price in formatted manner taking into account local specifics.

## Example

```javascript
import { onSSR } from '@vue-storefront/core';
import { useWishlist, wishlistGetters } from '@vue-storefront/magento';
export default {
  setup() {
    const { load: loadWishlist } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems());

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await loadWishlist();
    });

    return {
      loadWishlist,
      wishlistItems
    };
  }
};
```
