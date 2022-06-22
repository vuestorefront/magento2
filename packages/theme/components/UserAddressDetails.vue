<template>
  <div>
    <p :style="userAddress.isDefault ? 'font-weight: bold;' : ''">
      {{ userAddress.firstName }} {{ userAddress.lastName }}
    </p>
    <p>{{ userAddress.street }}, {{ userAddress.streetNumber }}</p>

    <p>
      {{ userAddress.city }}, {{ userAddress.province }} -
      {{ userAddress.postalCode }}
    </p>

    <p>
      <slot name="country">
        {{ userAddress.country }}
      </slot>
    </p>

    <p
      v-if="userAddress.phone"
      class="phone"
    >
      {{ userAddress.phone }}
    </p>
    <div
      v-if="isDefaultShippingText || isDefaultBillingText"
      class="badge-container"
    >
      <span
        v-if="isDefaultShippingText"
        class="badge-container__badge sf-badge sf-badge--number color-primary"
      >
        {{ $t(isDefaultShippingText) }}
      </span>
      <span
        v-if="isDefaultBillingText"
        class="badge-container__badge sf-badge sf-badge--number color-primary"
      >
        {{ $t(isDefaultBillingText) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { toRef, computed, defineComponent } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';
import type { TransformedCustomerAddress } from '~/modules/customer/composables/types';

export default defineComponent({
  name: 'UserAddressDetails',
  props: {
    address: {
      type: Object as PropType<TransformedCustomerAddress>,
      required: true,
    },
  },
  setup(props) {
    const address = toRef(props, 'address');

    const userAddress = computed(() => ({
      firstName: userAddressesGetters.getFirstName(address.value),
      lastName: userAddressesGetters.getLastName(address.value),
      street: userAddressesGetters.getStreetName(address.value),
      streetNumber: userAddressesGetters.getApartmentNumber(address.value),
      postalCode: userAddressesGetters.getPostCode(address.value),
      city: userAddressesGetters.getCity(address.value),
      province: userAddressesGetters.getProvince(address.value) || '',
      country: userAddressesGetters.getCountry(address.value),
      phone: userAddressesGetters.getPhone(address.value),
      isDefault: userAddressesGetters.isDefault(address.value),
      isDefaultShipping: userAddressesGetters.isDefaultShipping(address.value),
      isDefaultBilling: userAddressesGetters.isDefaultBilling(address.value),
    }));

    const isDefaultShippingText = computed(() => (userAddress.value.isDefaultShipping ? 'Default Shipping Address' : ''));

    const isDefaultBillingText = computed(() => (userAddress.value.isDefaultBilling ? 'Default Billing Address' : ''));

    return {
      userAddress,
      isDefaultShippingText,
      isDefaultBillingText,
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.phone {
  margin-top: var(--spacer-base);
}

.badge-container {
  margin-top: var(--spacer-sm);
  display: flex;
  gap: var(--spacer-xs);
  flex-wrap: wrap;
  &__badge {
    display: inline-block; /* have to reset due to style spill from Storefront UI */
    flex-grow: 1;
  }
}
</style>
