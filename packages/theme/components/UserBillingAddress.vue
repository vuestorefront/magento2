<template>
  <div>
    <p
      :style="userBillingAddress.isDefault ? 'font-weight: bold;' : ''"
    >
      {{ userBillingAddress.firstName }} {{ userBillingAddress.lastName }}
    </p>
    <p>{{ userBillingAddress.street }}, {{ userBillingAddress.streetNumber }}</p>

    <p>
      {{ userBillingAddress.city }}, {{ userBillingAddress.province }} -
      {{ userBillingAddress.postalCode }}
    </p>

    <p>{{ userBillingAddress.country }}</p>
    <p
      v-if="userBillingAddress.phone"
      class="phone"
    >
      {{ userBillingAddress.phone }}
    </p>
  </div>
</template>

<script lang="ts">
import { toRef, computed, defineComponent } from '@vue/composition-api';
import { userBillingGetters } from '@vue-storefront/magento';

export default defineComponent({
  name: 'UserBillingAddress',
  props: {
    address: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const address = toRef(props, 'address');

    const userBillingAddress = computed(() => ({
      firstName: userBillingGetters.getFirstName(address.value),
      lastName: userBillingGetters.getLastName(address.value),
      street: userBillingGetters.getStreetName(address.value),
      streetNumber: userBillingGetters.getApartmentNumber(address.value),
      postalCode: userBillingGetters.getPostCode(address.value),
      city: userBillingGetters.getCity(address.value),
      province: userBillingGetters.getProvince(address.value) || '',
      country: userBillingGetters.getCountry(address.value),
      phone: userBillingGetters.getPhone(address.value),
      isDefault: userBillingGetters.isDefault(address.value),
    }));

    return {
      userBillingAddress,
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
