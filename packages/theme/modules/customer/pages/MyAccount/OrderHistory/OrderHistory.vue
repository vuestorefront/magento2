<template>
  <SfTabs>
    <SfTab
      data-cy="order-history-tab_my-orders"
      :title="$t('My orders')"
    >
      <div v-if="loading">
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
              {{ tableHeader }}
            </SfTableHeader>
            <SfTableHeader class="orders__element--right" />
          </SfTableHeading>
          <SfTableRow
            v-for="order in orders"
            :key="order.number"
          >
            <SfTableData>{{ order.number }}</SfTableData>
            <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
            <SfTableData>{{ $fc(orderGetters.getPrice(order)) }}</SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
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
            v-if="!loading"
            v-show="pagination.totalPages > 1"
            class="products__pagination desktop-only"
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
    <SfTab
      data-cy="order-history-tab_returns"
      :title="$t('Returns')"
    >
      <p class="message">
        This feature is not implemented yet! Please take a look at
        <br>
        <SfLink
          class="message__link"
          link="#"
        >
          https://github.com/vuestorefront/magento2/projects/5
        </SfLink>
        for our Roadmap!
      </p>
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
  computed, defineComponent, useRoute, useAsync,
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { AgnosticOrderStatus } from '~/composables/types';
import { orderGetters } from '~/getters';
import { useUiHelpers } from '~/composables';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';
import { CustomerOrder } from '~/modules/GraphQL/types';

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
    const { search, loading } = useUserOrder();
    const route = useRoute();
    const th = useUiHelpers();
    const {
      query: {
        page,
        itemsPerPage,
      },
    } = route.value;

    const orders = useAsync(async () => {
      const ordersData = await search({
        currentPage: Number.parseInt(page as string, 10) || 1,
        pageSize: Number.parseInt(itemsPerPage as string, 10) || 10,
      });

      return ordersData;
    });

    const tableHeaders = [
      'Order ID',
      'Payment date',
      'Amount',
      'Status',
    ];

    const getStatusTextClass = (order: CustomerOrder) => {
      const status = orderGetters.getStatus(order);
      switch (status) {
        case AgnosticOrderStatus.Open:
          return 'text-warning';
        case AgnosticOrderStatus.Complete:
          return 'text-success';
        default:
          return '';
      }
    };

    const pagination = computed(() => orderGetters.getPagination(orders.value));

    return {
      getStatusTextClass,
      loading,
      orderGetters,
      // @ts-expect-error Wrong type returned by useUserOrder. See M2-579 in VSF Jira
      orders: computed(() => orders.value.items),
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
