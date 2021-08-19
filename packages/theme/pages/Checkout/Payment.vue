<template>
  <div>
    <SfHeading
      :level="3"
      title="Payment"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">
          {{ $t('Item') }}
        </SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage
            :src="cartGetters.getItemImage(product)"
            :alt="cartGetters.getItemName(product)"
          />
        </SfTableData>
        <SfTableData class="table__data table__description table__data">
          <div class="product-title">
            {{ cartGetters.getItemName(product) }}
          </div>
          <div class="product-sku">
            {{ cartGetters.getItemSku(product) }}
          </div>
          <template
            v-if="getAttributes(product).length > 0"
          >
            <p
              v-for="attr in getAttributes(product)"
              :key="attr.option_label"
              class="detail-information"
            >
              <strong>{{ `${attr.option_label}:` }}</strong>{{ `${attr.value_label}` }}
            </p>
          </template>
          <template
            v-if="getBundles(product).length > 0"
          >
            <p
              v-for="bundle in getBundles(product)"
              :key="bundle.label"
              class="detail-information"
            >
              {{ `${bundle.quantity}x ${bundle.label}` }}
            </p>
          </template>
        </SfTableData>
        <SfTableData class="table__data">
          {{ cartGetters.getItemQty(product) }}
        </SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            name="Subtotal"
            :value="$n(totals.subtotal, 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            v-if="hasDiscounts"
            :name="$t('Discount')"
            :value="$n(discountsAmount, 'currency')"
            class="sf-property--full-width sf-property--small property"
          />
        </div>
        <div
          v-if="selectedShippingMethod"
          class="summary__total"
        >
          <SfProperty
            :value="$n(getShippingMethodPrice(selectedShippingMethod), 'currency')"
            class="sf-property--full-width property"
          >
            <template #name>
              <span class="sf-property__name">
                {{ selectedShippingMethod.carrier_title }} (<small>{{ selectedShippingMethod.method_title }}</small>)
              </span>
            </template>
          </SfProperty>
        </div>

        <SfDivider />

        <SfProperty
          name="Total price"
          :value="$n(totals.total, 'currency')"
          class="sf-property--full-width sf-property--large summary__property-total"
        />

        <VsfPaymentProvider
          @status="isPaymentReady = true"
        />

        <SfCheckbox
          v-model="terms"
          v-e2e="'terms'"
          name="terms"
          class="summary__terms"
        >
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('I agree to') }}
              <SfLink href="#">
                {{ $t('Terms and conditions') }}
              </SfLink>
            </div>
          </template>
        </SfCheckbox>

        <div class="summary__action">
          <SfButton
            type="button"
            class="sf-button color-secondary summary__back-button"
            @click="$router.push('/checkout/billing')"
          >
            {{ $t('Go back') }}
          </SfButton>
          <SfButton
            v-e2e="'make-an-order'"
            :disabled="loading || !isPaymentReady || !terms"
            class="summary__action-button"
            @click="processOrder"
          >
            {{ $t('Make an order') }}
          </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lant="ts">
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfPrice,
  SfProperty,
  SfLink,
} from '@storefront-ui/vue';
import { onSSR, useVSFContext } from '@vue-storefront/core';
import { ref, computed, defineComponent } from '@vue/composition-api';
import {
  useMakeOrder,
  useCart,
  cartGetters,
} from '@vue-storefront/magento';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

export default defineComponent({
  name: 'ReviewOrderAndPayment',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfPrice,
    SfProperty,
    SfLink,
    VsfPaymentProvider: () => import('~/components/Checkout/VsfPaymentProvider.vue'),
  },
  setup() {
    const { cart, load, setCart } = useCart();
    const { order, make, loading } = useMakeOrder();
    const { $magento } = useVSFContext();
    const { router } = useVueRouter();
    const isPaymentReady = ref(false);
    const terms = ref(false);
    const getAttributes = (product) => product.configurable_options || [];
    const getBundles = (product) => product.bundle_options?.map((b) => b.values).flat() || [];

    onSSR(async () => {
      await load();
    });

    const processOrder = async () => {
      await make();
      setCart(null);
      $magento.config.state.setCartId();
      await load();
      await router.push(`/checkout/thank-you?order=${order.value.order_number}`);
    };

    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(() => -1 * discounts.value.reduce((a, el) => el.value + a, 0));

    return {
      cart,
      cartGetters,
      discounts,
      hasDiscounts,
      discountsAmount,
      getShippingMethodPrice,
      isPaymentReady,
      loading,
      processOrder,
      products: computed(() => cartGetters.getItems(cart.value)),
      selectedShippingMethod: computed(() => cartGetters.getSelectedShippingMethod(cart.value)),
      tableHeaders: ['Description', 'Quantity', 'Amount'],
      terms,
      totals: computed(() => cartGetters.getTotals(cart.value)),
      getAttributes,
      getBundles,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}

.table {
  margin: 0 0 var(--spacer-base) 0;

  &__row {
    justify-content: space-between;
  }

  @include for-desktop {
    &__header {
      text-align: center;

      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.detail-information {
  margin: 0 !important;
  font-size: var(--font-size--sm);
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}

.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.product-price {
  --price-font-size: var(--font-size--base);
}

.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }

  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }

  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }

    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color: var(--c-white);

    &:hover {
      color: var(--c-white);
    }
  }

  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}

.property {
  margin: 0 0 var(--spacer-sm) 0;

  &__name {
    color: var(--c-text-muted);
  }
}

.accordion {
  margin: 0 0 var(--spacer-xl) 0;

  &__item {
    display: flex;
    align-items: flex-start;
  }

  &__content {
    flex: 1;
  }

  &__edit {
    flex: unset;
  }
}

.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);

  &:last-child {
    margin: 0;
  }

  &__label {
    font-weight: var(--font-weight--normal);
  }
}
</style>
