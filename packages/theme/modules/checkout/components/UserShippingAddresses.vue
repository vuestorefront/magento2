<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="addresses"
      @change="emitSetCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in addressesWithCountryName"
        :key="userShippingGetters.getId(shippingAddress)"
        class="address"
        :name="`${userShippingGetters.getId(shippingAddress)}`"
      >
        <UserAddressDetails :address="shippingAddress">
          <template #country>
            {{ shippingAddress.countryName }}
          </template>
        </UserAddressDetails>
      </SfAddress>
    </SfAddressPicker>
    <hr class="sf-divider">
  </div>
</template>

<script lang="ts">
import { SfAddressPicker } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';

import userShippingGetters from '~/modules/customer/getters/userShippingGetters';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import { TransformedCustomerAddress } from '~/modules/customer/composables/types';
import { Countries } from '~/composables';

export default defineComponent({
  name: 'UserShippingAddresses',
  components: {
    SfAddressPicker,
    UserAddressDetails,
  },
  props: {
    currentAddressId: {
      type: Number,
      default: null,
    },
    value: {
      type: Boolean,
      required: true,
    },
    shippingAddresses: {
      type: Array as PropType<TransformedCustomerAddress[]>,
      required: true,
    },
    countries: {
      type: Array as PropType<Countries[]>,
      default: () => [],

    },
  },
  emits: ['setCurrentAddress'],
  setup(props, { emit }) {
    const emitSetCurrentAddress = (addressId: number) => {
      const address = props.shippingAddresses.find(({ id }) => id === Number(addressId));
      if (address) {
        emit('setCurrentAddress', address);
      }
    };
    const addressesWithCountryName = computed(() => props.shippingAddresses.map((address) => ({
      ...address,
      countryName: props.countries
        .find(({ id }) => id === address.country_code)
        ?.full_name_locale
        ?? address.country_code,
    })));

    return {
      emitSetCurrentAddress,
      addressesWithCountryName,
      userShippingGetters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/userAddresses";
</style>
