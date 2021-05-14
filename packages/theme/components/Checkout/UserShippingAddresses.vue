<template>
  <div>
    <SfAddressPicker
      :selected="currentAddressId"
      class="shipping-addresses"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        class="shipping-addresses__address"
        :name="String(userShippingGetters.getId(shippingAddress))"
      >
        <UserShippingAddress :address="shippingAddress" />
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      v-show="currentAddressId"
      :selected="value"
      name="setAsDefault"
      label="Use this address as my default one."
      class="shipping-address-setAsDefault"
      @change="$emit('input', $event)"
    />
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker,
} from '@storefront-ui/vue';
import { useUserShipping, userShippingGetters } from '@vue-storefront/magento';
import UserShippingAddress from '~/components/UserShippingAddress';

export default {
  name: 'UserShippingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker,
    UserShippingAddress,
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
  },
  setup(_, { emit }) {
    const { shipping: userShipping } = useUserShipping();

    const setCurrentAddress = (addressId) => {
      const selectedAddress = userShippingGetters.getAddresses(userShipping.value, { id: addressId });

      if (!selectedAddress || !selectedAddress.length) {
        return;
      }

      emit('setCurrentAddress', selectedAddress[0]);
    };

    const shippingAddresses = userShippingGetters.getAddresses(userShipping.value);

    return {
      setCurrentAddress,
      shippingAddresses,
      userShippingGetters,
    };
  },
};
</script>

<style lang="scss">
.shipping-addresses {
  @include for-desktop {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }
  margin-bottom: var(--spacer-xl);
  &__address {
    margin-bottom: var(--spacer-sm);
  }
}

.shipping-address-setAsDefault, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
