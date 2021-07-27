<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isLoginModalOpen"
    class="modal"
    @close="toggleLoginModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="isLogin ? 'Log in' : 'Sign in'"
        @click:close="toggleLoginModal"
      />
    </template>
    <transition
      name="sf-fade"
      mode="out-in"
    >
      <div v-if="isLogin">
        <ValidationObserver
          v-slot="{ handleSubmit }"
          key="log-in"
        >
          <form
            class="form"
            @submit.prevent="handleSubmit(handleLogin)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
            >
              <SfInput
                v-model="form.username"
                v-e2e="'login-modal-email'"
                :valid="!errors[0]"
                :error-message="errors[0]"
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
                v-e2e="'login-modal-password'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="password"
                label="Password"
                type="password"
                has-show-password
                class="form__element"
              />
            </ValidationProvider>
            <SfCheckbox
              v-model="rememberMe"
              v-e2e="'login-modal-remember-me'"
              name="remember-me"
              label="Remember me"
              class="form__element checkbox"
            />
            <div v-if="error.login">
              {{ error.login }}
            </div>
            <SfButton
              v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
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
          <SfButton class="sf-button--text">
            {{ $t('Forgotten password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">
            {{ $t('No account') }}
          </p>
          <SfButton
            class="sf-button--text"
            @click="setIsLoginValue(false)"
          >
            {{ $t('Register today') }}
          </SfButton>
        </div>
      </div>
      <div
        v-else
        class="form"
      >
        <ValidationObserver
          v-slot="{ handleSubmit, invalid }"
          key="sign-up"
        >
          <form
            class="form"
            autocomplete="off"
            @submit.prevent="handleSubmit(handleRegister)"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
            >
              <SfInput
                v-model="form.email"
                v-e2e="'login-modal-email'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="email"
                label="Your email"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <SfInput
                v-model="form.firstName"
                v-e2e="'login-modal-firstName'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="first-name"
                label="First Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <SfInput
                v-model="form.lastName"
                v-e2e="'login-modal-lastName'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="last-name"
                label="Last Name"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|password"
            >
              <SfInput
                v-model="form.password"
                v-e2e="'login-modal-password'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="password"
                label="Password"
                type="password"
                has-show-password
                class="form__element"
              />
            </ValidationProvider>
            <SfCheckbox
              v-model="isSubscribed"
              v-e2e="'sign-up-newsletter'"
              label="Sign Up for Newsletter"
              name="signupNewsletter"
              class="form__element"
            />
            <SfCheckbox
              v-model="allowRemoteShoppingAssistance"
              v-e2e="'remote-assistance'"
              label="Allow remote shopping assistance"
              name="allowRemoteShoppingAssistance"
              info-message="This allows merchants to 'see what you see' and take actions on your behalf in order to provide better assistance."
              class="form__element"
            />
            <ValidationProvider
              v-slot="{ errors }"
              :rules="{ required: { allowFalse: false } }"
            >
              <SfCheckbox
                v-model="createAccount"
                v-e2e="'login-modal-create-account'"
                :valid="!errors[0]"
                :error-message="errors[0]"
                name="create-account"
                label="I want to create an account"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="error.register">
              {{ error.register }}
            </div>
            <SfButton
              v-e2e="'login-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading || !createAccount || invalid"
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
            @click="setIsLoginValue(true)"
          >
            {{ $t('login in to your account') }}
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import {
  ref,
  watch,
  reactive,
  defineComponent,
} from '@vue/composition-api';
import {
  SfModal,
  SfInput,
  SfButton,
  SfCheckbox,
  SfLoader,
  SfBar,
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser } from '@vue-storefront/magento';
import { useUiState } from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('password', {
  message: 'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
  validate: (value) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(value);
  },
});

export default defineComponent({
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    ValidationProvider,
    ValidationObserver,
    SfBar,
  },
  setup() {
    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const isSubscribed = ref(false);
    const allowRemoteShoppingAssistance = ref(false);
    const form = ref({});
    const isLogin = ref(false);
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const {
      register,
      login,
      loading,
      error: userError,
    } = useUser();

    const error = reactive({
      login: null,
      register: null,
    });

    const resetErrorValues = () => {
      error.login = null;
      error.register = null;
    };

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
        resetErrorValues();
      }
    });

    const setIsLoginValue = (value) => {
      resetErrorValues();
      isLogin.value = value;
    };

    const handleForm = (fn) => async () => {
      resetErrorValues();
      await fn({
        user: {
          ...form.value,
          is_subscribed: isSubscribed.value,
          allow_remote_shopping_assistance: allowRemoteShoppingAssistance.value,
        },
      });

      const hasUserErrors = userError.value.register || userError.value.login;
      if (hasUserErrors) {
        error.login = userError.value.login?.message;
        error.register = userError.value.register?.message;
        return;
      }
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    return {
      isSubscribed,
      allowRemoteShoppingAssistance,
      form,
      error,
      userError,
      loading,
      isLogin,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      setIsLoginValue,
    };
  },
});
</script>

<style lang="scss" scoped>

.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}

.form {
  margin-top: var(--spacer-sm);

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
