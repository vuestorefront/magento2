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
  ref, defineComponent, useFetch, useRouter, useContext,
} from '@nuxtjs/composition-api';
import { SfTabs } from '@storefront-ui/vue';
import AddressForm from '~/modules/customer/pages/AddressesDetails/AddressForm.vue';
import { useAddresses } from '~/modules/customer/composables/useAddresses';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';
import { CustomerAddress } from '~/modules/GraphQL/types';
import { SubmitEventPayload } from '../../types/form';

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

    const addressesComposable = useAddresses();
    const address = ref(null);
    const numericAddressId = Number.parseInt(props.addressId, 10); // because in below find(), CustomerAddress['id'] is numeric

    useFetch(async () => {
      const addressesData = await addressesComposable.load(); // TODO don't fetch all addresses just to pluck one address
      address.value = userAddressesGetters
        .getAddresses(addressesData)
        .find(({ id }) => id === numericAddressId);
    });

    const update = async ({ form } : SubmitEventPayload<CustomerAddress>) => {
      await addressesComposable.update({ address: { ...form, id: numericAddressId } });
      await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
    };

    return { address, update };
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
