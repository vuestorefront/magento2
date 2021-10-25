<template>
  <ValidationObserver v-slot="{ handleSubmit, dirty, reset }">
    <SfHeading
      v-e2e="'shipping-heading'"
      :level="3"
      :title="$t('Shipping')"
      class="sf-heading--left sf-heading--no-underline title"
    />

    <form @submit.prevent="handleSubmit(handleAddressSubmit(reset))">
      <UserShippingAddresses
        v-if="isAuthenticated && hasSavedShippingAddress"
        v-model="setAsDefault"
        v-e2e="'shipping-addresses'"
        :current-address-id="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div
        v-if="canAddNewAddress"
        class="form"
      >
        <ValidationProvider
          v-slot="{ errors }"
          name="firstname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-firstName'"
            :value="shippingDetails.firstname"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="firstname => changeShippingDetails('firstname', firstname)"
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
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="lastname => changeShippingDetails('lastname', lastname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-streetName'"
            :value="shippingDetails.street"
            label="Street name"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="street => changeShippingDetails('street', street)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="apartment"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'shipping-apartment'"
            :value="shippingDetails.apartment"
            label="House/Apartment number"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="apartment => changeShippingDetails('apartment', apartment)"
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
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="city => changeShippingDetails('city', city)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="region"
          :rules="!shippingDetails.country_code || regionInformation.length === 0 ? null : 'required|min:2'"
          slim
        >
          <SfInput
            v-if="!shippingDetails.country_code || regionInformation.length === 0"
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            label="State/Province"
            :disabled="!shippingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            :valid="!!shippingDetails.country_code"
            :error-message="!shippingDetails.country_code ? 'Please select a country first' : ''"
            @input="region => changeShippingDetails('region', region)"
          />
          <SfSelect
            v-else
            v-e2e="'shipping-state'"
            :value="shippingDetails.region"
            label="State/Province"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="region => changeShippingDetails('region', region)"
          >
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
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="changeCountry"
          >
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
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="postcode => changeShippingDetails('postcode', postcode)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="phone"
          rules="required"
          slim
        >
          <SfInput
            v-model="shippingDetails.telephone"
            v-e2e="'shipping-phone'"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="telephone => changeShippingDetails('telephone', telephone)"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!canAddNewAddress"
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
            :disabled="loading"
            class="form__action-button"
            type="submit"
          >
            {{ $t('Select shipping method') }}
          </SfButton>
        </div>
      </div>
      <VsfShippingProvider
        v-if="isShippingDetailsStepCompleted && !dirty"
        @submit="$router.push('/checkout/billing')"
      />
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  watch,
  onMounted, defineComponent,
} from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import {
  addressGetter,
  useCountrySearch,
  userShippingGetters,
  useShipping,
  useUser,
  useUserShipping,
} from '@vue-storefront/magento';
import { required, min, digits } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { addressFromApiToForm } from '~/helpers/checkout/address';

const NOT_SELECTED_ADDRESS = '';

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
  name: 'Shipping',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    ValidationProvider,
    ValidationObserver,
    UserShippingAddresses: () => import('~/components/Checkout/UserShippingAddresses.vue'),
    VsfShippingProvider: () => import('~/components/Checkout/VsfShippingProvider.vue'),
  },
  setup() {
    const {
      load,
      save,
      loading,
      shipping: address,
    } = useShipping();
    const {
      shipping: userShipping,
      load: loadUserShipping,
      setDefaultAddress,
    } = useUserShipping();
    const {
      load: loadCountries,
      countries,
      search: searchCountry,
      country,
    } = useCountrySearch('Step:Shipping');
    const { isAuthenticated } = useUser();

    const shippingDetails = ref(addressFromApiToForm(address.value) || {});
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);

    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const canAddNewAddress = ref(true);

    const isShippingDetailsStepCompleted = ref(false);

    const canMoveForward = computed(() => !loading.value && shippingDetails.value && Object.keys(
      shippingDetails.value,
    ).length > 0);

    const hasSavedShippingAddress = computed(() => {
      if (!isAuthenticated.value || !userShipping.value) {
        return false;
      }
      const addresses = userShippingGetters.getAddresses(userShipping.value);
      return Boolean(addresses?.length);
    });
    // @ts-ignore
    const countriesList = computed(() => addressGetter.countriesList(countries.value));

    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const handleAddressSubmit = (reset) => async () => {
      const addressId = currentAddressId.value;
      const shippingDetailsData = {
        ...shippingDetails.value,
        customerAddressId: addressId,
      };
      // @TODO remove ignore when https://github.com/vuestorefront/vue-storefront/issues/5967 is applied
      // @ts-ignore
      await save({ shippingDetails: shippingDetailsData });
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const chosenAddress = userShippingGetters.getAddresses(userShipping.value,
          { id: addressId });
        if (chosenAddress && chosenAddress.length > 0) {
          await setDefaultAddress({ address: chosenAddress[0] });
        }
      }
      reset();
      isShippingDetailsStepCompleted.value = true;
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      shippingDetails.value = {};
      canAddNewAddress.value = true;
      isShippingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr) => {
      shippingDetails.value = { ...addressFromApiToForm(addr) };
      currentAddressId.value = addr?.id;
      canAddNewAddress.value = false;
      isShippingDetailsStepCompleted.value = false;
    };

    const changeShippingDetails = (field, value) => {
      shippingDetails.value = {
        ...shippingDetails.value,
        [field]: value,
      };
      isShippingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userShippingGetters.getAddresses(userShipping.value,
        { default_shipping: true });
      if (defaultAddress && defaultAddress.length > 0) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    const changeCountry = async (id) => {
      changeShippingDetails('country_code', id);
      await searchCountry({ id });
    };

    watch(address, (addr) => {
      shippingDetails.value = addressFromApiToForm(addr || {});
    });

    onSSR(async () => {
      await Promise.all([
        loadCountries(),
        load(),
      ]);
    });

    onMounted(async () => {
      if (shippingDetails.value?.country_code) {
        await searchCountry({ id: shippingDetails.value.country_code });
      }

      if (!userShipping.value?.addresses && isAuthenticated.value) {
        await loadUserShipping();
      }
      const shippingAddresses = userShippingGetters.getAddresses(userShipping.value);

      if (!shippingAddresses || shippingAddresses.length === 0) {
        return;
      }

      const hasEmptyShippingDetails = !shippingDetails.value || Object.keys(shippingDetails.value).length === 0;
      if (hasEmptyShippingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      canAddNewAddress,
      canMoveForward,
      changeCountry,
      changeShippingDetails,
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
      load,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      searchCountry,
      setAsDefault,
      shippingDetails,
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

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
