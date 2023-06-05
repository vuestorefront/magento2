# useCart composable

`useCart` composable allows loading and manipulating cart of the current user.

The state of the cart is kept in [Pinia](https://pinia.vuejs.org/) Store and is accessible through `useCartStore()` composable.

We use Pinia store to keep the same state for Cart across the whole application. There is always one instance of cart no matter how many times you instantiate `useCart` composable.

## API
`useCart` composable returns the following properties:

- `load` - function that loads the current cart.
- `loadTotalQty` - function that pdates the global application state with the current total quantity of the cart.
- `addItem` - function that takes in a product and its quantity and adds it to the cart.
- `removeItem` - function that removes an item from a cart
- `updateItemQty` - function that updates the quantity of an item in a cart
- `clear` - function that removes all items from the cart
- `applyCoupon` - function that applies a coupon to the cart
- `removeCoupon` - function that removes a coupon from the cart
- `isInCart` - function that checks whether a product is in the cart
- `setCart` - function that sets the contents of the cart
- `canAddToCart` - function that checks whether a product can be added to the cart
- `cart` - returns the items in the cart as a `computed` property
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

type UseCartAddItemParams<PRODUCT> = ComposableFunctionArgs<{
  product: PRODUCT;
  quantity: number;
  productConfiguration?: { [key: string]: string };
}>;

type UseCartRemoveItemParams<CART_ITEM> = ComposableFunctionArgs<{
  product: CART_ITEM
}>;

type UseCartUpdateItemQtyParams<CART_ITEM> = ComposableFunctionArgs<{
  product: CART_ITEM
  quantity: number
}>;

type UseCartClearParams = ComposableFunctionArgs<{
  realCart?: boolean
}>;

type UseCartApplyCouponParams = ComposableFunctionArgs<{
  couponCode: string
}>;


interface UseCartInterface<CART, CART_ITEM, PRODUCT> {
  load(params?: ComposableFunctionArgs<{ realCart?: boolean }>): Promise<void>;
  loadTotalQty(): Promise<void>;
  addItem(
    params: UseCartAddItemParams<PRODUCT>
  ): Promise<void>;
  removeItem(params: UseCartRemoveItemParams< CART_ITEM>): Promise<void>;
  updateItemQty(params: UseCartUpdateItemQtyParams<CART_ITEM>): Promise<void>;
  clear(params: UseCartClearParams): Promise<void>;
  applyCoupon(params: UseCartApplyCouponParams): Promise<void>;
  removeCoupon(params: ComposableFunctionArgs<{}>): Promise<void>;
  isInCart(PRODUCT): boolean;
  setCart(newCart: CART): void;
  canAddToCart(product: Product, qty: number);
  cart: ComputedRef<CART>;
  loading: Readonly<Ref<boolean>>;
  error: Readonly<Ref<UseCartErrors>>;
}
```

## cartGetters

`cartGetters` is a set of helper functions that can be used to get data from the cart. They receive either product or cart object as a parameter and return the data from it.

### product parameter

- `getItemName` - returns the name of the item
- `getSlug` - returns the slug of the item
- `getItemImage` - returns the image of the item
- `getItemPrice` - returns object with the prices of the item:
  - `regular` - returns the regular price of the item
  - `special` - returns the special price of the item
  - `credit` - returns the credit price of the item
  - `discountPercentage` - returns the discount percentage of the item
  - `total` - returns the total price of the item 
- `productHasSpecialPrice` - returns whether the product has a special price
- `getItemQty` - returns the quantity of the item
- `getItemAttributes` - returns the attributes of the item
- `getItemSku` - returns the sku of the item
- `getConfiguredVariant` - returns the configured variant of the item
- `getStockStatus` - returns the stock status of the item

### cart parameter

- `getItems` - returns the items in the cart
- `getTotals` - returns object with the total cart prices:
  - `total` - returns the total price of the cart
  - `subtotal` - returns the subtotal price of the cart
  - `special` - returns the special price of the cart
- `getShippingPrice` - returns the shipping price of the cart
- `getTotalItems` - returns the total quantity of items in the cart
- `getCoupons` - returns the coupons applied to the cart
- `getDiscounts` - returns the discounts applied to the cart
- `getDiscountAmount` - returns the discount amount applied to the cart
- `getAppliedCoupon` - returns the applied coupon
- `getSelectedShippingMethod` - returns the selected shipping method
- `getAvailablePaymentMethods` - returns the available payment methods

## cartGetters usage

```ts
import cartGetters from '~/modules/checkout/getters/cartGetters';

const productName = cartGetters.getItemName(product);
const productSlug = cartGetters.getSlug(product);
const productImage = cartGetters.getItemImage(product);

const totalItemsInCart = cartGetters.getTotalItems(cart);
const cartItems = cartGetters.getItems(cart);
const cartCoupons = cartGetters.getCoupons(cart);
```

## Examples

### Adding items to the cart

Add item to the cart and disable the button if the product is out of stock:

```ts
<template>
  <div>
    <SfAddToCart
      v-model="qty"
      v-e2e="'product_add-to-cart'"
      :disabled="loading || !canAddToCart(product, qty)"
      class="product__add-to-cart"
    >
      <template #add-to-cart-btn>
        <SfButton
          class="sf-add-to-cart__button"
          :disabled="loading || !canAddToCart(product, qty)"
          @click="addItem({ product, quantity: parseInt(qty), productConfiguration })"
        >
          Add to cart
        </SfButton>
      </template>
    </SfAddToCart>
  </div>
</template>
<script lang="ts">
const { addItem, canAddToCart, loading } = useCart();

setup() {
  return {
    addToCart,
    canAddToCart,
    loading,
  };
}
</script>
```

### Loading cart
Load user's total quantity of items in the cart:

```ts
import { useCart } from '~/modules/checkout/composables/useCart';

const { loadTotalQty, cart } = useCart();

onMounted(async () => {
  await loadTotalQty();
  
  console.log(cart.value.total_quantity);
});
```

### Removing items from the cart

Load user's cart and handle removing items from the cart:

```ts
import { useCart } from '~/modules/checkout/composables/useCart';

const {
  cart,
  removeItem,
  updateItemQty,
  load,
} = useCart();

onMounted(() => {
  if (!cart.value.id) {
    loadCart();
  }
});

const products = computed(() => cartGetters
  .getItems(cart.value)
  .filter(Boolean)
  .map((item) => ({
    ...item,
    product: {
      ...item.product,
      ...[(item as ConfigurableCartItem).configured_variant ?? {}],
      original_sku: item.product.sku,
    },
  })));

const actionRemoveItem = async (product: CartItemInterface) => {
  await removeItem({ product });
  
  console.log(product + ' removed from cart');

  await updateItemQty({ product, quantity: 0 });
};
```

### Applying and removing coupons from the cart

Check if user applied a coupon to the cart and apply or remove it:

```ts
const {cart, applyCoupon, removeCoupon, error } = useCart();

const couponCodeUserInput = ref('');

const couponCodeAppliedToCart = computed(() => cartGetters.getAppliedCoupon(cart.value)?.code);
const isCouponCodeApplied = computed(() => couponCodeAppliedToCart.value !== undefined);

const applyOrRemoveCoupon = async () => {
  const operationPromise = isCouponCodeApplied.value
    ? removeCoupon({})
    : applyCoupon({ couponCode: couponCodeUserInput.value });

  await operationPromise;

  couponCodeUserInput.value = '';
};
```

