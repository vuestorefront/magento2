<template>
  <div>
    <p
      :style="userShippingAddress.isDefault ? 'font-weight: bold;' : ''"
    >
      {{ userShippingAddress.firstName }} {{ userShippingAddress.lastName }}
    </p>
    <p>{{ userShippingAddress.street }}, {{ userShippingAddress.streetNumber }}</p>

    <p>
      {{ userShippingAddress.city }}, {{ userShippingAddress.province }} - {{ userShippingAddress.postalCode }}
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
import { userShippingGetters } from '@vue-storefront/magento';

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
      firstName: userShippingGetters.getFirstName(address.value),
      lastName: userShippingGetters.getLastName(address.value),
      street: userShippingGetters.getStreetName(address.value),
      streetNumber: userShippingGetters.getApartmentNumber(address.value),
      postalCode: userShippingGetters.getPostCode(address.value),
      city: userShippingGetters.getCity(address.value),
      province: userShippingGetters.getProvince(address.value) || '',
      country: userShippingGetters.getCountry(address.value),
      phone: userShippingGetters.getPhone(address.value),
      isDefault: userShippingGetters.isDefault(address.value),
    }));

    return {
      userShippingAddress,
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
