<template>
  <SfTabs :open-tab="1">
    <SfTab
      data-cy="order-history-tab_my-orders"
      :title="$t('My orders')"
    >
      <div v-if="loading">
        <SfLoader />
      </div>
      <div v-else-if="currentOrder">
        <SfButton
          data-cy="order-history-btn_orders"
          class="sf-button--text all-orders"
          @click="currentOrder = null"
        >
          All Orders
        </SfButton>
        <div class="highlighted highlighted--total">
          <SfProperty
            :name="$t('Order ID')"
            :value="orderGetters.getId(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Date')"
            :value="orderGetters.getDate(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Status')"
            :value="orderGetters.getStatus(currentOrder)"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Total')"
            :value="$fc(orderGetters.getPrice(currentOrder))"
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
            v-for="(item, i) in orderGetters.getItems(currentOrder)"
            :key="i"
          >
            <SfTableData class="products__name">
              {{ orderGetters.getItemName(item) }}
            </SfTableData>
            <SfTableData>{{ orderGetters.getItemQty(item) }}</SfTableData>
            <SfTableData>{{ $fc(orderGetters.getItemPrice(item)) }}</SfTableData>
          </SfTableRow>
        </SfTable>
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
            :key="orderGetters.getId(order)"
          >
            <SfTableData>{{ orderGetters.getId(order) }}</SfTableData>
            <SfTableData>{{ orderGetters.getDate(order) }}</SfTableData>
            <SfTableData>{{ $fc(orderGetters.getPrice(order)) }}</SfTableData>
            <SfTableData>
              <span :class="getStatusTextClass(order)">{{ orderGetters.getStatus(order) }}</span>
            </SfTableData>
            <SfTableData class="orders__view orders__element--right">
              <SfButton
                data-cy="order-history-btn_view"
                class="sf-button--text"
                @click="currentOrder = order"
              >
                {{ $t('View details') }}
              </SfButton>
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
  SfProperty,
  SfLink,
  SfPagination,
  SfSelect,
  SfLoader,
} from '@storefront-ui/vue';
import {
  computed, defineComponent, ref, useRoute, useAsync,
} from '@nuxtjs/composition-api';
import LazyHydrate from 'vue-lazy-hydration';
import { AgnosticOrderStatus } from '~/composables/types';
import { orderGetters } from '~/getters';
import { useUiHelpers } from '~/composables';
import { useUserOrder } from '~/modules/customer/composables/useUserOrder';

export default defineComponent({
  name: 'PersonalDetails',
  components: {
    LazyHydrate,
    SfButton,
    SfLink,
    SfPagination,
    SfProperty,
    SfSelect,
    SfTable,
    SfTabs,
    SfLoader,
  },
  setup() {
    const { search, loading } = useUserOrder();
    const currentOrder = ref(null);
    const th = useUiHelpers();
    const route = useRoute();
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

    const getStatusTextClass = (order) => {
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
      currentOrder,
      getStatusTextClass,
      loading,
      orderGetters,
      orders: computed(() => orderGetters.getItems(orders.value)),
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
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-size--sm);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-size--sm);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
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
