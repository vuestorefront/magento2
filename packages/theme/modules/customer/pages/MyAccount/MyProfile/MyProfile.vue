<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab :title="$t('Personal data')">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>

      <ProfileUpdateForm
        :loading="loading"
        @submit="updatePersonalData"
      />

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab :title="$t('Password change')">
      <p class="message">
        {{ $t('Change password your account') }}:<br>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script lang="ts">
import { extend } from 'vee-validate';
import {
  required,
  min,
  confirmed,
} from 'vee-validate/dist/rules';
import { SfTabs } from '@storefront-ui/vue';
import { defineComponent } from '@nuxtjs/composition-api';
import { useUser } from '~/modules/customer/composables/useUser';
import { customerPasswordRegExp, invalidPasswordMsg } from '~/modules/customer/helpers/passwordValidation';
import ProfileUpdateForm from '~/modules/customer/pages/MyAccount/MyProfile/ProfileUpdateForm.vue';
import PasswordResetForm from '~/modules/customer/pages/MyAccount/MyProfile/PasswordResetForm.vue';
import type { OnFormComplete, OnFormError, SubmitEventPayload } from '~/modules/customer/types/form';
import type { ProfileUpdateFormFields, PasswordResetFormFields } from '~/modules/customer/pages/MyAccount/MyProfile/types';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('password', {
  message: invalidPasswordMsg,
  validate: (value: string) => customerPasswordRegExp.test(value),
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match',
});

export default defineComponent({
  name: 'MyProfile',
  components: {
    SfTabs,
    ProfileUpdateForm,
    PasswordResetForm,
  },

  setup() {
    const {
      changePassword,
      loading,
      updateUser,
      error,
    } = useUser();

    const formHandler = async <T extends () => Promise<unknown>>(
      onSubmit: T,
      onComplete: OnFormComplete,
      onError: OnFormError,
    ) => {
      await onSubmit();
      const actionErr = error.value.changePassword || error.value.updateUser;
      if (actionErr) {
        onError(actionErr.toString());
      } else {
        onComplete();
      }
    };

    const updatePersonalData = ({
      form,
      onComplete,
      onError,
    } : SubmitEventPayload<ProfileUpdateFormFields>) => formHandler(
      async () => updateUser({ user: form }),
      onComplete,
      onError,
    );

    const updatePassword = ({
      form,
      onComplete,
      onError,
    } : SubmitEventPayload<PasswordResetFormFields>) => formHandler(
      async () => changePassword({ current: form.currentPassword, new: form.newPassword }),
      onComplete,
      onError,
    );

    return {
      loading,
      updatePersonalData,
      updatePassword,
    };
  },
});
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}

.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);

  &__label {
    font-weight: 400;
  }
}

.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
