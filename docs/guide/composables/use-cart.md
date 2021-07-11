# useCart

## Features
`useCart` composable can be used to:
* load cart information,
* add, update and remove items in the cart,
* applying and removing coupons,
* checking if product is already added to the cart.

## API
```typescript
interface UseCart<Cart, CartItem, Product, Coupon> {
  cart: ComputedProperty<Cart>;
  setCart(cart: Cart): void;
  addItem(params: {
    product: Product;
    quantity: number;
    customQuery?: CustomQuery;
  }): Promise<void>;
  isInCart: ({ product: Product }: {
    product: any;
  }) => boolean;
  removeItem(params: {
    product: CartItem;
    customQuery?: CustomQuery;
  }): Promise<void>;
  updateItemQty(params: {
    product: CartItem;
    quantity?: number;
    customQuery?: CustomQuery;
  }): Promise<void>;
  clear(): Promise<void>;
  applyCoupon(params: {
    couponCode: string;
    customQuery?: CustomQuery;
  }): Promise<void>;
  removeCoupon(params: {
    coupon: Coupon;
    customQuery?: CustomQuery;
  }): Promise<void>;
  load(): Promise<void>;
  load(params: {
    customQuery?: CustomQuery;
  }): Promise<void>;
  error: ComputedProperty<UseCartErrors>;
  loading: ComputedProperty<boolean>;
}

export interface Cart {
  /**
   * An array of coupons that have been applied to the cart
   * @deprecated Use applied_coupons instead
   */
  applied_coupon?: Maybe<AppliedCoupon>;
  /** An array of `AppliedCoupon` objects. Each object contains the `code` text attribute, which specifies the coupon code */
  applied_coupons?: Maybe<Array<Maybe<AppliedCoupon>>>;
  /** Available payment methods */
  available_payment_methods?: Maybe<Array<Maybe<AvailablePaymentMethod>>>;
  billing_address?: Maybe<BillingCartAddress>;
  email?: Maybe<Scalars['String']>;
  /** The entered gift message for the cart */
  gift_message?: Maybe<GiftMessage>;
  /** The unique ID for a `Cart` object */
  id: Scalars['ID'];
  is_virtual: Scalars['Boolean'];
  items?: Maybe<Array<Maybe<CartItemInterface>>>;
  prices?: Maybe<CartPrices>;
  selected_payment_method?: Maybe<SelectedPaymentMethod>;
  shipping_addresses: Array<Maybe<ShippingCartAddress>>;
  total_quantity: Scalars['Float'];
}

export interface CartItem {
  prices?: Maybe<CartItemPrices>;
  product: ProductInterface;
  quantity: Scalars['Float'];
  /** The unique ID for a `CartItemInterface` object */
  uid: Scalars['ID'];
}

export interface Coupon {
  code: Scalars['String'];
}

```
> For more information on [Product interface](use-product) visit the dedicated documentation.


### `cart`
Returns the Items in the Cart as a `computed` property

### `setCart`
set new Cart

### `addItem`
Function that takes in a `product` and its `quantity` and adds it to the cart

### `isInCart`
Function that takes in a `product` and returns `true` or `false`

### `removeItem`
Function that takes in a `product` and removes it from the `cart`

### `updateItemQty`
Function that takes in a `product` and its new `quantaty` and updates it accordingly

### `clear`
Function that clears cart

### `applyCoupon`
Function that takes in a `coupon` and applies it to the cart

### `removeCoupon`
Function that removes all applied coupons

### `load`
Function that loads the current `cart`

### `error`
reactive object containing the error message, if some properties failed for any reason.

### `loading`
a reactive object containing information about loading state of the cart.


## Getters

````typescript
interface CartGetters<Cart, CartItem> {
    getItems: (cart: Cart) => CartItem[];
    getItemName: (cartItem: CartItem) => string;
    getItemImage: (cartItem: CartItem) => string;
    getItemPrice: (cartItem: CartItem) => AgnosticPrice;
    getItemQty: (cartItem: CartItem) => number;
    getItemAttributes: (
      cartItem: CartItem,
      _filterByAttributeName?: Array<string>,
    ) => Record<string, AgnosticAttribute | string>;
    getItemSku: (cartItem: CartItem) => string;
    getTotals: (cart: Cart) => AgnosticTotals;
    getShippingPrice: (cart: Cart) => number;
    getTotalItems: (cart: Cart) => number;
    getFormattedPrice: (price: number) => string;
    getCoupons: (cart: Cart) => AgnosticCoupon[];
    getDiscounts: (cart: Cart) => AgnosticDiscount[];
}
````

* `getItems` - returns all items from cart.
* `getItemName` - returns product name.
* `getItemImage` - returns product image.
* `getItemPrice` - returns product price.
* `getItemQty` - returns product quantity.
* `getItemAttributes` - returns product attribute.
* `getItemSku` - returns product SKU.
* `getTotals` - returns cart totals.
* `getShippingPrice` - returns current shipping price.
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
