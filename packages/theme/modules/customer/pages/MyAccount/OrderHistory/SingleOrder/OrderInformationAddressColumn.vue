<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@nuxtjs/composition-api';
import type { Country, OrderAddress } from '~/modules/GraphQL/types';

export default defineComponent({
  props: {
    address: {
      type: Object as PropType<OrderAddress>,
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
