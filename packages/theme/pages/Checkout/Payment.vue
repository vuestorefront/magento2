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
        </SfTableData>
        <SfTableData
          v-for="attr in getAttributes(product)"
          :key="attr.option_label"
          class="table__data"
        >
          {{ `${attr.option_label}: ${attr.value_label}` }}
        </SfTableData>
        <SfTableData class="table__data">
          {{ cartGetters.getItemQty(product) }}
        </SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="cartGetters.getItemPrice(product).regular > cartGetters.getItemPrice(product).special
              && $n(cartGetters.getItemPrice(product).special, 'currency')"
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
            :value="$n(totals.special > 0 ? totals.special : totals.subtotal, 'currency')"
            class="sf-property--full-width property"
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
import { onSSR } from '@vue-storefront/core';
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
    const { router } = useVueRouter();
    const isPaymentReady = ref(false);
    const terms = ref(false);
    const getAttributes = (product) => product.configurable_options || [];

    onSSR(async () => {
      await load();
    });

    const processOrder = async () => {
      await make();
      router.push(`/checkout/thank-you?order=${order.value.order_number}`);
      setCart(null);
    };

    return {
      cart,
      cartGetters,
      getShippingMethodPrice,
      isPaymentReady,
      loading,
      processOrder,
      products: computed(() => cartGetters.getItems(cart.value)),
      selectedShippingMethod: computed(() => cartGetters.getSelectedShippingMethod(cart.value)),
      tableHeaders: ['Description', 'Configurations', 'Quantity', 'Amount'],
      terms,
      totals: computed(() => cartGetters.getTotals(cart.value)),
      getAttributes,
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
