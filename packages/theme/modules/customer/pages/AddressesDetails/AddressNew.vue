<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t('Add the address')">
        <p
          v-t="'Contact details updated'"
          class="message"
        />
        <AddressForm @submit="createAddress">
          <template #submit-button-content>
            {{ $t('Add the address') }}
          </template>
        </AddressForm>
      </SfTab>
    </SfTabs>
  </transition>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api';
import { SfTabs } from '@storefront-ui/vue';
import { useAddresses } from '~/modules/customer/composables/useAddresses';
import AddressForm from '~/modules/customer/pages/AddressesDetails/AddressForm.vue';
import { CustomerAddress } from '~/modules/GraphQL/types';
import { SubmitEventPayload } from '../../types/form';

export default defineComponent({
  name: 'AddressNew',
  components: { SfTabs, AddressForm },
  setup() {
    const context = useContext();
    const router = useRouter();
    const useAddressesComposable = useAddresses();

    const createAddress = async ({ form } : SubmitEventPayload<CustomerAddress>) => {
      await useAddressesComposable.save({ address: form });
      await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
    };

    return { createAddress };
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
