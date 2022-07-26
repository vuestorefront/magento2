<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t('Update the address')">
        <p
          v-t="'Contact details updated'"
          class="message"
        />
        <AddressForm
          :address="address || undefined /* use default address prop value during loading */"
          :loading="$fetchState.pending"
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
import AddressForm from '~/modules/customer/pages/MyAccount/AddressesDetails/AddressForm.vue';

import { useAddresses } from '~/modules/customer/composables/useAddresses';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';

import type { CustomerAddress } from '~/modules/GraphQL/types';
import type { SubmitEventPayload } from '~/modules/customer/types/form';

export default defineComponent({
  name: 'AddressEdit',
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

    const { load: loadAddress, update: updateAddress } = useAddresses();
    const address = ref(null);
    const numericAddressId = Number.parseInt(props.addressId, 10); // because in below find(), CustomerAddress['id'] is numeric

    useFetch(async () => {
      const addressesData = await loadAddress();
      address.value = userAddressesGetters
        .getAddresses(addressesData)
        .find(({ id }) => id === numericAddressId);
    });

    const update = async ({ form } : SubmitEventPayload<CustomerAddress>) => {
      await updateAddress({ address: { ...form, id: numericAddressId } });
      await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
    };

    return { address, update };
  },
});

</script>

<style lang="scss" scoped>
@import "../../styles/shared.scss";

</style>
