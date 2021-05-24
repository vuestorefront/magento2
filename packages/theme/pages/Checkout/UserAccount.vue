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
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.firstname"
            v-e2e="'user-account-firstName'"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="lastname"
          rules="required|min:2"
          slim
        >
          <SfInput
            v-model="form.lastname"
            v-e2e="'user-account-lastName'"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
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
          v-if="createUserAccount"
          v-slot="{ errors }"
          rules="required"
        >
          <SfInput
            v-model="form.password"
            v-e2e="'login-modal-password'"
            :valid="!errors[0]"
            :error-message="errors[0]"
            name="password"
            label="Password"
            type="password"
            class="form__element"
          />
        </ValidationProvider>
      </div>
      <SfCheckbox
        v-model="createUserAccount"
        v-e2e="'create-account'"
        label="Create an account on the store"
        name="createUserAccount"
        class="form__element"
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
import { ref, computed } from '@vue/composition-api';
import { useUser, useGuestUser } from '@vue-storefront/magento';
import { required, min, email } from 'vee-validate/dist/rules';
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

export default {
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
      loading: loadingUser,
      register,
      error: errorUser,
    } = useUser();

    const isFormSubmitted = ref(false);
    const createUserAccount = ref(false);
    const loading = computed(() => loadingUser.value || loadingGuestUser.value);

    const canMoveForward = computed(() => !(loading.value || errorUser.value.register || errorGuestUser.value.attachToCart));

    const form = ref({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });

    const handleFormSubmit = (reset) => async () => {
      try {
        await (
          !createUserAccount.value
            ? attachToCart({ user: form.value })
            : register({ user: form.value })
        );

        await router.push('/checkout/shipping');
        reset();
        isFormSubmitted.value = true;
      } catch {
        isFormSubmitted.value = false;
      }
    };

    return {
      canMoveForward,
      createUserAccount,
      form,
      handleFormSubmit,
      isFormSubmitted,
      loading,
    };
  },
};
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
