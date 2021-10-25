<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
      <template #circle-icon="{ close }">
        <div
          class="close-icon"
          @click="close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L17 17"
              stroke="#171717"
              stroke-width="2"
            />
            <path
              d="M17 1L1 17"
              stroke="#171717"
              stroke-width="2"
            />
          </svg>
        </div>
      </template>
      <transition
        name="sf-collapse-top"
        mode="out-in"
      >
        <div class="notifications">
          <SfNotification
            v-if="!isLoaderVisible"
            :visible="visible"
            title="Are you sure?"
            message="Are you sure you would like to remove this item from the shopping cart?"
            type="secondary"
          >
            <template #action>
              <div class="button-wrap">
                <SfButton
                  class="sf-button_remove_item"
                  @click="actionRemoveItem(tempProduct)"
                >
                  Yes
                </SfButton>
                <SfButton @click="visible = false">
                  Cancel
                </SfButton>
              </div>
            </template>
            <template #close>
              <div />
            </template>
          </SfNotification>
        </div>
      </transition>
      <SfLoader
        v-if="isLoaderVisible"
        :loading="isLoaderVisible"
      >
        <div />
      </SfLoader>
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          :name="$t('Total items')"
          :value="totalItems"
        />
      </template>
      <transition
        name="sf-fade"
        mode="out-in"
      >
        <div
          v-if="totalItems"
          key="my-cart"
          class="my-cart"
        >
          <div class="collected-product-list">
            <transition-group
              name="sf-fade"
              tag="div"
            >
              <SfCollectedProduct
                v-for="product in products"
                :key="`${cartGetters.getItemSku(product)}-${Math.random()}`"
                :image="cartGetters.getItemImage(product)"
                :title="cartGetters.getItemName(product)"
                :regular-price="
                  $n(cartGetters.getItemPrice(product).regular, 'currency')
                "
                :special-price="
                  cartGetters.productHasSpecialPrice(product)
                    ? getItemPrice(product).special &&
                      $n(cartGetters.getItemPrice(product).special, 'currency')
                    : ''
                "
                :stock="99999"
                :qty="cartGetters.getItemQty(product)"
                :link="
                  localePath(
                    `/p/${cartGetters.getItemSku(product)}${cartGetters.getSlug(
                      product
                    )}`
                  )
                "
                class="collected-product"
                @input="updateItemQty({ product, quantity: $event })"
                @click:remove="sendToRemove({ product })"
              >
                <template #input>
                  <div class="sf-collected-product__quantity-wrapper">
                    <SfQuantitySelector
                      :disabled="loading"
                      :qty="cartGetters.getItemQty(product)"
                      class="sf-collected-product__quantity-selector"
                      @input="updateItemQty({ product, quantity: $event })"
                    />
                  </div>
                </template>
                <template #configuration>
                  <div v-if="getAttributes(product).length > 0">
                    <SfProperty
                      v-for="(attr, index) in getAttributes(product)"
                      :key="index"
                      :name="attr.option_label"
                      :value="attr.value_label"
                    />
                  </div>
                  <div v-if="getBundles(product).length > 0">
                    <SfProperty
                      v-for="(bundle, i) in getBundles(product)"
                      :key="i"
                      :name="`${bundle.quantity}x`"
                      :value="bundle.label"
                    />
                  </div>
                  <div v-else />
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
            <SfImage
              alt="Empty bag"
              class="empty-cart__image"
              src="/icons/empty-cart.svg"
            />
            <SfHeading
              title="Your cart is empty"
              :level="2"
              class="empty-cart__heading"
              :description="
                $t(
                  'Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.'
                )
              "
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              :name="$t('Subtotal price')"
              class="
                sf-property--full-width sf-property--large
                my-cart__total-price
              "
            >
              <template #value>
                <SfPrice
                  :regular="$n(totals.subtotal, 'currency')"
                  :special="
                    totals.subtotal <= totals.special
                      ? ''
                      : $n(totals.special, 'currency')
                  "
                />
              </template>
            </SfProperty>
            <CouponCode />
            <a @click="goToCheckout">
              <SfButton
                v-e2e="'go-to-checkout-btn'"
                class="sf-button--full-width color-secondary"
                @click="toggleCartSidebar"
              >
                {{ $t('Go to checkout') }}
              </SfButton>
            </a>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              @click="toggleCartSidebar"
            >
              {{ $t('Go back shopping') }}
            </SfButton>
          </div>
        </transition>
      </template>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfLoader,
  SfNotification,
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector,
} from '@storefront-ui/vue';
import { computed, defineComponent, ref } from '@vue/composition-api';
import {
  useCart,
  useUser,
  cartGetters,
  useExternalCheckout,
} from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { useUiState, useUiNotification } from '~/composables';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';
import CouponCode from './CouponCode.vue';

