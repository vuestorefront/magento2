<template>
  <div>
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
        <recaptcha v-if="showRecaptcha" />
        <slot name="error" />
        <SfButton
          v-e2e="'login-modal-submit'"
          type="submit"
          class="sf-button--full-width form__button"
          :disabled="loading"
          data-testid="login-form-submit"
        >
          <SfLoader
            :class="{ loader: loading }"
            :loading="loading"
          >
            <div>{{ $t('Login') }}</div>
          </SfLoader>
        </SfButton>
      </form>
    </ValidationObserver>
    <div class="action">
      <SfButton
        class="sf-button--text"
        @click="changeForm('forgotPassword')"
      >
        {{ $t('Forgotten password?') }}
      </SfButton>
    </div>
    <div class="bottom">
      <p class="bottom__paragraph">
        {{ $t('No account') }}
      </p>
      <SfButton
        class="sf-button--text"
        @click="changeForm('register')"
      >
        {{ $t('Register today') }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { required, email } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import {
  SfInput,
  SfButton,
  SfLoader,
} from '@storefront-ui/vue';
import { LoginFormFields, FormName } from './types';

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
      type: Object as PropType<LoginFormFields>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    showRecaptcha: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const formCopy = ref<LoginFormFields>();
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
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);

  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
</style>
