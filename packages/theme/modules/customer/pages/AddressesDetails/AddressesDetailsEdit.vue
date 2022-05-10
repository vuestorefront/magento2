<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t('Update the address')">
        <p
          v-t="'Contact details updated'"
          class="message"
        />
        <AddressForm
          v-if="!$fetchState.pending"
          :address="address"
          @submit="update"
        >
          <template #submit-button-content>
            {{ $t('Update the address') }}
          </template>
        </AddressForm>
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
import { useAddresses } from '~/modules/customer/composables/useAddresses';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';

export default defineComponent({
  name: 'AddressesDetailsEdit',
  components: { SfTabs, AddressForm },
  props: {
    addressId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const context = useContext();

    // because CustomerAddress['id'] is numeric for below find expr.
    const numericAddressId = Number.parseInt(props.addressId, 10);

    const addressesComposable = useAddresses();
    const address = ref(null);
    useFetch(async () => {
    // TODO don't fetch all addresses just to pluck one address
      const addressesData = await addressesComposable.load();
      address.value = userAddressesGetters
        // @ts-expect-error Doesn't have to be TransformedCustomerAddress
        .getAddresses(addressesData)
        .find(({ id }) => id === numericAddressId);
    });

    const update = async ({ form, onError }) => {
      try {
        await addressesComposable.update({ address: { ...form, id: numericAddressId } });
        await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
      } catch (error) {
        onError(error);
      }
    };

    return {
      address,
      update,
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
