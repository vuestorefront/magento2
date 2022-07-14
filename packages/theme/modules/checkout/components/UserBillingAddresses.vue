<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="addresses"
      @change="emitSetCurrentAddress($event)"
    >
      <SfAddress
        v-for="billingAddress in addressesWithCountryName"
        :key="userBillingGetters.getId(billingAddress)"
        :name="`${userBillingGetters.getId(billingAddress)}`"
        class="address"
      >
        <UserAddressDetails :address="billingAddress">
          <template #country>
            {{ billingAddress.countryName }}
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
import userBillingGetters from '~/modules/customer/getters/userBillingGetters';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import type { Country, CustomerAddress } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'UserBillingAddresses',
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
    billingAddresses: {
      type: Array as PropType<CustomerAddress[]>,
      required: true,
    },
    countries: {
      type: Array as PropType<Country[]>,
      default: () => [],

    },
  },
  emits: ['setCurrentAddress'],
  setup(props, { emit }) {
    const emitSetCurrentAddress = (addressId: number) => {
      const address = props.billingAddresses.find(({ id }) => id === Number(addressId));
      if (address) {
        emit('setCurrentAddress', address);
      }
    };
    const addressesWithCountryName = computed(() => props.billingAddresses.map((address) => ({
      ...address,
      countryName: props.countries
        .find(({ id }) => id === address.country_code)
        ?.full_name_locale
        ?? address.country_code,
    })));

    return {
      emitSetCurrentAddress,
      addressesWithCountryName,
      userBillingGetters,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./styles/userAddresses";
</style>
