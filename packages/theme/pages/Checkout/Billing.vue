<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <SfHeading
      v-e2e="'heading-billing'"
      :level="3"
      :title="$t('Billing address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form
      @submit.prevent="
        handleSubmit(handleAddressSubmit(reset))
      "
    >
      <UserBillingAddresses
        v-if="isAuthenticated && hasSavedBillingAddress"
        v-model="setAsDefault"
        :current-address-id="currentAddressId || NOT_SELECTED_ADDRESS"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <SfCheckbox
        v-e2e="'copy-address'"
        :selected="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
        @change="handleCheckSameAddress"
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
            v-e2e="'firstName'"
            :value="billingDetails.firstname"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="firstname => changeBillingDetails('firstname', firstname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'lastName'"
            :value="billingDetails.lastname"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="lastname => changeBillingDetails('lastname', lastname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'streetName'"
            :value="billingDetails.street"
            label="Street name"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="street => changeBillingDetails('street', street)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="apartment"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'apartment'"
            :value="billingDetails.apartment"
            label="House/Apartment number"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="apartment => changeBillingDetails('apartment', apartment)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="city"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'city'"
            :value="billingDetails.city"
            label="City"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="city => changeBillingDetails('city', city)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="state"
          :rules="!regionInformation ? null : 'required|min:2'"
          slim
        >
          <SfInput
            v-if="!billingDetails.country_code || !regionInformation.length"
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            :disabled="!billingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            @input="region => changeBillingDetails('region', region)"
          />
          <SfSelect
            v-else
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            name="state"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            @input="state => changeBillingDetails('region', state)"
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
          name="country_code"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-e2e="'country'"
            :value="billingDetails.country_code"
            label="Country"
            name="country"
            class="form__element form__element--half form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="updateCountryForm"
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
          name="postcode"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'zipcode'"
            :value="billingDetails.postcode"
            label="Zip-code"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="postcode => changeBillingDetails('postcode', postcode)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="telephone"
          rules="required"
          slim
        >
          <SfInput
            v-e2e="'phone'"
            :value="billingDetails.telephone"
            label="Phone number"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
            @input="telephone => changeBillingDetails('telephone', telephone)"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!canAddNewAddress"
        class="color-light form__action-button form__action-button--add-address"
        type="submit"
        @click.native="handleAddNewAddressBtnClick"
      >
        {{ $t('Add new address') }}
      </SfButton>
      <div class="form">
        <div class="form__action">
          <SfButton
            v-e2e="'continue-to-payment'"
            class="form__action-button"
            type="submit"
            :disabled="!canMoveForward"
          >
            {{ $t('Continue to payment') }}
          </SfButton>
          <nuxt-link
            to="/checkout/shipping"
            class="sf-button sf-button--underlined form__back-button smartphone-only"
          >
            Go back
          </nuxt-link>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfCheckbox,
} from '@storefront-ui/vue';
import {
  useUserBilling,
  userBillingGetters,
  useUser,
  useBilling,
  useShipping,
  useCountrySearch,
  addressGetter,
} from '@vue-storefront/magento';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import { onSSR } from '@vue-storefront/core';
import {
  ref,
  computed,
  onMounted,
} from '@vue/composition-api';
import { formatAddressReturnToData } from '~/helpers/checkout/address';

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

export default {
  name: 'Billing',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    UserBillingAddresses: () => import('@/components/Checkout/UserBillingAddresses'),
  },
  setup(_, context) {
    const {
      shipping: shippingDetails,
      load: loadShipping,
    } = useShipping('Step:Billing');
    const {
      billing: address,
      loading,
      load,
      save,
    } = useBilling('Step:Billing');
    const {
      loadCountries,
      countries,
      searchCountry,
      country,
    } = useCountrySearch('Step:Billing');
    const { isAuthenticated } = useUser();
    const {
      billing: userBilling,
      load: loadUserBilling,
    } = useUserBilling('Step:Billing');
    const billingDetails = ref({});

    const currentAddressId = ref(NOT_SELECTED_ADDRESS);
    const setAsDefault = ref(false);
    const canAddNewAddress = ref(true);
    const sameAsShipping = ref(false);
    let oldBilling = null;

    const canMoveForward = computed(() => !loading.value
      && billingDetails.value && Object.keys(billingDetails.value).length);

    const countriesList = computed(() => addressGetter.countriesList(countries.value));

    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const hasSavedBillingAddress = computed(() => {
      if (!isAuthenticated.value || !userBilling.value) {
        return false;
      }
      const addresses = userBillingGetters.getAddresses(userBilling.value);
      return Boolean(addresses?.length);
    });

    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        if (!shippingDetails.value) {
          await loadShipping();

          await searchCountry({ id: shippingDetails.value.country.code });
        }
        oldBilling = { ...billingDetails.value };
        billingDetails.value = { ...formatAddressReturnToData(shippingDetails.value) };
        currentAddressId.value = NOT_SELECTED_ADDRESS;
        setAsDefault.value = false;
        return;
      }
      billingDetails.value = oldBilling;
    };

    const handleAddressSubmit = (reset) => async () => {
      await save({
        billingDetails: {
          ...billingDetails.value,
          sameAsShipping: sameAsShipping.value,
        },
      });
      reset();
      context.root.$router.push('/checkout/payment');
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      canAddNewAddress.value = true;
    };

    const handleSetCurrentAddress = (address) => {
      billingDetails.value = { ...(formatAddressReturnToData(address) || {}) };
      currentAddressId.value = address.id;
      canAddNewAddress.value = false;
      sameAsShipping.value = false;
    };

    const changeBillingDetails = (field, value) => {
      billingDetails.value = {
        ...billingDetails.value,
        [field]: value,
      };
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userBillingGetters.getAddresses(userBilling.value,
        { isDefault: true });
      if (defaultAddress && defaultAddress.length) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    const updateCountryForm = async (event) => {
      await Promise.all([
        changeBillingDetails('country_code', event),
        searchCountry({ id: event }),
      ]);
    };

    onSSR(async () => {
      await Promise.all([await load(),
        await loadCountries()]);
      if (isAuthenticated.value) {
        await loadUserBilling();
      }
    });

    onMounted(async () => {
      if (Object.keys(address.value).length) {
        await searchCountry({ id: address.value.country.code });

        billingDetails.value = { ...(formatAddressReturnToData(address.value) || {}) };
      }

      if (!userBilling.value?.addresses && isAuthenticated.value) {
        await loadUserBilling();
      }
      const billingAddresses = userBillingGetters.getAddresses(userBilling.value);
      if (!billingAddresses || !billingAddresses.length) {
        return;
      }
      const hasEmptyBillingDetails = !billingDetails.value || Object.keys(billingDetails.value).length === 0;
      if (hasEmptyBillingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      billingDetails,
      canAddNewAddress,
      canMoveForward,
      changeBillingDetails,
      countriesList,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleAddressSubmit,
      handleCheckSameAddress,
      handleSetCurrentAddress,
      hasSavedBillingAddress,
      isAuthenticated,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      sameAsShipping,
      searchCountry,
      setAsDefault,
      shippingDetails,
      updateCountryForm,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.form {
  &__select {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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

  &__group {
    display: flex;
    align-items: center;
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    width: 100%;
    @include for-desktop {
      width: 25rem;
    }

    &--add-address {
      width: 100%;
      margin: 0 0 var(--spacer-sm) 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }

  &__back-button {
    width: 100%;
    margin: var(--spacer-sm) 0 var(--spacer-xl);

    &:hover {
      color: white;
    }
  }
}
</style>
