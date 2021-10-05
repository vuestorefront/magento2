<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form
      class="form"
      @submit.prevent="handleSubmit(submitForm(reset))"
    >
      <div class="form__horizontal">
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
          <SfInput
            v-model="form.firstname"
            name="firstName"
            label="First Name"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required|min:2"
          class="form__element"
        >
          <SfInput
            v-model="form.lastname"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :error-message="errors[0]"
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
          label="Your e-mail"
          required
          :valid="!errors[0]"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <SfCheckbox
        v-model="form.allow_remote_shopping_assistance"
        v-e2e="'remote-assistance'"
        label="Allow remote shopping assistance"
        name="allowRemoteShoppingAssistance"
        info-message="This allows merchants to 'see what you see' and take actions on your behalf in order to provide better assistance."
        class="form__element"
      />
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
          label="Current Password"
          required
          class="form__element"
          style="margin-top: 10px"
          @keypress.enter="handleSubmit(submitForm(reset))"
        />
        <SfButton
          class="form__button"
          @click="handleSubmit(submitForm(reset))"
        >
          {{ $t('Update personal data') }}
        </SfButton>
      </SfModal>
      <SfButton class="form__button">
        {{ $t('Update personal data') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { useUser, userGetters } from '@vue-storefront/magento';
import {
  SfInput,
  SfButton,
  SfModal,
  SfCheckbox,
} from '@storefront-ui/vue';

export default defineComponent({
  name: 'ProfileUpdateForm',
  components: {
    SfInput,
    SfButton,
    SfModal,
    SfCheckbox,
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
  setup(props, { emit }) {
    const { user } = useUser();
    const currentPassword = ref('');
    const requirePassword = ref(false);
    const resetForm = () => ({
      firstname: userGetters.getFirstName(user.value),
      lastname: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value),
      allow_remote_shopping_assistance: userGetters.getRemoteShoppingAssistance(user.value),
    });

    const form = ref(resetForm());

    const submitForm = (resetValidationFn) => () => {
      const onComplete = () => {
        form.value = resetForm();
        requirePassword.value = false;
        currentPassword.value = '';
        resetValidationFn();
      };

      const onError = () => {
        form.value = resetForm();
        requirePassword.value = false;
        currentPassword.value = '';
      };

      if (
        userGetters.getEmailAddress(user.value) !== form.value.email
        && !requirePassword.value
      ) {
        requirePassword.value = true;
      } else {
        if (currentPassword.value) {
          form.value.password = currentPassword.value;
        }

        emit('submit', { form, onComplete, onError });
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
<style lang='scss' scoped>
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
