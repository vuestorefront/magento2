# useCart

## Features
`useCart` composable can be used to:
* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API
```typescript
interface UseCart<CART, CART_ITEM, PRODUCT, COUPON> {
  cart: ComputedProperty<CART>;
  setCart(cart: CART): void;
  addItem(params: {
    product: PRODUCT;
    quantity: number;
    customQuery?: CustomQuery;
  }): Promise<void>;
  isInCart: ({ product: PRODUCT }: {
    product: any;
  }) => boolean;
  removeItem(params: {
    product: CART_ITEM;
    customQuery?: CustomQuery;
  }): Promise<void>;
  updateItemQty(params: {
    product: CART_ITEM;
    quantity?: number;
    customQuery?: CustomQuery;
  }): Promise<void>;
  clear(): Promise<void>;
  applyCoupon(params: {
    couponCode: string;
    customQuery?: CustomQuery;
  }): Promise<void>;
  removeCoupon(params: {
    coupon: COUPON;
    customQuery?: CustomQuery;
  }): Promise<void>;
  load(): Promise<void>;
  load(params: {
    customQuery?: CustomQuery;
  }): Promise<void>;
  error: ComputedProperty<UseCartErrors>;
  loading: ComputedProperty<boolean>;
}
```

* `cart` - Returns the Items in the Cart as a `computed` property
* `setCart` - set new Cart
* `addItem` - Function that takes in a `product` and its `quantaty` and adds it to the cart
* `isOnCart` - Function that takes in a `product` and returns `true` or `false`
* `removeItem` - Function that takes in a `product` and removes it from the `cart`
* `updateItemQty` - Function that takes in a `product` and its new `quantaty` and updates it accordingly
* `clear` - Function that clears cart
* `applyCoupon` - Function that takes in a `coupon` and applies it to the cart
* `removeCoupon` - Function that removes all applied coupons
* `load` - Function that loads the current `cart`
* `error` - reactive object containing the error message, if some properties failed for any reason.
* `loading` - a reactive object containing information about loading state of the cart.

## Getters

```typescript
interface CartGetters<CART, CART_ITEM> {
    getItems: (cart: CART) => CART_ITEM[];
    getItemName: (cartItem: CART_ITEM) => string;
    getItemImage: (cartItem: CART_ITEM) => string;
    getItemPrice: (cartItem: CART_ITEM) => AgnosticPrice;
    getItemQty: (cartItem: CART_ITEM) => number;
    getItemAttributes: (
      cartItem: CART_ITEM,
      _filterByAttributeName?: Array<string>,
    ) => Record<string, AgnosticAttribute | string>;
    getItemSku: (cartItem: CART_ITEM) => string;
    getTotals: (cart: CART) => AgnosticTotals;
    getShippingPrice: (cart: CART) => number;
    getTotalItems: (cart: CART) => number;
    getFormattedPrice: (price: number) => string;
    getCoupons: (cart: CART) => AgnosticCoupon[];
    getDiscounts: (cart: CART) => AgnosticDiscount[];
}
```

* `getTotals` - returns cart totals.
* `getShippingPrice` - returns current shipping price.
* `getItems` - returns all items from cart.
* `getItemName` - returns product name.
* `getItemImage` - returns product image.
* `getItemPrice` - returns product price.
* `getItemQty` - returns product quantity.
* `getItemAttributes` - returns product attribute.
* `getItemSku` - returns product SKU.
* `getTotalItems` - returns products amount.
* `getFormattedPrice` - returns product price with currency sign.
* `getCoupons` - returns applied coupons.
* `getDiscounts` - returns all discounts.

## Example

```javascript
import { useCart, cartGetters } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { cart, removeItem, updateItemQty, load } = useCart();

    onSSR(async () => {
      await load();
    })

    return {
      removeItem,
      updateItemQty,
      products: computed(() => cartGetters.getItems(cart.value)),
      totals: computed(() => cartGetters.getTotals(cart.value)),
      totalItems: computed(() => cartGetters.getTotalItems(cart.value))
    }
  }
}
```
