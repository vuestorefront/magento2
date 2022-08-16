<template>
  <div id="cart">
    <div class="container">
      <SfBreadcrumbs
        :breadcrumbs="breadcrumbs"
        class="breadcrumbs"
        data-testid="breadcrumbs"
      />
      <div
        key="my-cart"
        class="my-cart"
      >
        <div class="content">
          <SfLoader :loading="loading">
            <transition
              name="sf-fade"
              mode="out-in"
            >
              <div v-if="totalItems">
                <div class="collected-product-list">
                  <transition-group
                    name="sf-fade"
                    tag="div"
                  >
                    <SfCollectedProduct
                      v-for="(product, productIndex) in products"
                      :key="product.product.original_sku + productIndex"
                      :has-more-actions="false"
                      data-testid="cart-sidebar-collected-product"
                      :image="getItemImage(product)"
                      :title="getItemName(product)"
                      :regular-price="
                        $fc(getItemPrice(product).regular)
                      "
                      :special-price="
                        productHasSpecialPrice(product)
                          ? getItemPrice(product).special &&
                            $fc(getItemPrice(product).special)
                          : ''
                      "
                      :link="localePath(getProductPath(product.product))"
                      class="collected-product"
                      @input="delayedUpdateItemQty({ product, quantity: $event })"
                      @click:remove="sendToRemove({ product })"
                    >
                      <template #image>
                        <SfImage
                          image-tag="nuxt-img"
                          :src="getMagentoImage(getItemImage(product))"
                          :alt="getItemName(product)"
                          :width="imageSizes.cart.imageWidth"
                          :height="imageSizes.cart.imageHeight"
                          class="sf-collected-product__image"
                          :nuxt-img-config="{
                            fit: 'cover',
                          }"
                        />
                      </template>
                      <template #input>
                        <div
                          v-if="isInStock(product)"
                          class="sf-collected-product__quantity-wrapper"
                        >
                          <SfQuantitySelector
                            :disabled="loading"
                            :qty="getItemQty(product)"
                            class="sf-collected-product__quantity-selector"
                            @input="delayedUpdateItemQty({ product, quantity: $event })"
                          />
                        </div>
                        <SfBadge
                          v-else
                          class="color-danger sf-badge__absolute"
                        >
                          <template #default>
                            <span>{{ $t('Out of stock') }}</span>
                          </template>
                        </SfBadge>
                      </template>
                      <template #configuration>
                        <div
                          v-if="getAttributes(product).length > 0"
                          data-testid="cart-sidebar-attribute-container"
                        >
                          <SfProperty
                            v-for="(attr, index) in getAttributes(product)"
                            :key="index"
                            :name="attr.option_label"
                            :value="attr.value_label"
                          />
                        </div>
                        <div
                          v-if="getBundles(product).length > 0"
                          data-testid="cart-sidebar-bundle-container"
                        >
                          <SfProperty
                            v-for="(bundle, i) in getBundles(product)"
                            :key="i"
                            :name="`${bundle.quantity}x`"
                            :value="bundle.label"
                          />
                        </div>
                      </template>
                    </SfCollectedProduct>
                  </transition-group>
                </div>
              </div>
              <div
                v-else
                key="empty-cart"
                class="empty-cart"
              >
                <div class="empty-cart__banner">
                  <SvgImage
                    icon="empty_cart_image"
                    :label="$t('Empty bag')"
                    width="211"
                    height="143"
                    class="empty-cart__image"
                  />
                  <SfHeading
                    :title="$t('Your cart is empty')"
                    :level="2"
                    class="empty-cart__heading"
                    :description="
                      $t(
                        'Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.'
                      )
                    "
                  />
                  <SfButton
                    class="sf-button--full-width color-primary"
                    data-testid="cart-sidebar-back"
                    @click="handleHomeClick"
                  >
                    {{ $t('Go back shopping') }}
                  </SfButton>
                </div>
              </div>
            </transition>
          </SfLoader>
        </div>
        <div
          v-if="totalItems"
          class="sidebar"
        >
          <SfProperty
            v-if="totalItems"
            class="sf-property--large cart-summary desktop-only"
            data-testid="cart-summary"
            :name="$t('Total items')"
            :value="totalItems"
          />
          <transition name="sf-fade">
            <div>
              <SfProperty
                v-if="totals.subtotal !== totals.total"
                :name="$t('Subtotal')"
                class="sf-property--full-width sf-property--small"
              >
                <template #value>
                  <SfPrice
                    :regular="$fc(totals.subtotal)"
                    class="my-cart__subtotal-price"
                  />
                </template>
              </SfProperty>
              <SfProperty
                v-if="discount"
                :name="$t('Discount')"
                class="sf-property--full-width sf-property--small"
              >
                <template #value>
                  <SfPrice
                    :regular="$fc(discount)"
                    class="my-cart__discount"
                  />
                </template>
              </SfProperty>
              <hr class="sf-divider">
              <SfProperty
                :name="$t('Order Total')"
                class="sf-property--full-width sf-property--large my-cart__total-price"
              >
                <template #value>
                  <SfPrice
                    data-testid="cart-sidebar-total"
                    :regular="$fc(totals.total)"
                  />
                </template>
              </SfProperty>
              <CouponCode />
              <a @click="goToCheckout">
                <SfButton
                  v-e2e="'go-to-checkout-btn'"
                  data-testid="category-sidebar-go-to-checkout"
                  class="sf-button--full-width color-secondary"
                >
                  {{ $t('Go to checkout') }}
                </SfButton>
              </a>
            </div>
          </transition>
        </div>
      </div>
      <transition
        name="sf-collapse-top"
        mode="out-in"
      >
        <div class="notifications">
          <SfNotification
            v-if="!loading"
            :visible="visible"
            :title="$t('Are you sure?')"
            :message="$t('Are you sure you would like to remove this item from the shopping cart?')"
            type="secondary"
          >
            <template #action>
              <div class="button-wrap">
                <SfButton
                  class="sf-button_remove_item"
                  data-testid="cart-sidebar-remove-item-yes"
                  @click="actionRemoveItem(tempProduct)"
                >
                  {{ $t('Yes') }}
                </SfButton>
                <SfButton @click="visible = false">
                  {{ $t('Cancel') }}
                </SfButton>
              </div>
            </template>
            <template #close>
              <div />
            </template>
          </SfNotification>
        </div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  SfBadge,
  SfBreadcrumbs,
  SfButton,
  SfCollectedProduct,
  SfHeading,
  SfImage,
  SfLoader,
  SfNotification,
  SfPrice,
  SfProperty,
  SfQuantitySelector,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  ref,
  useRouter,
  useContext,
  onMounted,
} from '@nuxtjs/composition-api';
import { debounce } from 'lodash-es';
import {
  getItems,
  getTotals,
  getDiscountAmount,
  getTotalItems,
  getStockStatus,
  getItemName,
  getItemImage,
  getItemPrice,
  productHasSpecialPrice,
  getItemQty,
} from '~/modules/checkout/getters/cartGetters';
import productGetters from '~/modules/catalog/product/getters/productGetters';
import {
  useUiNotification,
  useExternalCheckout,
  useImage,
  useProduct,
} from '~/composables';
import { useCart } from '~/modules/checkout/composables/useCart';
import { useUser } from '~/modules/customer/composables/useUser';
import SvgImage from '~/components/General/SvgImage.vue';
import type { ConfigurableCartItem, BundleCartItem, CartItemInterface } from '~/modules/GraphQL/types';
import { ProductStockStatus } from '~/modules/GraphQL/types';
import { Breadcrumb } from '~/modules/catalog/types';
import CouponCode from '../../../components/CouponCode.vue';

