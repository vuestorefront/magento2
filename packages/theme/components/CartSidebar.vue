<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      class="sf-sidebar--right"
      @close="toggleCartSidebar"
    >
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
                :regular-price="$n(cartGetters.getItemPrice(product).regular, 'currency')"
                :special-price="cartGetters.productHasSpecialPrice(product)
                  ? getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')
                  : ''"
                :stock="99999"
                :qty="cartGetters.getItemQty(product)"
                class="collected-product"
                @input="updateItemQty({ product, quantity: $event })"
                @click:remove="removeItem({ product })"
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
                  <SfProperty
                    v-for="attr in getAttributes(product)"
                    :name="attr.option_label"
                    :value="attr.value_label"
                  />
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
              :description="$t('Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.')"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
            <SfProperty
              :name="$t('Subtotal price')"
              class="sf-property--full-width sf-property--large my-cart__total-price"
            >
              <template #value>
                <SfPrice
                  :regular="$n(totals.subtotal, 'currency')"
                  :special="totals.subtotal > totals.special ? '' : $n(totals.special, 'currency')"
                />
              </template>
            </SfProperty>
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
<script lang="ts">
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfImage,
  SfQuantitySelector,
} from '@storefront-ui/vue';
import { computed, defineComponent } from '@vue/composition-api';
import {
  useCart,
  useUser,
  cartGetters,
  useExternalCheckout,
} from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

export default defineComponent({
  name: 'CartSidebar',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage,
    SfQuantitySelector,
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
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const getAttributes = (product) => product.configurable_options || [];

    onSSR(async () => {
      await loadCart();
    });

    const goToCheckout = async () => {
      const redirectUrl = await initializeCheckout('/checkout/user-account');
      await router.push(redirectUrl);
    };

    return {
      loading,
      isAuthenticated,
      products,
      removeItem,
      updateItemQty,
      isCartSidebarOpen,
      toggleCartSidebar,
      goToCheckout,
      totals,
      totalItems,
      cartGetters,
      getAttributes,
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
