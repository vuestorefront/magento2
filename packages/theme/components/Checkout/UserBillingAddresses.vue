<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="billing__addresses"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="billingAddress in billingAddresses"
        :key="userBillingGetters.getId(billingAddress)"
        :name="`${userBillingGetters.getId(billingAddress)}`"
        class="billing__address"
      >
        <UserAddressDetails :address="billingAddress" />
      </SfAddress>
    </SfAddressPicker>
    <SfCheckbox
      :selected="value"
      name="setAsDefault"
      label="Use this address as my default one."
      class="billing__setAsDefault"
      @change="$emit('input', $event)"
    />
    <hr class="sf-divider">
  </div>
</template>

<script>
import {
  SfCheckbox,
  SfAddressPicker,
} from '@storefront-ui/vue';
import {
  useUserBilling,
  userBillingGetters,
} from '@vue-storefront/magento';
import {
  defineComponent,
} from '@vue/composition-api';
import UserAddressDetails from '~/components/UserAddressDetails.vue';

export default defineComponent({
  name: 'UserBillingAddresses',
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
  },
  emits: ['setCurrentAddress'],
  setup(_, { emit }) {
    const { billing: userBilling } = useUserBilling();

    const setCurrentAddress = (addressId) => {
      const selectedAddress = userBillingGetters.getAddresses(userBilling.value, { id: Number.parseInt(addressId, 10) });
      if (!selectedAddress || selectedAddress.length === 0) {
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
});
</script>

<style lang="scss" scoped>
.billing {
  &__address {
    margin-bottom: var(--spacer-base);
    @include for-desktop {
      margin-right: var(--spacer-sm);
      display: flex;
      width: 100%;
      flex-direction: column;
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

.sf-divider, .form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
