<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <SfHeading
      v-e2e="'heading-billing'"
      :level="3"
      :title="$t('Billing address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form @submit.prevent="handleSubmit(handleAddressSubmit(reset))">
      <SfCheckbox
        v-e2e="'copy-address'"
        :selected="sameAsShipping"
        :label="$t('My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
        @change="handleCheckSameAddress"
      />
      <div
        v-if="sameAsShipping"
        class="copy__shipping__addresses"
      >
        <div class="copy__shipping__address">
          <div class="sf-address">
            <UserAddressDetails
              :address="{
                ...billingDetails,
                region: { region_code: billingDetails.region },
              }"
            />
          </div>
        </div>
      </div>
      <UserBillingAddresses
        v-if="!sameAsShipping && isAuthenticated && hasSavedBillingAddress"
        v-model="setAsDefault"
        v-e2e="'billing-addresses'"
        :current-address-id="currentAddressId || NOT_SELECTED_ADDRESS"
        :billing-addresses="addresses"
        @setCurrentAddress="handleSetCurrentAddress"
      />
      <div
        v-if="!sameAsShipping && canAddNewAddress"
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
            :error-message="$t(errors[0])"
            @input="(firstname) => changeBillingDetails('firstname', firstname)"
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
            :error-message="$t(errors[0])"
            @input="(lastname) => changeBillingDetails('lastname', lastname)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="street"
          rules="required"
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
            :error-message="$t(errors[0])"
            @input="(street) => changeBillingDetails('street', street)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="apartment"
          rules="required|min:1"
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
            :error-message="$t(errors[0])"
            @input="(apartment) => changeBillingDetails('apartment', apartment)"
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
            :error-message="$t(errors[0])"
            @input="(city) => changeBillingDetails('city', city)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="state"
          :rules="!regionInformation ? null : 'required|min:2'"
          slim
        >
          <SfInput
            v-if="
              !billingDetails.country_code || regionInformation.length === 0
            "
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="!billingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            @input="(region) => changeBillingDetails('region', region)"
          />
          <SfSelect
            v-else
            v-model="billingDetails.region"
            v-e2e="'state'"
            label="State/Province"
            name="state"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            @input="(state) => changeBillingDetails('region', state)"
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
            :error-message="$t(errors[0])"
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
            :error-message="$t(errors[0])"
            @input="(postcode) => changeBillingDetails('postcode', postcode)"
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
            :error-message="$t(errors[0])"
            @input="(telephone) => changeBillingDetails('telephone', telephone)"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!sameAsShipping && !canAddNewAddress"
        class="color-light form__action-button form__action-button--add-address"
        type="submit"
        @click="handleAddNewAddressBtnClick"
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
            to="localePath('/checkout/shipping')"
            class="sf-button sf-button--underlined form__back-button smartphone-only"
          >
            {{ $t('Go back') }}
          </nuxt-link>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox,
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, digits } from 'vee-validate/dist/rules';
import {
  ref,
  computed,
  onMounted,
  watch,
  useRouter,
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api';
import userBillingGetters from '~/modules/customer/getters/userBillingGetters';
import addressGetter from '~/modules/customer/getters/addressGetter';
import {
  useCountrySearch,
} from '~/composables';
import useShipping from '~/modules/checkout/composables/useShipping';
import useBilling from '~/modules/checkout/composables/useBilling';
import { useUser } from '~/modules/customer/composables/useUser';
import { useUserAddress } from '~/modules/customer/composables/useUserAddress';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import {
  addressFromApiToForm,
  CheckoutAddressForm,
  formatAddressReturnToData,
  getInitialCheckoutAddressForm,
} from '~/helpers/checkout/address';
import { mergeItem } from '~/helpers/asyncLocalStorage';
import { isPreviousStepValid } from '~/helpers/checkout/steps';

import type {
  ShippingCartAddress, BillingCartAddress, Country, Customer, CustomerAddress,
} from '~/modules/GraphQL/types';

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
  name: 'BillingStep',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
    UserBillingAddresses: () => import('~/components/Checkout/UserBillingAddresses.vue'),
    UserAddressDetails,
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const shippingDetails = ref<ShippingCartAddress | null>(null);
    const billingAddress = ref<BillingCartAddress | null>(null);
    const userBilling = ref<Customer | null>(null);

    const {
      save, load: loadBilling, loading,
    } = useBilling();
    const {
      load: loadUserBilling,
      setDefaultAddress,
    } = useUserAddress();
    const {
      load: loadShipping,
    } = useShipping();
    const {
      load: loadCountries,
      search: searchCountry,
    } = useCountrySearch();

    const countries = ref<Country[]>([]);
    const country = ref<Country | null>(null);
    const { isAuthenticated } = useUser();
    let oldBilling : CheckoutAddressForm | null = null;
    const sameAsShipping = ref(false);
    const billingDetails = ref<CheckoutAddressForm>(
      billingAddress.value
        ? addressFromApiToForm(billingAddress.value)
        : getInitialCheckoutAddressForm(),
    );
    const currentAddressId = ref(NOT_SELECTED_ADDRESS);
    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const canAddNewAddress = ref(true);

    const isBillingDetailsStepCompleted = ref(false);
    const addresses = computed(() => (userBilling.value ? userBillingGetters.getAddresses(userBilling.value) : []));

    const canMoveForward = computed(() => !loading.value && billingDetails.value && Object.keys(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      billingDetails.value,
    ).length > 0);

    const hasSavedBillingAddress = computed(() => {
      if (!isAuthenticated.value || !userBilling.value) {
        return false;
      }
      return addresses.value.length > 0;
    });

    const countriesList = computed(() => addressGetter.countriesList(countries.value));
    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const handleAddressSubmit = (reset: () => void) => async () => {
      const addressId = currentAddressId.value;
      const billingDetailsData = {
        billingDetails: {
          ...billingDetails.value,
          customerAddressId: addressId,
          sameAsShipping: sameAsShipping.value,
        },
      };
      await save(billingDetailsData);
      if (addressId !== NOT_SELECTED_ADDRESS && setAsDefault.value) {
        const [chosenAddress] = userBillingGetters.getAddresses(
          userBilling.value,
          { id: addressId },
        );
        chosenAddress.default_billing = setAsDefault.value;
        if (chosenAddress) {
          await setDefaultAddress({ address: chosenAddress });
          userBilling.value = await loadUserBilling(true);
        }
      }
      reset();
      await mergeItem('checkout', { billing: billingDetailsData });
      await router.push(`${app.localePath('/checkout/payment')}`);
      isBillingDetailsStepCompleted.value = true;
    };

    const handleCheckSameAddress = async () => {
      sameAsShipping.value = !sameAsShipping.value;
      if (sameAsShipping.value) {
        shippingDetails.value = await loadShipping();
        country.value = await searchCountry({ id: (shippingDetails.value as ShippingCartAddress).country.code });
        oldBilling = { ...billingDetails.value };
        billingDetails.value = {
          ...formatAddressReturnToData(shippingDetails.value),
        };
        currentAddressId.value = NOT_SELECTED_ADDRESS;
        setAsDefault.value = false;
        if (billingDetails.value.country_code) {
          country.value = await searchCountry({ id: billingDetails?.value.country_code });
        }
        return;
      }
      billingDetails.value = oldBilling;
      if (billingDetails.value.country_code) {
        country.value = await searchCountry({ id: billingDetails?.value.country_code });
      }
    };

    const handleAddNewAddressBtnClick = () => {
      currentAddressId.value = NOT_SELECTED_ADDRESS;
      billingDetails.value = getInitialCheckoutAddressForm();
      canAddNewAddress.value = true;
      isBillingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = (addr: CustomerAddress) => {
      billingDetails.value = { ...addressFromApiToForm(addr) };
      currentAddressId.value = String(addr?.id);
      canAddNewAddress.value = false;
      isBillingDetailsStepCompleted.value = false;
    };

    const changeBillingDetails = (field: string, value: unknown) => {
      billingDetails.value = {
        ...billingDetails.value,
        [field]: value,
      };
      isBillingDetailsStepCompleted.value = false;
      currentAddressId.value = NOT_SELECTED_ADDRESS;
    };

    const selectDefaultAddress = () => {
      const defaultAddress = userBillingGetters.getAddresses(
        userBilling.value,
        { default_billing: true },
      );
      if (defaultAddress && defaultAddress.length > 0) {
        handleSetCurrentAddress(defaultAddress[0]);
      }
    };

    const changeCountry = async (id: string) => {
      changeBillingDetails('country_code', id);
      country.value = await searchCountry({ id });
    };

    watch(billingAddress, (addr) => {
      billingDetails.value = addr ? addressFromApiToForm(addr) : getInitialCheckoutAddressForm();
    });

    onMounted(async () => {
      const validStep = await isPreviousStepValid('shipping');
      if (!validStep) {
        await router.push(app.localePath('/checkout/user-account'));
      }

      const [loadedCountries, loadedBilling] = await Promise.all([loadCountries(), loadBilling()]);
      countries.value = loadedCountries;
      billingAddress.value = loadedBilling;

      if (billingDetails.value?.country_code) {
        country.value = await searchCountry({ id: billingDetails.value.country_code });
      }

      if (!(userBilling.value as Customer)?.addresses && isAuthenticated.value) {
        userBilling.value = await loadUserBilling();
      }
      const billingAddresses = userBilling.value ? userBillingGetters.getAddresses(userBilling.value) : [];

      if (!billingAddresses || billingAddresses.length === 0) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const hasEmptyBillingDetails = !billingDetails.value || Object.keys(billingDetails.value).length === 0;
      if (hasEmptyBillingDetails) {
        selectDefaultAddress();
        return;
      }
      canAddNewAddress.value = false;
    });

    return {
      canAddNewAddress,
      canMoveForward,
      changeCountry,
      changeBillingDetails,
      countriesList,
      country,
      currentAddressId,
      handleAddNewAddressBtnClick,
      handleAddressSubmit,
      handleSetCurrentAddress,
      handleCheckSameAddress,
      hasSavedBillingAddress,
      isAuthenticated,
      isFormSubmitted,
      isBillingDetailsStepCompleted,
      loading,
      NOT_SELECTED_ADDRESS,
      regionInformation,
      searchCountry,
      setAsDefault,
      billingDetails,
      sameAsShipping,
      addresses,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.copy__shipping {
  &__address {
    margin-bottom: var(--spacer-xs);
    @include for-desktop {
      margin-right: var(--spacer-sm);
      display: flex;
      width: 100%;
      flex-direction: column;
    }

    .sf-address {
      padding: var(--spacer-xs);
    }
  }

  &__addresses {
    margin-bottom: var(--spacer-xl);
    @include for-desktop {
      display: flex;
    }
  }
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
