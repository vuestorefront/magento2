<template>
  <OrderSummaryRow>
    <template #label>
      <slot name="label" />
    </template>
    <template #value>
      <div>
        {{ address.firstname }} {{ address.lastname }}
      </div>
      <div>
        {{ address.street.join(' ') }}
      </div>
      <div>
        {{ address.city }},
        {{ address.region }},
        {{ address.postcode }},
      </div>
      <div>
        {{ countryName }},
      </div>
      <div>
        {{ address.telephone }}
      </div>
    </template>
  </OrderSummaryRow>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api';
import type { CustomerOrder, Country } from '~/modules/GraphQL/types';
import OrderSummaryRow from '~/modules/customer/pages/MyAccount/OrderHistory/OrderSummaryRow.vue';

type Address = CustomerOrder['billing_address'] | CustomerOrder['shipping_address'];
export default defineComponent({
  components: {
    OrderSummaryRow,
  },
  props: {
    address: {
      type: Object as PropType<Address>,
      required: true,
    },
    countries: {
      type: Array as PropType<Country[]>,
      required: true,
    },
  },
  setup(props) {
    const countryName = computed(
      () => props.countries.find(({ id }) => props.address.country_code === id).full_name_locale,
    );

    return {
      countryName,
    };
  },
});
</script>