export default defineComponent({
  name: 'CartSidebar',
  components: {
    SfLoader,
    SfNotification,
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
    CouponCode,
  },
  setup() {
    const { initializeCheckout } = useExternalCheckout();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const { router } = useVueRouter();
    const {
      cart,
      removeItem,
      updateItemQty,
      load: loadCart,
      loading,
    } = useCart();
    const { isAuthenticated } = useUser();
    const { send: sendNotification, notifications } = useUiNotification();

    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const getAttributes = (product) => product.configurable_options || [];
    const getBundles = (product) => product.bundle_options?.map((b) => b.values).flat() || [];
    const visible = ref(false);
    const isLoaderVisible = ref(false);
    const tempProduct = ref();

    onSSR(async () => {
      await loadCart();
    });

    const goToCheckout = async () => {
      const redirectUrl = await initializeCheckout('/checkout/user-account');
      await router.push(redirectUrl);
    };

    const sendToRemove = ({ product }) => {
      if (notifications.value.length > 0) {
        notifications.value[0].dismiss();
      }

      visible.value = true;
      tempProduct.value = product;
    };

    const actionRemoveItem = async (product) => {
      isLoaderVisible.value = true;

      await removeItem({ product });

      isLoaderVisible.value = false;
      visible.value = false;

      sendNotification({
        id: Symbol('product_removed'),
        message: `${cartGetters.getItemName(
          product,
        )} has been successfully removed from your cart.`,
        type: 'success',
        icon: 'check',
        persist: false,
        title: 'Product removed',
      });
    };

    return {
      sendToRemove,
      actionRemoveItem,
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      notifications,
      visible,
      isLoaderVisible,
      tempProduct,
      toggleCartSidebar,
      goToCheckout,
      totals,
      totalItems,
      cartGetters,
      getAttributes,
      getBundles,
    };
  },
});
</script>

<style lang="scss" scoped>
#cart {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  @include for-desktop {
    & > * {
      --sidebar-bottom-padding: var(--spacer-base);
      --sidebar-content-padding: var(--spacer-base);
    }
  }
}
@include for-mobile {
  .close-icon {
    display: none;
  }
}

.close-icon {
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.notifications {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -350px;
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
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__total-items {
    margin: 0;
  }

  &__total-price {
    --price-font-size: var(--font-size--xl);
    --price-font-weight: var(--font-weight--medium);
    margin: 0 0 var(--spacer-base) 0;
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

  &__actions {
    transition: opacity 150ms ease-in-out;
  }

  &__save,
  &__compare {
    --button-padding: 0;

    &:focus {
      --cp-save-opacity: 1;
      --cp-compare-opacity: 1;
    }
  }

  &__save {
    opacity: var(--cp-save-opacity, 0);
  }

  &__compare {
    opacity: var(--cp-compare-opacity, 0);
  }

  &:hover {
    --cp-save-opacity: 1;
    --cp-compare-opacity: 1;
    @include for-desktop {
      .collected-product__properties {
        display: none;
      }
    }
  }
}
</style>