export default defineComponent({
  name: 'CartPage',
  components: {
    SfBreadcrumbs,
    SfLoader,
    SfNotification,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfQuantitySelector,
    SfBadge,
    CouponCode,
    SvgImage,
    SfImage,
  },
  setup() {
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

    const breadcrumbs = ref<Breadcrumb[]>([
      {
        text: i18n.t('Home') as string,
        link: localePath('/'),
      },
      {
        text: i18n.t('My Cart') as string,
        link: localePath('/cart'),
      },
    ]);

    const products = computed(() => getItems(cart.value)
      .filter(Boolean)
      .map((item) => ({
        ...item,
        product: {
          ...item.product,
          ...[(item as ConfigurableCartItem).configured_variant ?? {}],
          original_sku: item.product.sku,
        },
      })));
    const totals = computed(() => getTotals(cart.value));
    const discount = computed(() => -getDiscountAmount(cart.value));
    const totalItems = computed(() => getTotalItems(cart.value));
    const getAttributes = (product: ConfigurableCartItem) => product.configurable_options || [];
    const getBundles = (product: BundleCartItem) => product.bundle_options?.map((b) => b.values).flat() || [];
    const visible = ref(false);
    const tempProduct = ref();

    onMounted(async () => {
      if (!cart.value?.id) {
        await loadCart();
      }
    });

    const goToCheckout = async () => {
      const redirectUrl = initializeCheckout({ baseUrl: '/checkout/user-account' });
      await router.push(localePath(redirectUrl));
    };

    const handleHomeClick = async () => {
      await router.push(localePath('/'));
    };

    const sendToRemove = ({ product }: { product: CartItemInterface }) => {
      if (notifications.value.length > 0) {
        notifications.value[0].dismiss();
      }

      visible.value = true;
      tempProduct.value = product;
    };

    const actionRemoveItem = async (product: CartItemInterface) => {
      await removeItem({ product });
      visible.value = false;

      sendNotification({
        id: Symbol('product_removed'),
        message: i18n.t('{0} has been successfully removed from your cart', {
          0: getItemName(
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
    const isInStock = (product: CartItemInterface) => getStockStatus(product) === ProductStockStatus.InStock;

    return {
      breadcrumbs,
      sendToRemove,
      actionRemoveItem,
      loading,
      isAuthenticated,
      products,
      removeItem,
      delayedUpdateItemQty,
      notifications,
      visible,
      tempProduct,
      goToCheckout,
      totals,
      totalItems,
      productGetters,
      getAttributes,
      getBundles,
      isInStock,
      imageSizes,
      getMagentoImage,
      discount,
      getProductPath,
      handleHomeClick,
      getItemName,
      getItemImage,
      getItemPrice,
      productHasSpecialPrice,
      getItemQty,
    };
  },
});
</script>
<style lang="scss" scoped>
.cart-summary {
  padding-bottom: var(--spacer-sm);
}
.container {
  padding-left: var(--spacer-sm);
  padding-right: var(--spacer-sm);
}
.content {
  flex: 1;

  @include for-desktop {
    padding-right: var(--spacer-sm);
  }
}
.sidebar {
  @include for-desktop {
    padding-left: var(--spacer-sm);
    max-width: 25rem;
    width: 100%;
  }
}
.breadcrumbs {
  @include for-mobile {
    margin-top: var(--spacer-lg)
  }
}

.sf-collected-product {
  --collected-product-width: 100%;
}

.notifications {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  .sf-notification {
    padding: 20px;
    .button-wrap {
      margin-top: 15px;
      display: flex;
      column-gap: 15px;
    }
  }
}

.cart-summary {
  @include for-mobile {
    margin-top: var(--spacer-xl);
  }
}

.my-cart {
  flex: 1;
  display: flex;

  @include for-mobile {
    flex-direction: column;
  }

  @include for-desktop {
    margin-top: var(--spacer-sm);
  }

  &__total-items {
    margin: 0;
  }

  &__subtotal, &__discount {
    --price-font-weight: var(--font-weight--light);
  }

  &__total-price {
    --price-font-size: var(--font-size--lg);
    --price-font-weight: var(--font-weight--medium);
    margin: var(--spacer-base) 0 var(--spacer-base) 0;
  }
}

.empty-cart {
  --heading-description-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-margin: 0 0 var(--spacer-xl) 0;
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  height: 100%;

  &__banner {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }

  &__heading {
    padding: 0 var(--spacer-base);
  }

  &__image {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }

  @include for-desktop {
    --heading-title-font-size: var(--font-size--xl);
    --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
}

.collected-product-list {
  flex: 1;
}

.collected-product {
  margin: 0 0 var(--spacer-sm) 0;

  &__properties {
    margin: var(--spacer-xs) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 2;

    &:first-child {
      margin-bottom: 8px;
    }
  }

  ::v-deep .sf-collected-product__actions {
    display: none;
  }

  &:hover {
    --collected-product-configuration-display: initial;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
  .sf-badge__absolute {
    position: absolute;
    left: 0;
  }
}
</style>
