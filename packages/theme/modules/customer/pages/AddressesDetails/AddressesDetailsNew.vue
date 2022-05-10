<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t('Add the address')">
        <p
          v-t="'Contact details added'"
          class="message"
        />
        <AddressForm
          v-if="!$fetchState.pending"
          @submit="create"
        >
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
import { useAddresses } from '~/composables';
import AddressForm from '~/modules/customer/pages/AddressesDetails/AddressForm.vue';

export default defineComponent({
  name: 'AddressesDetailsNew',
  components: { SfTabs, AddressForm },
  setup() {
    const context = useContext();
    const router = useRouter();
    const useAddressesComposable = useAddresses();

    const create = async ({ form, onError }) => {
      try {
        await useAddressesComposable.update({ address: form });
        await router.push(context.localeRoute({ name: 'customer-addresses-details' }));
      } catch (error) {
        onError(error);
      }
    };

    return {
      create,
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
