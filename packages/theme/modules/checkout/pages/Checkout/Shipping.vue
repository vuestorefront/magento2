<template>
  <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfHeading
      v-if="hasSavedShippingAddress"
      v-e2e="'shipping-heading'"
      :level="4"
      :title="$t('Select previously saved address')"
      class="sf-heading--left sf-heading--no-underline form-subtitle"
    />
    <form @submit.prevent="handleSubmit(handleAddressSubmit(reset))">
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        v-model="isSetAsDefaultRequested"
        v-e2e="'shipping-addresses'"
        :current-address-id="currentAddressId"
        :shipping-addresses="addresses"
        :countries="countries"
        @setCurrentAddress="handleSetCurrentAddress($event)"
      />
      <div
        v-if="isAddNewAddressFormVisible"
        class="form"
      >
        <SfHeading
          v-if="hasSavedShippingAddress"
          v-e2e="'shipping-heading'"
          :level="4"
          :title="$t('Enter different address')"
          class="sf-heading--left sf-heading--no-underline form-subtitle"
        />
        <ValidationProvider
          v-slot="{ errors }"
          name="firstname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-firstName'"
            :value="shippingDetails.firstname"
            :label="$t('First Name')"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input=" changeShippingDetails('firstname', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-lastName'"
            :value="shippingDetails.lastname"
            :label="$t('Last Name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('lastname', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required"
          slim
        >
          <SfInput
            v-e2e="'shipping-streetName'"
            :value="shippingDetails.street"
            :label="$t('Street Name')"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('street', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="apartment"
          rules="required|min:1"
          slim
        >
          <SfInput
            v-e2e="'shipping-apartment'"
            :value="shippingDetails.apartment"
            :label="$t('House/Apartment number')"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('apartment', $event) "
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="city"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-city'"
            :value="shippingDetails.city"
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('city', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="region"
          :rules="
            !shippingDetails.country_code || regionInformation.length === 0
              ? null
              : 'required|min:2'
          "
          slim
        >
          <SfInput
            v-if="
              !shippingDetails.country_code || regionInformation.length === 0
            "
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            :label="$t('State/Province')"
            :disabled="!shippingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            :valid="!!shippingDetails.country_code"
            :error-message="
              !shippingDetails.country_code
                ? $t('Please select a country first')
                : ''
            "
            @input="changeShippingDetails('region', $event)"
          />
          <SfSelect
            v-else
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            :label="$t('State/Province')"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('region', $event)"
          >
            <SfSelectOption :value="''" />
            <SfSelectOption
              v-for="regionOption in regionInformation"
              :key="regionOption.id"
              :value="regionOption.abbreviation"
            >
              {{ regionOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="country"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-e2e="'shipping-country'"
            :value="shippingDetails.country_code"
            :label="$t('Country')"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeCountry"
          >
            <SfSelectOption :value="''" />
            <SfSelectOption
              v-for="countryOption in countriesList"
              :key="countryOption.id"
              :value="countryOption.abbreviation"
            >
              {{ countryOption.label }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="zipCode"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-zipcode'"
            :value="shippingDetails.postcode"
            :label="$t('Zip-code')"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('postcode', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="phone"
          rules="required|min:8"
          slim
        >
          <SfInput
            v-model="shippingDetails.telephone"
            v-e2e="'shipping-phone'"
            :label="$t('Phone number')"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeShippingDetails('telephone', $event)"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!isAddNewAddressFormVisible"
        class="color-light form__action-button form__action-button--add-address"
        type="submit"
        @click="handleAddNewAddressBtnClick"
      >
        {{ $t('Add new address') }}
      </SfButton>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-if="!(isShippingDetailsStepCompleted && !dirty)"
            v-e2e="'select-shipping'"
            :disabled="isShippingLoading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isShippingDetailsStepCompleted && !dirty"
        :shipping-methods="shippingMethods"
        @submit="$router.push(localeRoute({ name: 'billing' }))"
      />
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {
  SfHeading, SfInput, SfButton, SfSelect,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  onMounted,
  defineComponent,
  useRouter,
  useContext,
} from '@nuxtjs/composition-api';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import userShippingGetters from '~/modules/customer/getters/userShippingGetters';
import addressGetter from '~/modules/customer/getters/addressGetter';
import { useCountrySearch } from '~/composables';
import type {
  Country, AvailableShippingMethod, CustomerAddress, Customer,
} from '~/modules/GraphQL/types';
import useShipping from '~/modules/checkout/composables/useShipping';
import useUser from '~/modules/customer/composables/useUser';
import useUserAddress from '~/modules/customer/composables/useUserAddress';
import {
  addressFromApiToForm, CheckoutAddressForm, findUserAddressIdenticalToSavedCartAddress, getInitialCheckoutAddressForm,
} from '~/helpers/checkout/address';
import { mergeItem } from '~/helpers/asyncLocalStorage';
import { isPreviousStepValid } from '~/helpers/checkout/steps';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
extend('digits', {
  ...digits,
  message: 'Please provide a valid phone number',
});

export default defineComponent({
  name: 'ShippingStep',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () => import('~/modules/checkout/components/UserShippingAddresses.vue'),
    VsfShippingProvider: () => import('~/modules/checkout/components/VsfShippingProvider.vue'),
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const userShipping = ref<Customer | null>(null);
    const {
      load: loadShipping,
      save: saveShipping,
      loading: isShippingLoading,
    } = useShipping();
    const {
      load: loadUserShipping,
      setDefaultAddress,
    } = useUserAddress();

    const {
      load: loadCountries,
      search: searchCountry,
    } = useCountrySearch();
    const countries = ref<Country[]>([]);
    const country = ref<Country | null>(null);
    const { isAuthenticated } = useUser();
    const shippingDetails = ref<CheckoutAddressForm>(getInitialCheckoutAddressForm());
    const shippingMethods = ref<AvailableShippingMethod[]>([]);
    const currentAddressId = ref<number | null>(null);

    const isSetAsDefaultRequested = ref(false);
    const isFormSubmitted = ref(false);
    const isAddNewAddressFormVisible = ref(true);

    const isShippingDetailsStepCompleted = ref(false);
    const addresses = computed(() => userShippingGetters.getAddresses(userShipping.value));

    const canMoveForward = computed(() => !isShippingLoading.value && shippingDetails.value && Object.keys(
      shippingDetails.value,
    ).length > 0);

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      return addresses.value.length > 0;
    });

    const countriesList = computed(() => addressGetter.countriesList(countries.value));

    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const handleAddressSubmit = (reset: () => void) => async () => {
      const addressId = currentAddressId.value;
      const shippingDetailsData = {
        ...shippingDetails.value,
        customerAddressId: addressId,
        save_in_address_book: false,
      };
      await mergeItem('checkout', { shipping: shippingDetailsData });

      const shippingInfo = await saveShipping({ shippingDetails: shippingDetailsData });
      shippingMethods.value = shippingInfo?.available_shipping_methods ?? [];

      if (addressId !== null && isSetAsDefaultRequested.value) {
        const [chosenAddress] = userShippingGetters.getAddresses(
          userShipping.value,
          { id: addressId },
        );
        chosenAddress.default_shipping = isSetAsDefaultRequested.value;
        if (chosenAddress) {
          await setDefaultAddress({ address: chosenAddress });
          userShipping.value = await loadUserShipping(true);
        }
      }
      reset();
      isShippingDetailsStepCompleted.value = true;
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = null;
      shippingDetails.value = getInitialCheckoutAddressForm();
      isAddNewAddressFormVisible.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = async (customerAddress: CustomerAddress) => {
      const id = customerAddress?.id;
      currentAddressId.value = id;
      if (id) {
        isAddNewAddressFormVisible.value = false;
      }
      shippingDetails.value = addressFromApiToForm(customerAddress);
      country.value = customerAddress.country_code ? await searchCountry({ id: customerAddress.country_code }) : null;
      isShippingDetailsStepCompleted.value = false;
    };

    const changeShippingDetails = (field: keyof CheckoutAddressForm, value: string) => {
      shippingDetails.value[field] = value;
      isShippingDetailsStepCompleted.value = false;
      currentAddressId.value = null;
    };

    const changeCountry = async (id: string) => {
      changeShippingDetails('country_code', id);
      const newCountry = await searchCountry({ id });
      shippingDetails.value.region = '';
      country.value = newCountry;
    };

    onMounted(async () => {
      const validStep = await isPreviousStepValid('user-account');
      if (!validStep) {
        await router.push(app.localeRoute({ name: 'user-account' }));
      }
      const [loadedShippingInfoBoundToCart, loadedUserShipping, loadedCountries] = await Promise.all([
        loadShipping(),
        loadUserShipping(),
        loadCountries(),
      ]);
      const [defaultAddress = null] = userShippingGetters.getAddresses(loadedUserShipping, { default_shipping: true });
      const wasShippingAddressAlreadySetOnCart = Boolean(loadedShippingInfoBoundToCart);

      if (wasShippingAddressAlreadySetOnCart) {
        const userAddressIdenticalToSavedCartAddress = findUserAddressIdenticalToSavedCartAddress(
          loadedUserShipping?.addresses,
          loadedShippingInfoBoundToCart,
        );
        handleSetCurrentAddress({ ...loadedShippingInfoBoundToCart, id: userAddressIdenticalToSavedCartAddress?.id });
      } else if (defaultAddress) {
        handleSetCurrentAddress(defaultAddress);
      }
      if (shippingDetails.value?.country_code) {
        country.value = await searchCountry({ id: shippingDetails.value.country_code });
      }
      userShipping.value = loadedUserShipping;
      countries.value = loadedCountries;
    });

    return {
      isAddNewAddressFormVisible,
      canMoveForward,
      changeCountry,
      changeShippingDetails,
      countries,
      countriesList,
      country,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleAddressSubmit,
      handleSetCurrentAddress,
      hasSavedShippingAddress,
      isAuthenticated,
      isFormSubmitted,
      isShippingDetailsStepCompleted,
      isShippingLoading,
      regionInformation,
      searchCountry,
      isSetAsDefaultRequested,
      shippingDetails,
      shippingMethods,
      addresses,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      color: var(--c-text);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }

    ::v-deep .sf-select__label {
      left: initial;
    }
  }

  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    --button-width: auto;
  }

  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }

    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }

      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }

    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);

    &:hover {
      color: var(--c-white);
    }

    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title, .form-subtitle {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;

}

.form-subtitle {
  width: 100%;
  .sf-heading__title {
    font-weight: bold;
  }
}
</style>
