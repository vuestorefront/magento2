<template>
  <SfTabs>
    <SfTab
      data-cy="order-history-tab_my-orders"
      :title="$t('My orders')"
    >
      <div v-if="loading || currentOrder === null">
        <SfLoader />
      </div>
      <div v-else>
        <SfButton
          data-cy="order-history-btn_orders"
          class="sf-button--text all-orders"
          @click="$router.push(ordersRoute)"
        >
          All Orders
        </SfButton>
        <div class="highlighted highlighted--total">
          <SfProperty
            v-for="property in currentOrder.properties"
            :key="property.name"
            :name="$t(property.name)"
            :value="property.value"
            class="sf-property--full-width property"
          />
        </div>
        <SfTable class="products">
          <SfTableHeading>
            <SfTableHeader class="products__name">
              {{ $t('Product') }}
            </SfTableHeader>
            <SfTableHeader>{{ $t('Quantity') }}</SfTableHeader>
            <SfTableHeader>{{ $t('Price') }}</SfTableHeader>
          </SfTableHeading>
          <SfTableRow
            v-for="item in currentOrder.items"
            :key="item.key"
          >
            <SfTableData class="products__name">
              {{ item.name }}
            </SfTableData>
            <SfTableData>{{ item.quantity }}</SfTableData>
            <SfTableData>{{ $fc(item.price) }}</SfTableData>
          </SfTableRow>
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
  SfProperty,
  SfLoader,
} from '@storefront-ui/vue';
import {
  computed, defineComponent, useAsync, useContext,
} from '@nuxtjs/composition-api';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';

export default defineComponent({
  name: 'SingleOrder',
  components: {
    SfButton,
    SfProperty,
    SfTable,
    SfTabs,
    SfLoader,
  },
  props: { orderId: { type: String, required: true } },
  setup(props) {
    const context = useContext();
    const { search, loading } = useUserOrder();
    const currentOrderRawData = useAsync(() => search({ filter: { number: { eq: props.orderId } } }), props.orderId);

    const currentOrder = computed(() => {
      const order = currentOrderRawData.value?.items[0] ?? null;

      if (order === null) {
        return null;
      }

      return {
        properties: [
          { name: 'Order ID', value: props.orderId },
          { name: 'Date', value: new Date(order?.order_date).toLocaleDateString() ?? '' },
          { name: 'Status', value: order?.status },
          { name: 'Price', value: context.$fc(order?.total?.grand_total?.value ?? 0) },
        ],
        items: order.items?.map(({
          product_sku, product_name, quantity_ordered = 0, product_sale_price = { value: 0 },
        }) => ({
          key: product_sku,
          name: product_name,
          quantity: quantity_ordered,
          price: product_sale_price.value ?? 0,
        })) ?? [],
      };
    });

    const ordersRoute = context.localeRoute({ name: 'customer-order-history' });

    return {
      currentOrder,
      loading,
      ordersRoute,
      currentOrderRawData,
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
.products {
  --table-column-flex: 1;
  &__name {
    margin-right: var(--spacer-sm);
    @include for-desktop {
      --table-column-flex: 2;
    }
  }
}

.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-sm);
  --property-value-font-size: var(--font-size--base);
  --property-name-font-size: var(--font-size--base);
  &:last-child {
    margin-bottom: 0;
  }
  ::v-deep .sf-property__name {
    white-space: nowrap;
  }
  ::v-deep .sf-property__value {
    text-align: right;
  }
  &--total {
    margin-bottom: var(--spacer-sm);
  }
  @include for-desktop {
    padding: var(--spacer-xl);
    --property-name-font-size: var(--font-size--lg);
    --property-name-font-weight: var(--font-weight--medium);
    --property-value-font-size: var(--font-size--lg);
    --property-value-font-weight: var(--font-weight--semibold);
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
