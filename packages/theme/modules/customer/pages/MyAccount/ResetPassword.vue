<template>
  <div id="reset-password">
    <SfHeading
      :title="$t('Reset Password')"
      :level="3"
      class="heading sf-heading--no-underline"
    />
    <div v-if="!isPasswordChanged">
      <ValidationObserver
        v-slot="{ handleSubmit }"
        key="log-in"
      >
        <form
          class="form"
          @submit.prevent="handleSubmit(setNewPassword)"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
          >
            <SfInput
              v-model="form.email"
              v-e2e="'login-modal-email'"
              :valid="!errors[0]"
              :error-message="$t(errors[0])"
              name="email"
              label="Your email"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|password"
          >
            <SfInput
              v-model="form.password"
              v-e2e="'reset-password-modal-password'"
              :valid="!errors[0]"
              :error-message="$t(errors[0])"
              :label="$t('Password')"
              name="password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <SfInput
              v-model="form.repeatPassword"
              v-e2e="'reset-password-modal-password-repeat'"
              :valid="!errors[0]"
              :error-message="$t(errors[0])"
              :label="$t('Repeat Password')"
              name="repeat-password"
              type="password"
              class="form__element"
            />
          </ValidationProvider>
          <div v-if="passwordMatchError || forgotPasswordError.setNew">
            {{ passwordMatchError || forgotPasswordError.setNew.message }}
          </div>
          <recaptcha v-if="isRecaptchaEnabled" />
          <SfButton
            v-e2e="'reset-password-modal-submit'"
            type="submit"
            class="sf-button--full-width form__button"
            :disabled="forgotPasswordLoading"
          >
            <SfLoader
              :class="{ loader: forgotPasswordLoading }"
              :loading="forgotPasswordLoading"
            >
              <div>{{ $t('Save Password') }}</div>
            </SfLoader>
          </SfButton>
        </form>
      </ValidationObserver>
    </div>
    <div v-else>
      <p>{{ $t('Password Changed') }}</p>
      <SfButton
        class="sf-button"
        link="/"
      >
        {{ $t('Back to home') }}
      </SfButton>
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfButton,
  SfLoader,
  SfInput,
  SfHeading,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
  useContext,
  useRoute,
} from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import { forgotPasswordGetters } from '~/modules/customer/getters/forgotPasswordGetters';
import { useForgotPassword } from '~/composables';
import { customerPasswordRegExp, invalidPasswordMsg } from '~/modules/customer/helpers/passwordValidation';

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
  name: 'ResetPassword',
  components: {
    SfButton,
    SfHeading,
    SfLoader,
    SfInput,
    ValidationProvider,
    ValidationObserver,
  },
  // eslint-disable-next-line consistent-return
  middleware({ redirect, route }) {
    if (!route.query.token) {
      return redirect('/');
    }
  },
  setup() {
    const {
      result,
      setNew,
      error: forgotPasswordError,
      loading: forgotPasswordLoading,
    } = useForgotPassword();
    const passwordMatchError = ref<string | null>(null);

    const form = ref({
      email: '',
      password: '',
      repeatPassword: '',
    });
    const isPasswordChanged = computed(() => forgotPasswordGetters.isPasswordChanged(result.value));

    const route = useRoute();
    const { token } = route.value.query;
    // @ts-expect-error Recaptcha is not registered as a Nuxt module. Its absence is handled in the code
    const { $recaptcha, $config } = useContext();
    const isRecaptchaEnabled = ref(typeof $recaptcha !== 'undefined' && $config.isRecaptcha);

    const setNewPassword = async () => {
      passwordMatchError.value = null;
      if (form.value.password !== form.value.repeatPassword) {
        passwordMatchError.value = 'Passwords do not match';
        return;
      }

      if (isRecaptchaEnabled.value) {
        $recaptcha.init();
      }

      if (isRecaptchaEnabled.value) {
        const recaptchaToken = await $recaptcha.getResponse();

        await setNew({
          tokenValue: token as string,
          newPassword: form.value.password,
          email: form.value.email,
          recaptchaToken,
        });
      } else {
        await setNew({
          tokenValue: token as string,
          newPassword: form.value.password,
          email: form.value.email,
        });
      }

      if (isRecaptchaEnabled.value) {
        $recaptcha.reset();
      }
    };

    return {
      isPasswordChanged,
      form,
      setNewPassword,
      forgotPasswordLoading,
      forgotPasswordError,
      passwordMatchError,
      token,
      result,
      isRecaptchaEnabled,
    };
  },
});
</script>

<style lang="scss" scoped>
#reset-password {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 0 var(--spacer-sm);
  margin: var(--spacer-xl) 0;
  @include for-desktop {
    max-width: 77.5rem;
  }
}

.form {
  margin-top: var(--spacer-sm);
  min-width: 350px;
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}

.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}

.checkbox {
  margin-bottom: var(--spacer-2xl);
}

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
