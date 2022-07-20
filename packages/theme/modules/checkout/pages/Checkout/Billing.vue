<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <SfHeading
      v-e2e="'heading-billing'"
      :level="3"
      :title="$t('Billing address')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfHeading
      v-if="hasSavedBillingAddress"
      v-e2e="'shipping-heading'"
      :level="4"
      :title="$t('Select previously saved address')"
      class="sf-heading--left sf-heading--no-underline form-subtitle"
    />
    <form @submit.prevent="handleSubmit(handleAddressSubmit(reset))">
      <SfCheckbox
        v-e2e="'copy-address'"
        :selected="sameAsShipping"
        :label="$t('My billing and shipping address are the same')"
        name="copyShippingAddress"
        class="form__element"
        @change="handleCheckSameAddress($event)"
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
            >
              <template #country>
                {{ shippingDetailsCountryName }}
              </template>
            </UserAddressDetails>
          </div>
        </div>
      </div>
      <UserBillingAddresses
        v-if="!sameAsShipping && isAuthenticated && hasSavedBillingAddress"
        v-model="setAsDefault"
        v-e2e="'billing-addresses'"
        :current-address-id="currentAddressId"
        :billing-addresses="addresses"
        :countries="countries"
        @setCurrentAddress="handleSetCurrentAddress($event)"
      />
      <div
        v-if="!sameAsShipping && isAddNewAddressFormVisible"
        class="form"
      >
        <SfHeading
          v-if="hasSavedBillingAddress"
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
            v-e2e="'firstName'"
            :value="billingDetails.firstname"
            :label="$t('First Name')"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('firstname', $event)"
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
            :label="$t('Last Name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('lastname', $event)"
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
            :label="$t('Street Name')"
            name="streetName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('street', $event)"
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
            :label="$t('House/Apartment number')"
            name="apartment"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('apartment', $event)"
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
            :label="$t('City')"
            name="city"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('city', $event)"
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
            :label="$t('State/Province')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="!billingDetails.country_code"
            name="state"
            class="form__element form__element--half form__element--half-even"
            @input="changeBillingDetails('region', $event)"
          />
          <SfSelect
            v-else
            v-model="billingDetails.region"
            v-e2e="'state'"
            :label="$t('State/Province')"
            name="state"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            @input="changeBillingDetails('region', $event)"
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
          name="country_code"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-e2e="'country'"
            :value="billingDetails.country_code"
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
          name="postcode"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-e2e="'zipcode'"
            :value="billingDetails.postcode"
            :label="$t('Zip-code')"
            name="zipCode"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('postcode', $event)"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="telephone"
          rules="required|min:8"
          slim
        >
          <SfInput
            v-e2e="'phone'"
            :value="billingDetails.telephone"
            :label="$t('Phone number')"
            name="phone"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            @input="changeBillingDetails('telephone', $event)"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-if="!sameAsShipping && !isAddNewAddressFormVisible"
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
  useRouter,
  defineComponent,
  useContext,
} from '@nuxtjs/composition-api';
import userBillingGetters from '~/modules/customer/getters/userBillingGetters';
import addressGetter from '~/modules/customer/getters/addressGetter';
import { useCountrySearch } from '~/composables';

import useShipping from '~/modules/checkout/composables/useShipping';
import useBilling from '~/modules/checkout/composables/useBilling';
import { useUser } from '~/modules/customer/composables/useUser';
import { useUserAddress } from '~/modules/customer/composables/useUserAddress';
import UserAddressDetails from '~/components/UserAddressDetails.vue';
import {
  addressFromApiToForm,
  CheckoutAddressForm,
  findUserAddressIdenticalToSavedCartAddress,
  formatAddressReturnToData,
  getInitialCheckoutAddressForm,
} from '~/helpers/checkout/address';
import { mergeItem } from '~/helpers/asyncLocalStorage';
import { isPreviousStepValid } from '~/helpers/checkout/steps';

