<template>
  <div class="form">
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form
        class="form"
        autocomplete="off"
        @submit.prevent="handleSubmit(() => { $emit('submit', formCopy); })"
      >
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
        >
          <SfInput
            v-model="formCopy.email"
            v-e2e="'login-modal-email'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="email"
            :label="$t('Your email')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <SfInput
            v-model="formCopy.firstName"
            v-e2e="'login-modal-firstName'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="first-name"
            :label="$t('First Name')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
        >
          <SfInput
            v-model="formCopy.lastName"
            v-e2e="'login-modal-lastName'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="last-name"
            :label="$t('Last Name')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|password"
        >
          <SfInput
            v-model="formCopy.password"
            v-e2e="'login-modal-password'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="password"
            :label="$t('Password')"
            type="password"
            has-show-password
            class="form__element"
          />
        </ValidationProvider>
        <SfCheckbox
          v-model="formCopy.shouldSubscribeToNewsletter"
          v-e2e="'sign-up-newsletter'"
          :label="$t('Sign Up for Newsletter')"
          name="signupNewsletter"
          class="form__element"
        />
        <ValidationProvider
          v-slot="{ errors }"
          :rules="{ required: { allowFalse: false } }"
        >
          <SfCheckbox
            v-model="formCopy.isWillToCreateAccountConfirmed"
            v-e2e="'login-modal-create-account'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="create-account"
            :label="$t('I want to create an account')"
            class="form__element"
          />
        </ValidationProvider>
        <recaptcha v-if="showRecaptcha" />
        <slot name="error" />
        <SfButton
          v-e2e="'login-modal-submit'"
          data-testid="login-form-submit"
          type="submit"
          class="sf-button--full-width form__button"
          :disabled="loading || invalid"
        >
          <SfLoader
            :class="{ loader: loading }"
            :loading="loading"
          >
            <div>{{ $t('Create an account') }}</div>
          </SfLoader>
        </SfButton>
      </form>
    </ValidationObserver>
    <div class="action">
      {{ $t('or') }}
      <SfButton
        v-e2e="'login-modal-login-to-your-account'"
        class="sf-button--text"
        @click="changeForm('login')"
      >
        {{ $t('login in to your account') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  SfInput,
  SfButton,
  SfCheckbox,
  SfLoader,
} from '@storefront-ui/vue';
import { required, email } from 'vee-validate/dist/rules';
import { customerPasswordRegExp, invalidPasswordMsg } from '~/modules/customer/helpers/passwordValidation';
import { RegisterFormFields, FormName } from './types';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('password', {
  message: invalidPasswordMsg,
  validate: (value: string) => customerPasswordRegExp.test(value),
});

export default defineComponent({
  components: {
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    form: {
      type: Object as PropType<RegisterFormFields>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showRecaptcha: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const formCopy = ref<RegisterFormFields>();
    watch(() => props.form, (newForm) => { formCopy.value = { ...newForm }; }, { immediate: true, deep: true });
    const changeForm = (formToNavigateTo: FormName) => {
      emit('change-form', formToNavigateTo);
    };

    return {
      formCopy,
      changeForm,
    };
  },
});
</script>
<style lang="scss" scoped>
@import './styles.scss';
</style>
