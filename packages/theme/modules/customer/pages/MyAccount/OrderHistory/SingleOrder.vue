<template>
  <SfTabs>
    <SfTab
      data-cy="order-history-tab_my-orders"
      :title="$t('My orders')"
    >
      <div v-if="asyncData === null">
        <SfLoader />
      </div>
      <div v-else>
        <SfButton
          data-cy="order-history-btn_orders"
          class="sf-button--text all-orders"
          @click="$router.push(ordersRoute)"
        >
          {{ $t('All Orders') }}
        </SfButton>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">
              {{ $t('Product') }}
            </SfTableHeader>
            <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="item in asyncData.order.items"
            :key="item.product_sku"
          >
            <SfTableData class="products__name">
              {{ item.product_name }}
              <div
                v-for="option in item.selected_options"
                :key="option.label"
              >
                <span class="configurable-option-label">{{ option.label }}</span>
                <span>{{ option.value }}</span>
              </div>
            </SfTableData>
            <SfTableData>{{ item.quantity_ordered }}</SfTableData>
            <SfTableData>{{ $fc(item.product_sale_price.value) }}</SfTableData>
          </SfTableRow>

          <OrderSummaryRow>
            <template #label>
              {{ $t('Order ID') }}
            </template>
            <template #value>
              {{ asyncData.order.number }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryRow>
            <template #label>
              {{ $t('Date') }}
            </template>
            <template #value>
              {{ getDate(asyncData.order) }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryRow>
            <template #label>
              {{ $t('Status') }}
            </template>
            <template #value>
              {{ getStatus(asyncData.order) }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryRow bold>
            <template #label>
              {{ $t('Price') }}
            </template>
            <template #value>
              {{ $fc(asyncData.order.total.base_grand_total.value) }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryAddressRow
            :address="asyncData.order.shipping_address"
            :countries="asyncData.countries"
          >
            <template #label>
              {{ $t('Shipping Address') }}
            </template>
          </OrderSummaryAddressRow>

          <OrderSummaryRow>
            <template #label>
              {{ $t('Shipping Method') }}
            </template>
            <template #value>
              {{ asyncData.order.shipping_method }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryAddressRow
            :address="asyncData.order.billing_address"
            :countries="asyncData.countries"
          >
            <template #label>
              {{ $t('Billing Address') }}
            </template>
          </OrderSummaryAddressRow>

          <OrderSummaryRow>
            <template #label>
              {{ $t('Payment Method') }}
            </template>
            <template #value>
              {{ asyncData.order.payment_methods[0].name }}
            </template>
          </OrderSummaryRow>
        </SfTable>
      </div>
    </SfTab>
  </SfTabs>
</template>

<script lang="ts">
import {
  SfTabs,
  SfTable,
  SfButton,
  SfLoader,
} from '@storefront-ui/vue';
import {
  defineComponent, useAsync, useContext,
} from '@nuxtjs/composition-api';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';
import orderGetters from '~/modules/checkout/getters/orderGetters';
import OrderSummaryRow from '~/modules/customer/pages/MyAccount/OrderHistory/OrderSummaryRow.vue';
import OrderSummaryAddressRow from '~/modules/customer/pages/MyAccount/OrderHistory/OrderSummaryAddressRow.vue';
import { useCountrySearch } from '~/composables';

export default defineComponent({
  name: 'SingleOrder',
  components: {
    SfButton,
    SfTable,
    SfTabs,
    SfLoader,
    OrderSummaryRow,
    OrderSummaryAddressRow,
  },
  props: { orderId: { type: String, required: true } },
  setup(props) {
    const context = useContext();
    const { search, loading } = useUserOrder();
    const { search: searchCountries } = useCountrySearch();
    const asyncData = useAsync(async () => {
      const orderResult = await search({ filter: { number: { eq: props.orderId } } });
      const order = orderResult.items[0] ?? null;

      const uniqueCountryCodePromises = [...new Set([order.shipping_address.country_code, order.billing_address.country_code])]
        .map((countryCode) => searchCountries({ id: countryCode }));
      const countries = await Promise.all(uniqueCountryCodePromises);

      return {
        order,
        countries,
      };
    });

    const ordersRoute = context.localeRoute({ name: 'customer-order-history' });

    return {
      loading,
      ordersRoute,
      asyncData,
      getDate: orderGetters.getDate,
      getStatus: orderGetters.getStatus,
    };
  },
});
</script>

<style lang='scss' scoped>
.all-orders {
  --button-padding: var(--spacer-base) 0;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
  &__link {
    color: var(--c-primary);
    font-weight: var(--font-weight--medium);
    font-family: var(--font-family--primary);
    font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}

.configurable-option-label {
  font-weight: var(--font-weight--semibold)
}

.products {
  --table-column-flex: 1;

  th, td {
    order: 0;

    &:not(:first-child) {
      --table-column-text-align: right;
    }
  }

  &__name {
    --table-column-text-align: left;

    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  @include for-desktop {

    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
  }

  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;

    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
</style>
