<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
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
    <SfTab title="Password change">
      <p class="message">
        {{ $t('Change password your account') }}:<br>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import {
  required,
  min,
  confirmed,
} from 'vee-validate/dist/rules';
import { SfTabs } from '@storefront-ui/vue';
import { onSSR } from '@vue-storefront/core';
import { cartGetters, useUser } from '@vue-storefront/magento';
import { defineComponent } from '@vue/composition-api';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm.vue';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm.vue';
import { useUiNotification } from '~/composables';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('password', {
  message: 'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
  validate: (value) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(value);
  },
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match',
});

export default defineComponent({
  name: 'PersonalDetails',

  components: {
    SfTabs,
    ProfileUpdateForm,
    PasswordResetForm,
  },

  setup() {
    const {
      updateUser,
      changePassword,
      load,
      loading,
    } = useUser();
    const {
      send: sendNotification,
    } = useUiNotification();

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({
      form,
      onComplete,
      onError,
    }) => formHandler(async () => {
      await updateUser({ user: form.value });
      sendNotification({
        id: Symbol('user_updated'),
        message: 'The user account data was successfully updated!',
        type: 'success',
        icon: 'check',
        persist: false,
        title: 'User Account',
      });
    },
    onComplete,
    onError);
    const updatePassword = ({
      form,
      onComplete,
      onError,
    }) => formHandler(async () => {
      await changePassword({
        current: form.value.currentPassword,
        new: form.value.newPassword,
      });
      sendNotification({
        id: Symbol('password_updated'),
        message: 'The user password was changed successfully updated!',
        type: 'success',
        icon: 'check',
        persist: false,
        title: 'User Account',
      });
    }, onComplete, onError);

    onSSR(async () => {
      await load();
    });

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
