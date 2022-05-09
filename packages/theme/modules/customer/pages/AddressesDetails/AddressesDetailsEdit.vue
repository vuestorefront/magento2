<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t(isNewAddress ? 'Add the address' : 'Update the address')">
        <p
          v-t="'Contact details updated'"
          class="message"
        />
        <AddressForm
          v-if="!$fetchState.pending"
          :address="address"
          :is-new="isNewAddress"
          @submit="saveOrUpdateAddress"
        />
      </SfTab>
    </SfTabs>
  </transition>
</template>

<script lang="ts">
import {
  ref, useFetch, defineComponent, useRouter, useContext,
} from '@nuxtjs/composition-api';
import { SfTabs } from '@storefront-ui/vue';
import AddressForm from '~/modules/customer/pages/AddressesDetails/AddressForm.vue';
import { useAddresses } from '../../composables/useAddresses';
import userAddressesGetters from '../../getters/userAddressesGetters';

export default defineComponent({
  components: { SfTabs, AddressForm },
  props: {
    addressId: {
      type: Number,
      required: true,
    },
    isNewAddress: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const address = ref(null);

    const { load, update, save } = useAddresses();

    const router = useRouter();
    const context = useContext();

    useFetch(async () => {
      const addressesData = await load();
      address.value = userAddressesGetters
        .getAddresses(addressesData)
        .find(({ id }) => id === props.addressId);
    });

    const saveOrUpdateAddress = async ({ form, onError }) => {
      try {
        // TODO this is weird, just use emiit save and emit update
        await (props.isNewAddress ? save : update)({ address: form });
        await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
      } catch (error) {
        onError(error);
      }
    };

    return {
      address,
      saveOrUpdateAddress,
    };
  },

});

</script>

<style lang="scss" scoped>
.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}
</style>
