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
              <span v-html="$dompurify(item.product_name)" />
              <div
                v-for="option in item.selected_options"
                :key="option.label"
              >
                <span
                  class="configurable-option-label"
                  v-html="$dompurify(option.label)"
                />
                <span>{{ option.value }}</span>
              </div>
            </SfTableData>
            <SfTableData>{{ item.quantity_ordered }}</SfTableData>
            <SfTableData>{{ $fc(item.product_sale_price.value, '', { currency: item.product_sale_price.currency }) }}</SfTableData>
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
              {{ asyncData.order.status }}
            </template>
          </OrderSummaryRow>

          <OrderSummaryRow bold>
            <template #label>
              {{ $t('Price') }}
            </template>
            <template #value>
              {{ $fc(getGrandTotal(asyncData.order), '', {currency: getOrderCurrency(asyncData.order)}) }}
            </template>
          </OrderSummaryRow>
        </SfTable>

        <SfHeading
          class="order-information-heading"
          :level="3"
          :title="$t('Order information')"
        />

        <div class="order-information">
          <div>
            <header class="order-information__column-heading">
              {{ $t('Shipping address') }}
            </header>
            <OrderInformationAddressColumn
              :address="asyncData.order.shipping_address"
              :countries="asyncData.countries"
            />
          </div>

          <div>
            <header class="order-information__column-heading">
              {{ $t('Shipping method') }}
            </header>
            <div>
              {{ asyncData.order.shipping_method }}
            </div>
          </div>

          <div>
            <header class="order-information__column-heading">
              {{ $t('Billing address') }}
            </header>
            <OrderInformationAddressColumn
              :address="asyncData.order.billing_address"
              :countries="asyncData.countries"
            />
          </div>

          <div>
            <header class="order-information__column-heading">
              {{ $t('Payment Method') }}
            </header>
            <div>
              {{ asyncData.order.payment_methods[0].name }}
            </div>
          </div>
        </div>
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
  SfHeading,
} from '@storefront-ui/vue';
import {
  defineComponent, useAsync, useContext, useRouter,
} from '@nuxtjs/composition-api';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';
import orderGetters from '~/modules/checkout/getters/orderGetters';
import { useCountrySearch } from '~/composables';
import OrderSummaryRow from '~/modules/customer/pages/MyAccount/OrderHistory/SingleOrder/OrderSummaryRow.vue';
import OrderInformationAddressColumn from '~/modules/customer/pages/MyAccount/OrderHistory/SingleOrder/OrderInformationAddressColumn.vue';

export default defineComponent({
  name: 'SingleOrder',
  components: {
    SfHeading,
    SfButton,
    SfTable,
    SfTabs,
    SfLoader,
    OrderSummaryRow,
    OrderInformationAddressColumn,
  },
  props: { orderId: { type: String, required: true } },
  setup(props) {
    const context = useContext();
    const router = useRouter();
    const { search, loading } = useUserOrder();
    const { search: searchCountries } = useCountrySearch();
    const asyncData = useAsync(async () => {
      const orderResult = await search({ filter: { number: { eq: props.orderId } } });
      const order = orderResult.items[0] ?? null;

      if (!order) {
        router.push(context.localeRoute({ name: 'customer-order-history' }));

        return null;
      }

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
      getGrandTotal: orderGetters.getGrandTotal,
      getOrderCurrency: orderGetters.getOrderCurrency,
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

.order-information {
  &-heading {
    text-align: left;
    margin-top: var(--spacer-lg);
    margin-bottom: var(--spacer-sm);
  }
  &__column-heading {
    font-weight: var(--font-weight--normal);
    margin-bottom: var(--spacer-sm);
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
