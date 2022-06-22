<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="shipping__addresses"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in addressesWithCountryName"
        :key="userShippingGetters.getId(shippingAddress)"
        class="shipping__address"
        :name="`${userShippingGetters.getId(shippingAddress)}`"
      >
        <UserAddressDetails :address="shippingAddress">
          <template #country>
            {{ shippingAddress.countryName }}
          </template>
        </UserAddressDetails>
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      v-show="currentAddressId"
      :selected="value"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping__setAsDefault"
      @change="$emit('input', $event)"
    />
    <hr class="sf-divider">
  </div>
</template>

<script lang="ts">
import { SfCheckbox, SfAddressPicker } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';

import userShippingGetters from '~/modules/customer/getters/userShippingGetters';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import { TransformedCustomerAddress } from '~/modules/customer/composables/types';
import { Countries } from '~/composables';

export default defineComponent({
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker,
    UserAddressDetails,
  },
  props: {
    currentAddressId: {
      type: [String, Number],
      required: true,
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
    const setCurrentAddress = (addressId: string | number) => {
      const selectedAddress = props.shippingAddresses.find((address) => address.id === Number(addressId));
      if (!selectedAddress) {
        return;
      }

      emit('setCurrentAddress', selectedAddress);
    };

    const addressesWithCountryName = computed(() => props.shippingAddresses.map((address) => ({
      ...address,
      countryName: props.countries
        .find(({ id }) => id === address.country_code)
        ?.full_name_locale
        ?? address.country_code,
    })));

    return {
      setCurrentAddress,
      addressesWithCountryName,
      userShippingGetters,
    };
  },
});
</script>

<style lang="scss" scoped>
.shipping {
  &__address {
    margin-bottom: var(--spacer-base);
    @include for-desktop {
      margin-right: var(--spacer-sm);
      display: flex;
      width: calc(50% - var(--spacer-sm));
      flex-direction: column;
    }
  }

  &__addresses {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      display: flex;
      flex-wrap: wrap;
      margin-right: var(--spacer-sm)
    }
  }

  &__setAsDefault {
    margin-bottom: var(--spacer-xl);
  }
}

.sf-divider,
.form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
