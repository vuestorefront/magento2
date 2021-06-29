<template>
  <div>
    <p
      :style="userShippingAddress.isDefault ? 'font-weight: bold;' : ''"
    >
      {{ userShippingAddress.firstName }} {{ userShippingAddress.lastName }}
      <small
        v-if="addressDefaultText"
      >
        - {{ addressDefaultText }}
      </small>
    </p>
    <p>{{ userShippingAddress.street }}, {{ userShippingAddress.streetNumber }}</p>

    <p>
      {{ userShippingAddress.city }}, {{ userShippingAddress.province }} -
      {{ userShippingAddress.postalCode }}
    </p>

    <p>{{ userShippingAddress.country }}</p>
    <p
      v-if="userShippingAddress.phone"
      class="phone"
    >
      {{ userShippingAddress.phone }}
    </p>
  </div>
</template>

<script lang="ts">
import {
  toRef,
  computed,
  defineComponent,
} from '@vue/composition-api';
import { userAddressesGetters } from '@vue-storefront/magento';

export default defineComponent({
  name: 'UserShippingAddress',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const address = toRef(props, 'address');

    const userShippingAddress = computed(() => ({
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

    const addressDefaultText = computed(() => {
      if (userShippingAddress.value.isDefaultShipping) return 'Default Shipping Address';
      if (userShippingAddress.value.isDefaultBilling) return 'Default Billing Address';
      return '';
    });

    return {
      userShippingAddress,
      addressDefaultText,
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
</style>
