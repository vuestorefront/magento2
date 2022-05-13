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
            v-for="item in currentOrder.items"
            :key="item.key"
          >
            <SfTableData class="products__name">
              {{ item.name }}
            </SfTableData>
            <SfTableData>{{ item.quantity }}</SfTableData>
            <SfTableData>{{ $fc(item.price) }}</SfTableData>
          </SfTableRow>
          <SfTableRow
            v-for="property in currentOrder.properties"
            :key="property.name"
            class="order-summary"
          >
            <SfTableData class="order-summary__spacer" />
            <SfTableData>{{ property.name }}</SfTableData>
            <SfTableData>{{ property.value }}</SfTableData>
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
  SfLoader,
} from '@storefront-ui/vue';
import {
  computed, defineComponent, useAsync, useContext,
} from '@nuxtjs/composition-api';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';
import { orderGetters } from '~/getters';

export default defineComponent({
  name: 'SingleOrder',
  components: {
    SfButton,
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
          {
            name: context.i18n.t('Order ID'),
            value: orderGetters.getId(order),
          },
          {
            name: context.i18n.t('Date'),
            value: orderGetters.getDate(order),
          },
          {
            name: context.i18n.t('Status'),
            value: orderGetters.getStatus(order),
          },
          {
            name: context.i18n.t('Price'),
            value: context.$fc(orderGetters.getPrice(order)),
          },
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

.order-summary {
  position: relative;
  display: block;
  background-color: var(--c-light);
  pointer-events: none;

  @include for-mobile {
    &:before,
    &:after {
      content: "";
      position: absolute;
      display: block;
      background-color: var(--c-light);
      top: 0;
      height: 100%;
      width: var(--spacer-sm);
    }

    &:before {
      left: calc(-1 * var(--spacer-sm));
    }

    &:after {
      right: calc(-1 * var(--spacer-sm));
    }
  }

  ::v-deep tr {
    --table-row-padding: var(--spacer-xs) var(--spacer-sm);
  }

  &:last-of-type {
    td {
      --table-data-font-weight: var(--font-weight--semibold);
    }
  }

  &__spacer {
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
