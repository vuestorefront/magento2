<template>
  <div>
    <SfAddressPicker
      :selected="String(currentAddressId)"
      class="billing__addresses"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="userBillingGetters.getId(billingAddress)"
        :name="String(userBillingGetters.getId(billingAddress))"
        class="billing__address"
      >
        <UserBillingAddress :address="billingAddress" />
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      :selected="value"
      name="setAsDefault"
      label="Use this address as my default one."
      class="billing__setAsDefault"
      @change="$emit('input', $event)"
    />
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker,
} from '@storefront-ui/vue';
import { useUserBilling, userBillingGetters } from '@vue-storefront/magento';
import UserBillingAddress from '~/components/UserBillingAddress';

export default {
  name: 'UserBillingAddresses',
  components: {
    SfCheckbox,
    SfAddressPicker,
    UserBillingAddress,
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
    const { billing: userBilling } = useUserBilling();

    const setCurrentAddress = async (addressId) => {
      const selectedAddress = userBillingGetters.getAddresses(userBilling.value, { id: addressId });
      if (!selectedAddress || !selectedAddress.length) {
        return;
      }
      emit('setCurrentAddress', selectedAddress[0]);
    };

    const billingAddresses = userBillingGetters.getAddresses(userBilling.value);

    return {
      billingAddresses,
      setCurrentAddress,
      userBillingGetters,
    };
  },
};
</script>

<style lang="scss" scoped>
.billing {
  &__address {
    margin-bottom: var(--spacer-base);
    @include for-desktop {
      margin-right: var(--spacer-sm);
    }
  }
  &__addresses {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      display: flex;
    }
  }
  &__setAsDefault {
    margin-bottom: var(--spacer-xl);
  }
}
</style>
