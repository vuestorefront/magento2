<template>
  <div id="cart">
    <SfSidebar
      v-e2e="'sidebar-cart'"
      :visible="isCartSidebarOpen"
      :title="$t('My Cart')"
      position="right"
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
            v-if="!loading"
            :visible="isRemoveModalVisible"
            :title="$t('Are you sure?')"
            :message="$t('Are you sure you would like to remove this item from the shopping cart?')"
            type="secondary"
          >
            <template #action>
              <div class="button-wrap">
                <SfButton
                  class="sf-button_remove_item"
                  data-testid="cart-sidebar-remove-item-yes"
                  @click="removeItemAndSendNotification(itemToRemove)"
                >
                  {{ $t('Yes') }}
                </SfButton>
                <SfButton @click="isRemoveModalVisible = false">
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
      <template #content-top>
        <SfProperty
          v-if="totalItems"
          class="sf-property--large cart-summary desktop-only"
          data-testid="cart-summary"
          :name="$t('Total items')"
          :value="totalItems"
        />
      </template>
      <SfLoader :loading="loading">
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
                  :key="product.product.original_sku"
                  :has-more-actions="false"
                  data-testid="cart-sidebar-collected-product"
                  :image="cartGetters.getItemImage(product)"
                  :title="cartGetters.getItemName(product)"
                  :regular-price="
                    $fc(cartGetters.getItemPrice(product).regular)
                  "
                  :special-price="
                    cartGetters.productHasSpecialPrice(product)
                      ? cartGetters.getItemPrice(product).special &&
                        $fc(cartGetters.getItemPrice(product).special)
                      : ''
                  "
                  :link="localePath(getProductPath(product.product))"
                  class="collected-product"
                  @input="delayedUpdateItemQty({ product, quantity: $event })"
                  @click:remove="showRemoveItemModal({ product })"
                >
                  <template #image>
                    <SfImage
                      image-tag="nuxt-img"
                      :src="getMagentoImage(cartGetters.getItemImage(product))"
                      :alt="cartGetters.getItemName(product)"
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
                        :qty="cartGetters.getItemQty(product)"
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
            </div>
          </div>
        </transition>
      </SfLoader>
      <template #content-bottom>
        <transition name="sf-fade">
          <div v-if="totalItems">
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
                @click="toggleCartSidebar"
              >
                {{ $t('Go to checkout') }}
              </SfButton>
            </a>
            <a @click="goToCart">
              <SfButton
                data-testid="category-sidebar-go-to-cart"
                class="sf-button--full-width sidebar-go-to-cart"
                @click="toggleCartSidebar"
              >
                {{ $t('Go to cart') }}
              </SfButton>
            </a>
          </div>
          <div v-else>
            <SfButton
              class="sf-button--full-width color-primary"
              data-testid="cart-sidebar-back"
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
  SfLoader,
  SfNotification,
  SfSidebar,
  SfHeading,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct,
  SfQuantitySelector,
  SfBadge,
  SfImage,
} from '@storefront-ui/vue';
import {
  defineComponent,
  useRouter,
  useContext,
} from '@nuxtjs/composition-api';
import {
  useUiState,
} from '~/composables';
import SvgImage from '~/components/General/SvgImage.vue';
import CouponCode from '~/components/CouponCode.vue';
import { useCartView } from '~/modules/checkout/composables/useCartView';

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
    SfQuantitySelector,
    SfBadge,
    CouponCode,
    SvgImage,
    SfImage,
  },
  setup() {
    const cartView = useCartView();
    const { isCartSidebarOpen, toggleCartSidebar } = useUiState();
    const router = useRouter();
    const { app } = useContext();

    const goToCart = async () => {
      await router.push(app.localeRoute({ name: 'cart' }));
    };

    return {
      ...cartView,
      isCartSidebarOpen,
      toggleCartSidebar,
      goToCart,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-go-to-cart {
  margin-top: var(--spacer-sm);
  --button-background: var(--c-light);
  --button-color: var(--c-dark-variant);
}

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
  margin-top: var(--spacer-xl);
}

.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;

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
