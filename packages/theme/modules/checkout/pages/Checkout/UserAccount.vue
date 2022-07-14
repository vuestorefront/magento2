<template>
  <ValidationObserver v-slot="{ handleSubmit, reset, validate }">
    <SfHeading
      v-e2e="'user-account-heading'"
      :level="3"
      :title="$t('User Account')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form
      novalidate
      @submit.prevent="validate().then(handleSubmit(handleFormSubmit(reset)))"
    >
      <div class="form">
        <ValidationProvider
          v-slot="{ errors }"
          name="firstname"
          :rules="loginUserAccount ? '' : 'required|min:2'"
          slim
        >
          <SfInput
            v-model="form.firstname"
            v-e2e="'user-account-firstName'"
            :label="$t('First Name')"
            name="firstName"
            class="form__element form__element--half"
            :required="!loginUserAccount"
            :disabled="loginUserAccount"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          :rules="loginUserAccount ? '' : 'required|min:2'"
          slim
        >
          <SfInput
            v-model="form.lastname"
            v-e2e="'user-account-lastName'"
            :label="$t('Last Name')"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            :required="!loginUserAccount"
            :disabled="loginUserAccount"
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="email"
          rules="email|required"
          slim
        >
          <SfInput
            v-model="form.email"
            v-e2e="'user-account-email'"
            :label="$t('E-mail')"
            name="email"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
        <ValidationProvider
          v-if="createUserAccount || loginUserAccount"
          v-slot="{ errors }"
          rules="required|min:8|password"
          slim
        >
          <SfInput
            v-model="form.password"
            v-e2e="'user-account-password'"
            name="password"
            label="Password"
            type="password"
            class="form__element form__element--half form__element--half-even"
            required
            has-show-password
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
        <SfCheckbox
          v-if="createUserAccount"
          v-model="form.is_subscribed"
          v-e2e="'sign-up-newsletter'"
          label="Sign Up for Newsletter"
          name="signupNewsletter"
          class="form__element"
        />
      </div>
      <SfCheckbox
        v-if="!isAuthenticated"
        v-model="createUserAccount"
        v-e2e="'create-account'"
        label="Create an account on the store"
        name="createUserAccount"
        class="form__element"
        :disabled="loginUserAccount"
      />
      <SfCheckbox
        v-if="!isAuthenticated"
        v-model="loginUserAccount"
        v-e2e="'login-account'"
        label="Login on the store"
        name="loginUserAccount"
        class="form__element"
        :disabled="createUserAccount"
      />
      <recaptcha v-if="isRecaptchaEnabled" />
      <div class="form">
        <div class="form__action">
          <SfButton
            v-e2e="'continue-to-shipping'"
            class="form__action-button"
            type="submit"
            :disabled="!canMoveForward"
          >
            {{ $t('Continue to shipping') }}
          </SfButton>
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
  SfCheckbox,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
  useRouter,
  useContext,
  useFetch,
  onMounted,
} from '@nuxtjs/composition-api';
import {
  required, min, email,
} from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useGuestUser } from '~/composables';
import useCart from '~/modules/checkout/composables/useCart';
import { useUser } from '~/modules/customer/composables/useUser';
import { getItem, mergeItem } from '~/helpers/asyncLocalStorage';
import { customerPasswordRegExp, invalidPasswordMsg } from '~/modules/customer/helpers/passwordValidation';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});
extend('email', {
  ...email,
  message: 'Invalid email',
});

extend('password', {
  message: invalidPasswordMsg,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  validate: (value) => customerPasswordRegExp.test(value),
});

export default defineComponent({
  name: 'UserAccount',
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  setup() {
    const router = useRouter();
    // @ts-expect-error Recaptcha is not registered as a Nuxt module. Its absence is handled in the code
    const { app, $recaptcha, $config } = useContext();
    const isRecaptchaEnabled = ref(typeof $recaptcha !== 'undefined' && $config.isRecaptcha);

    const {
      attachToCart,
      loading: loadingGuestUser,
      error: errorGuestUser,
    } = useGuestUser();

    const { cart } = useCart();

    const {
      load,
      loading: loadingUser,
      register,
      login,
      user,
      isAuthenticated,
      error: errorUser,
    } = useUser();

    const isFormSubmitted = ref(false);
    const createUserAccount = ref(false);
    const loginUserAccount = ref(false);
    const loading = computed(() => loadingUser.value || loadingGuestUser.value);

    const canMoveForward = computed(() => !(loading.value));
    const anyError = computed(() => errorUser.value.login || errorUser.value.register || errorGuestUser.value.attachToCart);

    type Form = {
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      is_subscribed: boolean,
      recaptchaToken?: string,
      recaptchaInstance?: string,
    };

    const form = ref<Form>({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      is_subscribed: false,
    });

    const handleFormSubmit = (reset: () => void) => async () => {
      if (isRecaptchaEnabled.value) {
        $recaptcha.init();
      }

      if (!isAuthenticated.value) {
        if (isRecaptchaEnabled.value && createUserAccount.value) {
          const recaptchaToken = await $recaptcha.getResponse();
          form.value.recaptchaToken = recaptchaToken;
          form.value.recaptchaInstance = $recaptcha;
        }

        await (
          createUserAccount.value
            ? register({ user: form.value })
            : attachToCart({ email: form.value.email, cart })
        );
      }

      if (loginUserAccount.value) {
        const recaptchaParams : { recaptchaToken?: string } = {};
        if (isRecaptchaEnabled.value) {
          recaptchaParams.recaptchaToken = await $recaptcha.getResponse();
        }

        await login({
          user: {
            email: form.value.email,
            password: form.value.password,
            ...recaptchaParams,
          },
        });
      }

      if (!anyError.value) {
        await mergeItem('checkout', { 'user-account': form.value });
        await router.push(app.localeRoute({ name: 'shipping' }));
        reset();
        isFormSubmitted.value = true;
      }

      if (isRecaptchaEnabled.value) {
        $recaptcha.reset();
      }
    };

    useFetch(async () => {
      if (user.value === null) {
        await load();
      }
      if (isAuthenticated.value) {
        form.value.firstname = user.value.firstname;
        form.value.lastname = user.value.lastname;
        form.value.email = user.value.email;
      }
    });

    onMounted(async () => {
      const checkout = await getItem('checkout');
      if (checkout && checkout['user-account']) {
        const data = checkout['user-account'];
        form.value.email = data.email;
        form.value.firstname = data.firstname;
        form.value.lastname = data.lastname;
      }
    });

    return {
      canMoveForward,
      createUserAccount,
      errorUser,
      form,
      handleFormSubmit,
      isAuthenticated,
      isFormSubmitted,
      loading,
      loginUserAccount,
      user,
      isRecaptchaEnabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.form {

  &__select {
    display: flex;
    align-items: center;
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

  &__action {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    &--secondary {
      @include for-desktop {
        order: -1;
        text-align: left;
      }
    }

    &--add-address {
      width: 100%;
      margin: 0;
      @include for-desktop {
        margin: 0 0 var(--spacer-lg) 0;
        width: auto;
      }
    }
  }

  &__back-button {
    margin: var(--spacer-xl) 0 var(--spacer-sm);

    &:hover {
      color: var(--c-white);
    }

    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}

.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
</style>
