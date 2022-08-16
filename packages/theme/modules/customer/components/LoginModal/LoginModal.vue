<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isLoginModalOpen"
    class="modal"
    @close="$emit('close')"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        close
        :title="$t(barTitle)"
        @click:close="$emit('close')"
      />
    </template>
    <transition
      name="sf-fade"
      mode="out-in"
    >
      <div>
        <LoginForm
          v-if="currentlyDisplayedForm === 'login'"
          data-testid="login-form"
          :show-recaptcha="isRecaptchaEnabled"
          :loading="loading"
          :form="loginForm"
          @submit="form => onLoginFormSubmit(form)"
          @change-form="currentlyDisplayedForm = $event"
        />
        <RegisterForm
          v-else-if="currentlyDisplayedForm === 'register'"
          data-testid="register-form"
          :show-recaptcha="isRecaptchaEnabled"
          :loading="loading"
          :form="registerForm"
          @submit="form => onRegisterFormSubmit(form)"
          @change-form="currentlyDisplayedForm = $event"
        />
        <ForgotPasswordForm
          v-else-if="currentlyDisplayedForm === 'forgotPassword'"
          data-testid="forgot-password-form"
          :loading="forgotPasswordLoading"
          :show-recaptcha="isRecaptchaEnabled"
          :form="forgotPasswordForm"
          @submit="form => onForgotPasswordFormSubmit(form)"
        >
          <template #error>
            {{ forgotPasswordError.request && forgotPasswordError.request.message }}
          </template>
        </ForgotPasswordForm>
        <ForgotPasswordThankYou
          v-else-if="currentlyDisplayedForm === 'forgotPasswordThankYou'"
          data-testid="forgot-password-thank-you"
          :form="forgotPasswordForm"
        >
          <template #email>
            {{ forgotPasswordForm.username }}
          </template>
        </ForgotPasswordThankYou>
      </div>
    </transition>
  </SfModal>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  useContext,
} from '@nuxtjs/composition-api';
import {
  SfModal,
  SfBar,
} from '@storefront-ui/vue';
import { useUiState } from '~/composables/useUiState';
import { useCart } from '~/modules/checkout/composables/useCart';
import { useWishlist } from '~/modules/wishlist/composables/useWishlist';
import { useForgotPassword } from '~/modules/customer/composables/useForgotPassword';
import { useUser } from '~/modules/customer/composables/useUser';

import LoginForm from './forms/LoginForm.vue';
import RegisterForm from './forms/RegisterForm.vue';
import ForgotPasswordForm from './forms/ForgotPasswordForm.vue';
import ForgotPasswordThankYou from './forms/ForgotPasswordThankYou.vue';
import {
  ForgotPasswordFormFields, LoginFormFields, RegisterFormFields, FormName,
} from './forms/types';

export default defineComponent({
  name: 'LoginModal',
  components: {
    SfModal,
    SfBar,
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    ForgotPasswordThankYou,
  },
  setup(_, { emit }) {
    const { isLoginModalOpen } = useUiState();

    const {
      register,
      login,
      loading,
      error: userError,
    } = useUser();

    const { load: loadCart } = useCart();
    const { loadItemsCount } = useWishlist();
    const { request: resetPassword, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();

    const currentlyDisplayedForm = ref<FormName>('login');
    const barTitle = computed(() => {
      const mapFormNameToTopBarLabel : Record<FormName, string> = {
        login: 'Sign in',
        register: 'Register',
        forgotPassword: 'Reset Password',
        forgotPasswordThankYou: 'Thank you',
      };

      return mapFormNameToTopBarLabel[currentlyDisplayedForm.value];
    });

    const loginForm = ref<LoginFormFields>({
      email: '',
      password: '',
    });
    const registerForm = ref<RegisterFormFields>({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      shouldSubscribeToNewsletter: false,
      isWillToCreateAccountConfirmed: false,
    });
    const forgotPasswordForm = ref<ForgotPasswordFormFields>({
      username: '',
    });

    // @ts-expect-error Recaptcha is not registered as a Nuxt module. Its absence is handled in the code
    const { $recaptcha, $config } = useContext();
    const isRecaptchaEnabled = ref<boolean>(typeof $recaptcha !== 'undefined' && Boolean($config.isRecaptcha));

    const getRecaptchaInfo = async (isRecaptchaOn: boolean) : Promise<{ token: string | null, cleanup: () => void }> => {
      if (isRecaptchaOn) {
        $recaptcha.init();
        return { token: await $recaptcha.getResponse(), cleanup: () => { $recaptcha.reset(); } };
      }
      return { token: null, cleanup: () => {} };
    };

    const onLoginFormSubmit = async (form: LoginFormFields) => {
      loginForm.value = form;
      const { token, cleanup } = await getRecaptchaInfo(isRecaptchaEnabled.value);
      await login({ user: { ...form, ...(token ? { recaptchaToken: token } : {}) } });
      cleanup();
      if (!userError.value.login) {
        emit('close');
        await Promise.all([loadItemsCount(), loadCart()]);
      }
    };

    const onRegisterFormSubmit = async (form: RegisterFormFields) => {
      registerForm.value = form;
      const { token, cleanup } = await getRecaptchaInfo(isRecaptchaEnabled.value);
      await register({
        user: {
          email: form.email,
          firstname: form.firstName,
          lastname: form.lastName,
          password: form.password,
          is_subscribed: form.shouldSubscribeToNewsletter,
          ...(token ? { recaptchaToken: token } : {}),
        },
      });
      cleanup();
      if (!userError.value.register) {
        emit('close');
        await Promise.all([loadItemsCount(), loadCart()]);
      }
    };

    const onForgotPasswordFormSubmit = async (form: ForgotPasswordFormFields) => {
      forgotPasswordForm.value = form;
      const { token, cleanup } = await getRecaptchaInfo(isRecaptchaEnabled.value);
      await resetPassword({ email: form.username, ...(token ? { recaptchaToken: token } : {}) });
      cleanup();
      currentlyDisplayedForm.value = 'forgotPasswordThankYou';
    };

    return {
      isLoginModalOpen,

      userError,
      loading,

      forgotPasswordError,
      forgotPasswordLoading,

      currentlyDisplayedForm,
      barTitle,

      loginForm,
      registerForm,
      forgotPasswordForm,

      isRecaptchaEnabled,

      onRegisterFormSubmit,
      onLoginFormSubmit,
      onForgotPasswordFormSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
</style>
