<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form
      class="form"
      @submit.prevent="handleSubmit(submitForm(reset))"
    >
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="form__element"
        >
          <SfInput
            v-model="form.firstname"
            name="firstName"
            :label="$t('First Name')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          class="form__element"
        >
          <SfInput
            v-model="form.lastname"
            name="lastName"
            :label="$t('Last Name')"
            required
            :valid="!errors[0]"
            :error-message="$t(errors[0])"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        v-slot="{ errors }"
        rules="required|email"
        class="form__element"
      >
        <SfInput
          v-model="form.email"
          type="email"
          name="email"
          :label="$t('Your e-mail')"
          required
          :valid="!errors[0]"
          :error-message="$t(errors[0])"
        />
      </ValidationProvider>
      <SfModal
        :visible="requirePassword"
        :title="$t('Attention!')"
        cross
        persistent
        @close="requirePassword = false"
      >
        {{ $t('Please type your current password to change your email address.') }}
        <SfInput
          v-model="currentPassword"
          type="password"
          name="currentPassword"
          :label="$t('Current Password')"
          required
          class="form__element"
          style="margin-top: 10px"
        />
        <SfButton
          class="form__button"
          type="submit"
        >
          {{ $t('Update personal data') }}
        </SfButton>
      </SfModal>
      <div
        v-if="requirePassword"
        class="smartphone-only"
      >
        {{ $t('Please type your current password to change your email address.') }}
        <SfInput
          v-model="currentPassword"
          type="password"
          name="currentPassword"
          :label="$t('Current Password')"
          required
          class="form__element"
          style="margin-top: 10px"
        />
        <SfButton
          class="form__button"
          type="submit"
        >
          {{ $t('Update personal data') }}
        </SfButton>
      </div>
      <SfButton
        v-if="!requirePassword"
        class="form__button"
        type="submit"
      >
        {{ $t('Update personal data') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email } from 'vee-validate/dist/rules';
import { SfInput, SfButton, SfModal } from '@storefront-ui/vue';
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import userGetters from '~/modules/customer/getters/userGetters';
import { useUser } from '~/modules/customer/composables/useUser';
import { useUiNotification } from '~/composables';

import type { SubmitEventPayload } from '~/modules/customer/types/form';
import type { ProfileUpdateFormFields } from '~/modules/customer/pages/MyAccount/MyProfile/types';

extend('email', {
  ...email,
  message: 'The email field must be a valid email',
});

export default defineComponent({
  components: {
    SfInput,
    SfButton,
    SfModal,
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['submit'],
  setup(_props, { emit }) {
    const { app: { i18n } } = useContext();
    const { user } = useUser();
    const currentPassword = ref('');
    const requirePassword = ref(false);
    const getInitialForm = () : ProfileUpdateFormFields => ({
      firstname: userGetters.getFirstName(user.value),
      lastname: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
    });
    const { send: sendNotification } = useUiNotification();

    const form = ref(getInitialForm());

    const submitForm = (resetValidationFn: () => void) => () => {
      const onComplete = () => {
        form.value = getInitialForm();
        requirePassword.value = false;
        currentPassword.value = '';
        sendNotification({
          id: Symbol('user_updated'),
          message: i18n.t('The user account data was successfully updated!') as string,
          type: 'success',
          icon: 'check',
          persist: false,
          title: 'User Account',
        });
        resetValidationFn();
      };

      const onError = (message: string) => {
        sendNotification({
          id: Symbol('user_updated'),
          message: i18n.t(message) as string,
          type: 'danger',
          icon: 'cross',
          persist: false,
          title: 'User Account',
        });
      };

      const isEmailChanged = userGetters.getEmailAddress(user.value) !== form.value.email;

      if (isEmailChanged && !requirePassword.value) {
        requirePassword.value = true;
      } else {
        if (currentPassword.value) {
          form.value.password = currentPassword.value;
        }

        const eventPayload : SubmitEventPayload<ProfileUpdateFormFields> = { form: form.value, onComplete, onError };

        emit('submit', eventPayload);
      }
    };

    return {
      requirePassword,
      currentPassword,
      form,
      submitForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
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
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
