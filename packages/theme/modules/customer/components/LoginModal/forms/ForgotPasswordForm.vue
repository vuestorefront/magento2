<template>
  <div>
    <p>{{ $t('Forgot Password') }}</p>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        class="form"
        @submit.prevent="handleSubmit(() => { $emit('submit', formCopy) })"
      >
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
        >
          <SfInput
            v-model="formCopy.username"
            v-e2e="'forgot-modal-email'"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
            name="email"
            :label="$t('Forgot Password Modal Email')"
            class="form__element"
          />
        </ValidationProvider>
        <recaptcha v-if="showRecaptcha" />
        <slot name="error" />
        <SfButton
          v-e2e="'forgot-modal-submit'"
          data-testid="login-forgot-password-form-submit"
          type="submit"
          class="sf-button--full-width form__button"
          :disabled="loading"
        >
          <SfLoader
            :class="{ loader: loading }"
            :loading="loading"
          >
            <div>{{ $t('Reset Password') }}</div>
          </SfLoader>
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import {
  SfInput,
  SfButton,
  SfLoader,
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { ForgotPasswordFormFields } from './types';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

export default defineComponent({
  components: {
    SfInput,
    SfButton,
    SfLoader,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    form: {
      type: Object as PropType<ForgotPasswordFormFields>,
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
  setup(props) {
    const formCopy = ref<ForgotPasswordFormFields>();
    watch(() => props.form, (newForm) => { formCopy.value = { ...newForm }; }, { immediate: true, deep: true });
    return { formCopy };
  },
});
</script>
<style lang="scss" scoped>
@import './styles.scss';
</style>
