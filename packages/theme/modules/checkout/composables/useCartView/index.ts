/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  computed,
  ref,
  useRouter,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api';
import { debounce } from 'lodash-es';
import cartGetters from '~/modules/checkout/getters/cartGetters';
import {
  useUiNotification,
  useExternalCheckout,
  useImage,
  useProduct,
} from '~/composables';
import { useCart } from '~/modules/checkout/composables/useCart';
import { useUser } from '~/modules/customer/composables/useUser';
import type { UseCartViewInterface } from '~/modules/checkout/composables/useCartView/useCartView';
import type { ConfigurableCartItem, BundleCartItem, CartItemInterface } from '~/modules/GraphQL/types';
import { ProductStockStatus } from '~/modules/GraphQL/types';

/**
 * Allows loading and manipulating cart view.
 *
 * See the {@link UseCartViewInterface} for a list of methods and values available in this composable.
 */
export function useCartView(): UseCartViewInterface {
  const { localePath, app: { i18n } } = useContext();
  const { initializeCheckout } = useExternalCheckout();
  const { getMagentoImage, imageSizes } = useImage();
  const router = useRouter();
  const { getProductPath } = useProduct();
  const {
    cart,
    removeItem,
    updateItemQty,
    load: loadCart,
    loading,
  } = useCart();
  const { isAuthenticated } = useUser();
  const { send: sendNotification, notifications } = useUiNotification();

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
  const totals = computed(() => cartGetters.getTotals(cart.value));
  const discount = computed(() => -cartGetters.getDiscountAmount(cart.value));
  const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
  const getAttributes = (product: ConfigurableCartItem) => product.configurable_options || [];
  const getBundles = (product: BundleCartItem) => product.bundle_options?.map((b) => b.values).flat() || [];
  const isRemoveModalVisible = ref(false);
  const itemToRemove = ref<CartItemInterface>();

  onMounted(() => {
    if (!cart.value.id) {
      loadCart();
    }
  });

  const goToCheckout = async () => {
    const redirectUrl = initializeCheckout({ baseUrl: '/checkout/user-account' });
    await router.push(localePath(redirectUrl));
  };

  const showRemoveItemModal = ({ product }: { product: CartItemInterface }) => {
    if (notifications.value.length > 0) {
      notifications.value[0].dismiss();
    }

    isRemoveModalVisible.value = true;
    itemToRemove.value = product;
  };

  const removeItemAndSendNotification = async (product: CartItemInterface) => {
    await removeItem({ product });
    isRemoveModalVisible.value = false;

    sendNotification({
      id: Symbol('product_removed'),
      message: i18n.t('{0} has been successfully removed from your cart', {
        0: cartGetters.getItemName(
          product,
        ),
      }) as string,
      type: 'success',
      icon: 'check',
      persist: false,
      title: 'Product removed',
    });
  };

  const delayedUpdateItemQty = debounce(
    (params) => updateItemQty(params),
    1000,
  );

  const isInStock = (product: CartItemInterface) => cartGetters.getStockStatus(product) === ProductStockStatus.InStock;

  return {
    showRemoveItemModal,
    removeItemAndSendNotification,
    delayedUpdateItemQty,
    goToCheckout,
    getAttributes,
    getBundles,
    isInStock,
    getMagentoImage,
    getProductPath,
    loading,
    isAuthenticated,
    products,
    isRemoveModalVisible,
    itemToRemove,
    totals,
    totalItems,
    imageSizes,
    discount,
    cartGetters,
  };
}

export default useCartView;
export * from './useCartView';
