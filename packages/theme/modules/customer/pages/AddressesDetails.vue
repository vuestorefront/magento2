<template>
  <transition name="fade">
    <SfTabs
      v-if="editingAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        :title="isNewAddress ? $t('Add the address') : $t('Update the address')"
      >
        <p class="message">
          {{ $t('Contact details updated') }}
        </p>

        <AddressForm
          :address="activeAddress"
          :is-new="isNewAddress"
          v-if="activeAddress && activeAddress.id || isNewAddress"
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
      <SfTab :title="$t('Addresses details')">
        <p class="message">
          {{ $t('Manage addresses') }}
        </p>
        <transition-group
          tag="div"
          name="fade"
          class="addresses-list"
        >
          <div
            v-for="address in userAddresses"
            :key="getId(address)"
            class="addresses"
          >
            <div class="addresses__content">
              <div class="addresses__address">
                <UserAddressDetails :address="address" />
              </div>
            </div>
            <div class="addresses__actions">
              <SfButton @click="changeAddress(address)">
                {{ $t('Change') }}
              </SfButton>

              <SfButton
                v-if="!isDefault(address)"
                class="color-light addresses__button-delete desktop-only"
                @click="removeAddress(address)"
              >
                {{ $t('Delete') }}
              </SfButton>
            </div>
            <SvgImage
              icon="cross"
              :label="$t('Remove Address')"
              role="button"
              width="14"
              height="14"
              class="addresses__remove smartphone-only"
              @click.native="removeAddress(address)"
            />
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
<script>
import { SfTabs, SfButton } from '@storefront-ui/vue';
import {
  computed,
  defineComponent,
  useRouter,
  useRoute,
  useContext,
  ref,
  useFetch,
} from '@nuxtjs/composition-api';
import { useAddresses } from '~/composables';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';
import AddressForm from '~/modules/customer/components/AddressForm.vue';
import SvgImage from '~/components/General/SvgImage.vue';
import UserAddressDetails from '~/components/UserAddressDetails.vue';

export default defineComponent({
  name: 'ShippingDetails',
  components: {
    SfTabs,
    SfButton,
    AddressForm,
    SvgImage,
    UserAddressDetails,
  },
  setup() {
    const {
      load, remove, update, save,
    } = useAddresses();
    const router = useRouter();
    const route = useRoute();
    const { app } = useContext();
    const userAddresses = ref([]);
    const activeAddress = ref({});
    const getTranslatedUrlAddress = (title) => app.i18n.t(`${title}`).toLowerCase().replace(' ', '-');
    const isNewAddress = computed(() => route.value.query.id === 'new');
    const editingAddress = computed(() => !!route.value.query.id);
    const { fetch } = useFetch(async () => {
      const addressesData = await load();
      userAddresses.value = userAddressesGetters.getAddresses(addressesData);

      const activeAddressData = userAddresses.value
        .filter((address) => String(address?.id) === route.value.query.id)
        .pop();

      activeAddress.value = activeAddressData;
    });
    const changeAddress = async (address) => {
      const addressId = address?.id || 'new';

      await router.push(
        `${app.localePath({
          path: `/my-account/${getTranslatedUrlAddress('Addresses details')}`,
          query: { id: addressId },
        })}`,
      );
    };

    const removeAddress = async (address) => {
      const isDefault = userAddressesGetters.isDefault(address);
      if (!isDefault) {
        await remove({ address });
        fetch();
      }
    };

    const saveAddress = async ({ form, onError }) => {
      try {
        const actionMethod = isNewAddress.value ? save : update;
        const data = await actionMethod({ address: form });
        await router.push(
          app.localePath(
            `/my-account/${getTranslatedUrlAddress('Addresses details')}`,
          ),
        );
        userAddresses.value = userAddressesGetters.getAddresses(data);
      } catch (error) {
        onError(error);
      }
    };

    return {
      changeAddress,
      update,
      removeAddress,
      saveAddress,
      ...userAddressesGetters,
      userAddresses,
      editingAddress,
      activeAddress,
      isNewAddress,
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

.addresses-list {
  margin-bottom: var(--spacer-base);
}

.addresses {
  position: relative;
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);

  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }

  &__content {
    flex: 1 0 20%;
    color: var(--c-text);
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
  }

  &__actions {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;

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

  &__remove {
    position: absolute;
    top: var(--spacer-sm);
    right: 0;
    color: var(--c-gray-variant);
    cursor: pointer;
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