import type {
  ShippingCartAddress, Country, Customer, CustomerAddress,
} from '~/modules/GraphQL/types';

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
    UserBillingAddresses: () => import('~/modules/checkout/components/UserBillingAddresses.vue'),
    UserAddressDetails,
  },
  setup() {
    const router = useRouter();
    const { app } = useContext();
    const shippingDetails = ref<ShippingCartAddress | null>(null);
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

    const shippingDetailsCountryName = computed(() => countries
      .value
      .find((countryItem) => countryItem.id === shippingDetails.value?.country.code)?.full_name_locale ?? '');

    const { isAuthenticated } = useUser();
    let oldBilling : CheckoutAddressForm | null = null;
    const sameAsShipping = ref(false);
    const billingDetails = ref<CheckoutAddressForm>(getInitialCheckoutAddressForm());

    const currentAddressId = ref<number | null>(null);
    const setAsDefault = ref(false);
    const isFormSubmitted = ref(false);
    const isAddNewAddressFormVisible = ref(true);

    const isBillingDetailsStepCompleted = ref(false);
    const addresses = computed(() => (userBilling.value ? userBillingGetters.getAddresses(userBilling.value) : []));

    const canMoveForward = computed(() => !loading.value && billingDetails.value && Object.keys(
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
          customerAddressId: addressId === null ? null : String(addressId),
          sameAsShipping: sameAsShipping.value,
          save_in_address_book: false,
        },
      };
      await save(billingDetailsData);
      if (addressId !== null && setAsDefault.value) {
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
      await router.push(app.localeRoute({ name: 'payment' }));
      isBillingDetailsStepCompleted.value = true;
    };

    const handleCheckSameAddress = async (value: boolean) => {
      sameAsShipping.value = value;
      if (value) {
        shippingDetails.value = await loadShipping();
        country.value = await searchCountry({ id: (shippingDetails.value).country.code });
        oldBilling = { ...billingDetails.value };
        billingDetails.value = {
          ...formatAddressReturnToData(shippingDetails.value),
        };
        currentAddressId.value = null;
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
      currentAddressId.value = null;
      billingDetails.value = getInitialCheckoutAddressForm();
      isAddNewAddressFormVisible.value = true;
      isBillingDetailsStepCompleted.value = false;
    };

    const handleSetCurrentAddress = async (customerAddress: CustomerAddress) => {
      const id = customerAddress?.id;
      currentAddressId.value = id;
      if (id) {
        isAddNewAddressFormVisible.value = false;
      }
      billingDetails.value = addressFromApiToForm(customerAddress);
      country.value = customerAddress.country_code ? await searchCountry({ id: customerAddress.country_code }) : null;
      isBillingDetailsStepCompleted.value = false;
    };

    const changeBillingDetails = (field: keyof CheckoutAddressForm, value: string) => {
      billingDetails.value[field] = value;
      currentAddressId.value = null;
      isBillingDetailsStepCompleted.value = false;
    };

    const changeCountry = async (id: string) => {
      changeBillingDetails('country_code', id);
      const newCountry = await searchCountry({ id });
      billingDetails.value.region = '';
      country.value = newCountry;
    };

    onMounted(async () => {
      const validStep = await isPreviousStepValid('user-account');
      if (!validStep) {
        await router.push(app.localeRoute({ name: 'user-account' }));
      }
      const [loadedBillingInfoBoundToCart, loadedUserBilling, loadedCountries] = await Promise.all([
        loadBilling(),
        loadUserBilling(),
        loadCountries(),
      ]);
      const [defaultAddress = null] = userBillingGetters.getAddresses(loadedUserBilling, { default_billing: true });
      const wasBillingAddressAlreadySetOnCart = Boolean(loadedBillingInfoBoundToCart);

      // keep in mind default billing address is set on a customer's cart during cart creation
      if (wasBillingAddressAlreadySetOnCart) {
        const userAddressIdenticalToSavedCartAddress = findUserAddressIdenticalToSavedCartAddress(
          loadedUserBilling?.addresses,
          loadedBillingInfoBoundToCart,
        );

        handleSetCurrentAddress({ ...loadedBillingInfoBoundToCart, id: userAddressIdenticalToSavedCartAddress?.id });
      } else if (defaultAddress) {
        handleSetCurrentAddress(defaultAddress);
      }
      if (billingDetails.value?.country_code) {
        country.value = await searchCountry({ id: billingDetails.value.country_code });
      }
      userBilling.value = loadedUserBilling;
      countries.value = loadedCountries;
    });

    return {
      isAddNewAddressFormVisible,
      canMoveForward,
      changeCountry,
      changeBillingDetails,
      countriesList,
      countries,
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
      regionInformation,
      searchCountry,
      setAsDefault,
      billingDetails,
      sameAsShipping,
      shippingDetailsCountryName,
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
