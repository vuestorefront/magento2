<template>
  <div>
    <SfAddressPicker
      :selected="`${currentAddressId}`"
      class="shipping__addresses"
      @change="setCurrentAddress($event)"
    >
      <SfAddress
        v-for="shippingAddress in shippingAddresses"
        :key="userShippingGetters.getId(shippingAddress)"
        class="shipping__address"
        :name="`${userShippingGetters.getId(shippingAddress)}`"
      >
        <UserShippingAddress
          :address="shippingAddress"
        />
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

<script>
import {
  SfCheckbox,
  SfAddressPicker,
} from '@storefront-ui/vue';
import { useUserShipping, userShippingGetters } from '@vue-storefront/magento';
import { computed } from '@vue/composition-api';
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
  emits: ['setCurrentAddress'],
  setup(props, { emit }) {
    const { shipping: userShipping } = useUserShipping();

    const setCurrentAddress = (addressId) => {
      const selectedAddress = userShippingGetters.getAddresses(userShipping.value,
        { id: Number.parseInt(addressId, 10) });

      if (!selectedAddress) {
        return;
      }

      emit('setCurrentAddress', selectedAddress[0]);
    };

    const shippingAddresses = computed(() => userShippingGetters
      .getAddresses(userShipping.value));

    return {
      setCurrentAddress,
      shippingAddresses,
      userShippingGetters,
    };
  },
};
</script>

<style lang="scss" scoped>
.shipping {
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
      width: 100%;
      flex-direction: column;
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
