<template>
  <div>
    <p><strong>{{ userShippingAddress.firstName }} {{ userShippingAddress.lastName }}</strong></p>
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

<script>
import { toRef, computed } from '@vue/composition-api';
import { userBillingGetters } from '@vue-storefront/magento';

export default {
  name: 'UserBillingAddress',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const address = toRef(props, 'address');

    const userShippingAddress = computed(() => ({
      firstName: userBillingGetters.getFirstName(address.value),
      lastName: userBillingGetters.getLastName(address.value),
      street: userBillingGetters.getStreetName(address.value),
      streetNumber: userBillingGetters.getApartmentNumber(address.value),
      postalCode: userBillingGetters.getPostCode(address.value),
      city: userBillingGetters.getCity(address.value),
      province: userBillingGetters.getProvince(address.value) || '',
      country: userBillingGetters.getCountry(address.value),
      phone: userBillingGetters.getPhone(address.value),
    }));

    return {
      userShippingAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.phone {
  margin-top: var(--spacer-base);
}
</style>
