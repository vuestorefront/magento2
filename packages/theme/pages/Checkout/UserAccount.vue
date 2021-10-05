<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <SfHeading
      v-e2e="'user-account-heading'"
      :level="3"
      :title="$t('User Account')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <form
      @submit.prevent="handleSubmit(handleFormSubmit(reset))"
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
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            :required="!loginUserAccount"
            :disabled="loginUserAccount"
            :valid="!errors[0]"
            :error-message="errors[0]"
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
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            :required="!loginUserAccount"
            :disabled="loginUserAccount"
            :valid="!errors[0]"
            :error-message="errors[0]"
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
            label="E-mail"
            name="email"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
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
            :error-message="errors[0]"
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
        <SfCheckbox
          v-if="createUserAccount"
          v-model="form.allow_remote_shopping_assistance"
          v-e2e="'remote-assistance'"
          label="Allow remote shopping assistance"
          name="allowRemoteShoppingAssistance"
          info-message="This allows merchants to 'see what you see' and take actions on your behalf in order to provide better assistance."
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

<script>
import {
  SfHeading,
  SfInput,
  SfButton, SfCheckbox,
} from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { ref, computed, defineComponent } from '@vue/composition-api';
import { useUser, useGuestUser } from '@vue-storefront/magento';
import {
  required, min, email,
} from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

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
  message: 'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
  validate: (value) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(value);
  },
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
    const { router } = useVueRouter();
    const {
      attachToCart,
      loading: loadingGuestUser,
      error: errorGuestUser,
    } = useGuestUser();
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
    const hasError = computed(() => !(errorUser.value.register || errorGuestUser.value.attachToCart));

    const form = ref({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      is_subscribed: false,
      allow_remote_shopping_assistance: false,
    });

    const handleFormSubmit = (reset) => async () => {
      if (!isAuthenticated.value) {
        await (
          !createUserAccount.value
            ? attachToCart({ user: form.value })
            : register({ user: form.value })
        );
      }

      if (loginUserAccount.value) {
        await login({
          user: {
            username: form.value.email,
            password: form.value.password,
          },
        });
      }

      if (hasError.value) {
        await router.push('/checkout/shipping');
        reset();
        isFormSubmitted.value = true;
      }
    };

    onSSR(async () => {
      await load();

      if (isAuthenticated.value) {
        form.value.firstname = user.value.firstname;
        form.value.lastname = user.value.lastname;
        form.value.email = user.value.email;
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
    };
  },
});
</script>

<style lang="scss" scoped>
.form {
  --button-width: 100%;

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
    --button-width: auto;
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
    @include for-desktop {
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
