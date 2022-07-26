<template>
  <transition name="fade">
    <SfTabs class="tab-orphan">
      <SfTab :title="$t('Addresses details')">
        <p
          v-t="'Manage addresses'"
          class="message"
        />
        <template v-if="$fetchState.pending">
          <div
            v-for="number in 5"
            :key="number"
            class="address-skeleton"
          >
            <span>
              <SkeletonLoader
                class="address-skeleton__item"
                width="10em"
              />
              <SkeletonLoader
                class="address-skeleton__item"
                width="10em"
              />
              <SkeletonLoader
                class="address-skeleton__item"
                width="15em"
              />
              <SkeletonLoader
                class="address-skeleton__item"
                width="10em"
              />
            </span>
            <span class="address-skeleton__button">
              <SkeletonLoader
                width="131px"
                height="51px"
                margin="0"
              />
              <SkeletonLoader
                class="desktop-only"
                width="131px"
                height="51px"
                margin="0 0 0 var(--spacer-base) "
              />
            </span>
          </div>
        </template>
        <transition-group
          v-else
          tag="div"
          name="fade"
          class="addresses-list"
        >
          <div
            v-for="address in addressesWithCountryName"
            :key="getId(address)"
            class="addresses"
          >
            <div class="addresses__content">
              <div class="addresses__address">
                <UserAddressDetails :address="address">
                  <template #country>
                    {{ address.countryName }}
                  </template>
                </UserAddressDetails>
              </div>
            </div>
            <div class="addresses__actions">
              <SfButton @click="goToEditAddressPage(address.id)">
                {{ $t('Change') }}
              </SfButton>

              <SfButton
                v-if="!isDefault(address)"
                class="desktop-only color-light addresses__button-delete"
                @click="removeAddress(address)"
              >
                {{ $t('Delete') }}
              </SfButton>
            </div>
            <SvgImage
              v-if="!isDefault(address)"
              icon="cross"
              :label="$t('Remove Address')"
              role="button"
              width="14"
              height="14"
              class="smartphone-only addresses__remove"
              @click.native="removeAddress(address)"
            />
          </div>
        </transition-group>
        <SfButton
          class="action-button"
          @click="goToCreateAddressPage()"
        >
          {{ $t('Add new address') }}
        </SfButton>
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script lang="ts">
import { SfTabs, SfButton } from '@storefront-ui/vue';
import {
  defineComponent,
  useRouter,
  useContext,
  ref,
  computed,
  useFetch,
} from '@nuxtjs/composition-api';
import { useAddresses } from '~/modules/customer/composables/useAddresses';
import userAddressesGetters from '~/modules/customer/getters/userAddressesGetters';
import SvgImage from '~/components/General/SvgImage.vue';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import { CustomerAddress } from '~/modules/GraphQL/types';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import { useCountrySearch } from '~/composables/useCountrySearch';
import type { Country } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'AddressesDetails',
  components: {
    SfTabs,
    SfButton,
    SvgImage,
    UserAddressDetails,
    SkeletonLoader,
  },
  setup() {
    const context = useContext();
    const router = useRouter();

    const userAddresses = ref<CustomerAddress[]>([]);
    const countries = ref<Country[]>([]);
    const { load, remove } = useAddresses();
    const { load: loadCountries } = useCountrySearch();

    const { fetch } = useFetch(async () => {
      const [addressesResponse, countriesResponse] = await Promise.all([load(), loadCountries()]);
      userAddresses.value = userAddressesGetters.getAddresses(addressesResponse);
      countries.value = countriesResponse;
    });

    const goToCreateAddressPage = () => router.push(
      context.localeRoute({ name: 'customer-addresses-details-new' }),
    );

    const goToEditAddressPage = (addressId: number) => router.push(
      context.localeRoute({ name: 'customer-addresses-details-edit', params: { addressId: String(addressId) } }),
    );

    const removeAddress = async (address: CustomerAddress) => {
      await remove({ address });
      fetch();
    };

    const addressesWithCountryName = computed(() => userAddresses.value.map((address) => ({
      ...address,
      countryName: countries.value
        .find(({ id }) => id === address.country_code)
        ?.full_name_locale
        ?? address.country_code,
    })));

    return {
      countries,
      userAddresses,
      addressesWithCountryName,
      goToCreateAddressPage,
      goToEditAddressPage,
      removeAddress,
      getId: userAddressesGetters.getId,
      isDefault: userAddressesGetters.isDefault,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/shared.scss";

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

.address-skeleton {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: {
    top: var(--spacer-xl);
    bottom: var(--spacer-xl);
  }
  border-top: 1px solid var(--c-light);

  &__item {
    display: block;
    line-height: 1.6;
  }

  &__button {
    align-self: center;
  }
}
</style>
