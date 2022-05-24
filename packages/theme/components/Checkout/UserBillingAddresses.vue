<template>
  <div>
    <SfAddressPicker
      :selected="`${selectedAddress}`"
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
import { SfCheckbox, SfAddressPicker } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import userBillingGetters from '~/modules/customer/getters/userBillingGetters';
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
    billingAddresses: {
      type: Array,
      required: true,
    },
  },
  emits: ['setCurrentAddress'],
  setup(props, { emit }) {
    const setCurrentAddress = (addressId) => {
      const selectedAddress = props.billingAddresses.find((address) => address.id === Number(addressId));
      if (!selectedAddress || selectedAddress.length === 0) {
        return;
      }

      emit('setCurrentAddress', selectedAddress);
    };

    const selectedAddress = computed(() => (
      props.currentAddressId
        ? props.currentAddressId
        : props.billingAddresses.find((address) => address.default_billing)?.id ?? ''
    ));

    return {
      selectedAddress,
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

.sf-divider,
.form__action-button--margin-bottom {
  margin-bottom: var(--spacer-xl);
}
</style>
