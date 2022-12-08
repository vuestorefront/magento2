<template>
  <SfTabs>
    <SfTab
      data-cy="order-history-tab_my-orders"
      :title="$t('My orders')"
    >
      <div v-if="$fetchState.pending">
        <SfLoader />
      </div>
      <div v-else>
        <p class="message">
          {{ $t('Details and status orders') }}
        </p>
        <div
          v-if="orders.length === 0"
          class="no-orders"
        >
          <p class="no-orders__title">
            {{ $t('You currently have no orders') }}
          </p>
          <SfButton
            data-cy="order-history-btn_start"
            class="no-orders__button"
            @click="$router.push(localePath('/'))"
          >
            {{ $t('Start shopping') }}
          </SfButton>
        </div>
        <SfTable
          v-else
          class="orders"
        >
          <SfTableHeading>
            <SfTableHeader
              v-for="tableHeader in tableHeaders"
              :key="tableHeader"
            >
              {{ $t(tableHeader) }}
            </SfTableHeader>
            <SfTableHeader class="orders__element--right" />
          </SfTableHeading>
          <SfTableRow
            v-for="order in orders"
            :key="order.number"
          >
            <SfTableData>{{ order.number }}</SfTableData>
            <SfTableData>{{ getDate(order) }}</SfTableData>
            <SfTableData>{{ $fc(getGrandTotal(order), '', {currency: getOrderCurrency(order)}) }}</SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(order)">{{ order.status }}</span>
            </SfTableData>
            <SfTableData class="orders__view orders__element--right">
              <SfLink
                data-cy="order-history-btn_view"
                :link="localeRoute({ name: 'customer-single-order', params: { orderId: order.number } })"
              >
                {{ $t('View details') }}
              </SfLink>
            </SfTableData>
          </SfTableRow>
        </SfTable>
        <LazyHydrate on-interaction>
          <SfPagination
            v-if="!$fetchState.pending"
            v-show="pagination.totalPages > 1"
            class="products__pagination"
            :current="pagination.currentPage"
            :total="pagination.totalPages"
            :visible="5"
          />
        </LazyHydrate>

        <div
          v-show="pagination.totalPages > 1"
          class="products__show-on-page"
        >
          <span class="products__show-on-page__label">{{ $t('Show on page') }}</span>
          <LazyHydrate on-interaction>
            <SfSelect
              :value="pagination.itemsPerPage.toString()"
              class="products__items-per-page"
              @input="th.changeItemsPerPage"
            >
              <SfSelectOption
                v-for="option in pagination.pageOptions"
                :key="option"
                :value="option"
                class="products__items-per-page__option"
              >
                {{ option }}
              </SfSelectOption>
            </SfSelect>
          </LazyHydrate>
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
  SfLink,
  SfPagination,
  SfSelect,
  SfLoader,
} from '@storefront-ui/vue';
import {
  ref, computed, defineComponent, useRoute, useFetch,
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import orderGetters from '~/modules/checkout/getters/orderGetters';
import { useUiHelpers } from '~/composables';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';
import type { CustomerOrders, CustomerOrder } from '~/modules/GraphQL/types';
import { OrderStatusEnum } from '~/modules/customer/enums/OrderStatusEnum';

export default defineComponent({
  name: 'OrderHistory',
  components: {
    LazyHydrate,
    SfButton,
    SfLink,
    SfPagination,
    SfSelect,
    SfTable,
    SfTabs,
    SfLoader,
  },
  setup() {
    const { search } = useUserOrder();
    const route = useRoute();
    const th = useUiHelpers();
    const {
      query: {
        page,
        itemsPerPage,
      },
    } = route.value;

    const rawCustomerOrders = ref<CustomerOrders | null>(null);

    useFetch(async () => {
      rawCustomerOrders.value = await search({
        currentPage: Number.parseInt(page as string, 10) || 1,
        pageSize: Number.parseInt(itemsPerPage as string, 10) || 10,
      });
    });

    const tableHeaders = [
      'Order ID',
      'Payment date',
      'Amount',
      'Status',
    ];

    const getStatusTextClass = (order: CustomerOrder) => {
      switch (order.status) {
        case OrderStatusEnum.OPEN:
          return 'text-warning';
        case OrderStatusEnum.COMPLETE:
          return 'text-success';
        default:
          return '';
      }
    };

    const pagination = computed(() => orderGetters.getPagination(rawCustomerOrders.value));

    return {
      getStatusTextClass,
      orderGetters,
      getDate: orderGetters.getDate,
      getGrandTotal: orderGetters.getGrandTotal,
      getOrderCurrency: orderGetters.getOrderCurrency,
      orders: computed(() => rawCustomerOrders.value?.items ?? []),
      rawCustomerOrders,
      pagination,
      tableHeaders,
      th,
    };
  },
});
</script>

<style lang='scss' scoped>
.no-orders {
  &__title {
    margin: 0 0 var(--spacer-lg) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--primary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17,5rem;
    }
  }
}
.orders {
  @include for-desktop {
    &__element {
      &--right {
        text-align: right;
      }
    }
  }
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

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;

  &__pagination {
    display: flex;
    justify-content: flex-start;
    margin: var(--spacer-xl) 0 0 0;
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
