<template>
  <transition name="fade">
    <SfTabs
      v-if="editingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        :title="isNewAddress ? 'Add the address' : 'Update the address'"
      >
        <p class="message">
          {{ $t('Contact details updated') }}
        </p>

        <BillingAddressForm
          :address="activeAddress"
          :is-new="isNewAddress"
          @submit="saveAddress"
        />
      </SfTab>
    </SfTabs>

    <SfTabs
      v-else
      key="address-list"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab title="Billing details">
        <p class="message">
          {{ $t('Manage billing addresses') }}
        </p>
        <transition-group
          tag="div"
          name="fade"
          class="billing-list"
        >
          <div
            v-for="address in addresses"
            :key="userBillingGetters.getId(address)"
            class="billing"
          >
            <div class="billing__content">
              <div class="billing__address">
                <UserBillingAddress :address="address" />
              </div>
            </div>
            <div class="billing__actions">
              <SfIcon
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="removeAddress(address)"
              />
              <SfButton
                @click="changeAddress(address)"
              >
                {{ $t('Change') }}
              </SfButton>

              <SfButton
                v-if="!userBillingGetters.isDefault(address)"
                class="color-light billing__button-delete desktop-only"
                @click="removeAddress(address)"
              >
                {{ $t('Delete') }}
              </SfButton>
            </div>
          </div>
        </transition-group>
        <SfButton
          class="action-button"
          @click="changeAddress()"
        >
          {{ $t('Add new address') }}
        </SfButton>
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script lang="ts">
import {
  SfTabs,
  SfButton,
  SfIcon,
} from '@storefront-ui/vue';
import { useUserBilling, userBillingGetters } from '@vue-storefront/magento';
import { ref, computed, defineComponent } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import BillingAddressForm from '~/components/MyAccount/BillingAddressForm.vue';
import UserBillingAddress from '~/components/UserBillingAddress.vue';

export default defineComponent({
  name: 'BillingDetails',
  components: {
    SfTabs,
    SfButton,
    SfIcon,
    UserBillingAddress,
    BillingAddressForm,
  },
  setup() {
    const {
      billing,
      load: loadUserBilling,
      addAddress,
      deleteAddress,
      updateAddress,
    } = useUserBilling();
    const addresses = computed(() => userBillingGetters.getAddresses(billing.value));
    const editingAddress = ref(false);
    const activeAddress = ref();
    const isNewAddress = computed(() => !activeAddress.value);

    const changeAddress = (address) => {
      activeAddress.value = address;
      editingAddress.value = true;
    };

    const removeAddress = async (address) => {
      const isDefault = userBillingGetters.isDefault(address);

      if (!isDefault) {
        await deleteAddress({ address });
      }
    };

    const saveAddress = async ({ form, onComplete, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        const data = await actionMethod({ address: form });
        editingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    onSSR(async () => {
      await loadUserBilling();
    });

    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userBillingGetters,
      addresses,
      editingAddress,
      activeAddress,
      isNewAddress,
    };
  },
});
</script>

<style lang='scss' scoped>

.message {
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
  margin: 0 0 var(--spacer-base);
}

.billing-list {
  margin-bottom: var(--spacer-base);
}

.billing {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }

  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }

  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }

  &__button-delete {
    color: var(--c-link);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }

  &__address {
    margin: 0;

    p {
      margin: 0;
    }
  }

  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}

.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}

.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }

      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
