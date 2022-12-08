import { ComputedRef, Ref } from '@nuxtjs/composition-api';
import {
  BundleCartItem,
  CartItemInterface,
  ConfigurableCartItem, ProductInterface,
  SelectedBundleOption,
  SelectedConfigurableOption,
} from '~/modules/GraphQL/types';
import {
  ComposableFunctionArgs,
  ImageSizes,
  Totals,
} from '~/composables';
import { CartGetters } from '~/modules/checkout/getters/cartGetters';

type UseCartViewDelayedUpdateItemQtyParams = ComposableFunctionArgs<{
  product: CartItemInterface;
  quantity: number;
}>;

/**
 * Data and methods returned from the {@link useCartView} composable
 */
export interface UseCartViewInterface {
  /** Shows a remove item modal and sets the `itemToRemove` */
  showRemoveItemModal(params: { product: CartItemInterface }): void,
  /** Removes an item from the Cart and shows a notification */
  removeItemAndSendNotification(product: CartItemInterface): Promise<void>,
  /** Updates the quantity of an item in the Cart with a delay */
  delayedUpdateItemQty(params: UseCartViewDelayedUpdateItemQtyParams): Promise<void>,
  /** Redirects to the checkout page */
  goToCheckout(): Promise<void>,
  /** Gets configurable options from the item */
  getAttributes(product: ConfigurableCartItem): SelectedConfigurableOption[],
  /** Gets a list of products that represent the values of the parent option */
  getBundles(product: BundleCartItem): SelectedBundleOption['values'],
  /** Checks if an item is in stock or not */
  isInStock(product: CartItemInterface): boolean,
  /** Extracts an image path from Magento URL. */
  getMagentoImage(fullImageUrl: string): string,
  /** Get a product path from url_rewrites or url_key */
  getProductPath(product: ProductInterface): string,
  /** Indicates whether any of the {@link useCart} composable methods is in progress. */
  loading: Readonly<Ref<boolean>>;
  /** Indicates whether the customer is authenticated or not */
  isAuthenticated: ComputedRef<boolean>,
  /** Returns the Items in the Cart */
  products: ComputedRef<CartItemInterface[]>,
  /** Indicates whether a remove item modal is visible or not */
  isRemoveModalVisible: Ref<boolean>,
  /** Returns a removable item */
  itemToRemove: Ref<CartItemInterface>,
  /** Returns total prices in the Cart */
  totals: ComputedRef<Totals>,
  /** Returns a total items count in the Cart */
  totalItems: ComputedRef<number>,
  /** Available image sizes */
  imageSizes: ImageSizes,
  /** Returns a cart discount amount */
  discount: ComputedRef<number>,
  /** Methods returned from the {@link CartGetters} cartGetters */
  cartGetters: CartGetters,
}
