<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="shipping-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          name="firstname"
          class="form__element"
        >
          <SfInput
            v-model="form.firstname"
            name="firstname"
            :label="$t('First Name')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          name="lastname"
          class="form__element"
        >
          <SfInput
            v-model="form.lastname"
            name="lastname"
            :label="$t('Last Name')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required"
        name="street"
        class="form__element"
      >
        <SfInput
          v-model="form.street"
          name="street"
          :label="$t('Street Name')"
          required
          :valid="!errors[0]"
          :error-message="$t(errors[0])"
          :disabled="loading"
        />
      </ValidationProvider>
      <SfInput
        v-model="form.apartment"
        name="apartment"
        :label="$t('House/Apartment number')"
        required
        class="form__element"
      />
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
          <SfInput
            v-model="form.city"
            name="city"
            :label="$t('City')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="region"
          :rules="!form.country_code || regionInformation.length === 0 ? null : 'required|min:2'"
          class="form__element"
        >
          <SfInput
            v-if="!form.country_code || regionInformation.length === 0"
            v-model="form.region.region"
            v-e2e="'shipping-state'"
            :label="$t('State/Province')"
            name="state"
            :valid="!!form.country_code"
            :error-message="!form.country_code ? $t('Please select a country first') : ''"
            :disabled="!form.country_code || loading"
          />
          <SfSelect
            v-else
            v-model="form.region.region_code"
            v-e2e="'shipping-state'"
            :label="$t('State/Province')"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
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
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:4"
          name="postcode"
          class="form__element"
        >
          <SfInput
            v-model="form.postcode"
            name="postcode"
            :label="$t('Zip-code')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="country_code"
          rules="required|min:2"
          slim
        >
          <SfSelect
            v-model="form.country_code"
            :label="$t('Country')"
            name="country"
            class="form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            :disabled="loading"
            @input="updateCountry({ id: $event })"
          >
            <!-- don't use SfSelect :placeholder="" to avoid applying SfSelect is-selected class -->
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
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|min:8"
        name="telephone"
        class="form__element"
      >
        <SfInput
          v-model="form.telephone"
          name="telephone"
          :label="$t('Phone number')"
          required
          :valid="!errors[0]"
          :error-message="$t(errors[0])"
          :disabled="loading"
        />
      </ValidationProvider>
      <SfCheckbox
        v-model="form.default_shipping"
        name="isDefaultShipping"
        :label="$t('Set as default shipping')"
        class="form__checkbox-isDefaultShipping"
        :disabled="loading"
      />
      <SfCheckbox
        v-model="form.default_billing"
        name="isDefaultBilling"
        :label="$t('Set as default billing')"
        class="form__checkbox-isDefaultBilling"
        :disabled="loading"
      />
      <SfButton
        class="form__button"
        type="submit"
        :disabled="loading"
      >
        <slot name="submit-button-content" />
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox,
} from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  ref,
  watch,
  computed,
  defineComponent,
  onBeforeMount,
} from '@nuxtjs/composition-api';
import omitDeep from 'omit-deep';
import { PropType } from 'vue';
import { CountryCodeEnum, useCountrySearch } from '~/composables';
import type { Countries, Country, UseCountrySearchParams } from '~/composables';
import addressGetter from '~/modules/customer/getters/addressGetter';
import type { TransformedCustomerAddress } from '~/modules/customer/composables/types';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country',
});

export default defineComponent({
  name: 'AddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    address: {
      type: Object as PropType<TransformedCustomerAddress>,
      default: () => ({
        apartment: '',
        city: '',
        country_code: '' as CountryCodeEnum,
        firstname: '',
        lastname: '',
        postcode: '',
        region: {
          region_code: '',
          region_id: 0,
        },
        street: '',
        telephone: '',
        default_shipping: false,
        default_billing: false,
      }),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const { load: loadCountries, search: searchCountry } = useCountrySearch();

    const form = ref<TransformedCustomerAddress | null>(null);

    const countries = ref<Countries[]>([]);
    const countriesList = computed(() => addressGetter.countriesList(countries.value));
    const country = ref<Country | null>(null);
    const regionInformation = computed(() => addressGetter.regionList(country.value));

    const updateCountry = async (params: UseCountrySearchParams) => {
      country.value = await searchCountry(params);
      form.value.region = { region_id: null, region_code: '' };
    };

    watch(() => props.address, () => {
      form.value = {
        apartment: props.address.apartment,
        city: props.address.city,
        country_code: props.address.country_code,
        firstname: props.address.firstname,
        lastname: props.address.lastname,
        postcode: props.address.postcode,
        region: {
          region_code: '',
          region_id: null,
          ...props.address.region,
        },
        street: props.address.street,
        telephone: props.address.telephone,
        default_shipping: props.address.default_shipping || false,
        default_billing: props.address.default_billing || false,
      } as TransformedCustomerAddress;
    }, { immediate: true });

    const submitForm = () => {
      const regionId = regionInformation.value.find((r) => r.abbreviation === form.value.region.region_code)?.id;
      form.value.region = regionId
        ? { region_id: regionId }
        : {
          ...form.value.region,
          region_code: '',
          region_id: null,
        };

      emit('submit', {
        form: omitDeep(form.value, ['__typename']),
        // TODO: Handle Error
        onError: () => {},
      });
    };

    onBeforeMount(async () => {
      countries.value = await loadCountries();
      if (props.address.country_code) {
        country.value = await searchCountry({ id: props.address.country_code });
      }
    });

    return {
      form,
      submitForm,
      countriesList,
      regionInformation,
      updateCountry,
    };
  },
});
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }

  &__button {
    display: block;
    margin-top: var(--spacer-lg);
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
