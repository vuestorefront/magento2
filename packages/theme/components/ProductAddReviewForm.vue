<template>
  <div>
    <div
      v-if="reviewSent && !error.addReview"
    >
      <p>Your review was submitted!</p>
    </div>
    <div
      v-else-if="error.addReview"
    >
      <p>{{ error.addReview }}</p>
    </div>
    <ValidationObserver
      v-else
      v-slot="{ handleSubmit, reset }"
    >
      <form
        id="billing-details-form"
        class="form"
        @submit.prevent="handleSubmit(submitForm(reset))"
      >
        <div class="form__horizontal">
          <ValidationProvider
            v-if="!isAuthenticated"
            v-slot="{ errors }"
            rules="required|min:2"
            name="name"
            class="form__element"
          >
            <SfInput
              v-model="form.nickname"
              name="name"
              label="Name"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="form__horizontal">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:2"
            name="summary"
            class="form__element"
          >
            <SfInput
              v-model="form.summary"
              name="summary"
              label="Title"
              required
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div
          v-for="metadata in ratingMetadata"
          :key="metadata.id"
          class="form__horizontal"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            :name="metadata.name.toLowerCase()"
            class="form__element"
          >
            <SfSelect
              v-model="form.ratings[metadata.id]"
              :label="metadata.name"
              :name="metadata.name.toLowerCase()"
              class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
              :valid="!errors[0]"
              :error-message="errors[0]"
            >
              <SfSelectOption
                v-for="value in metadata.values"
                :key="value.id"
                :value="value.id"
              >
                {{ value.label }}
              </SfSelectOption>
            </SfSelect>
          </ValidationProvider>
        </div>
        <div class="form__horizontal">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:2"
            name="summary"
            class="form__element"
          >
            <SfTextarea
              v-model="form.text"
              label="Review"
              name="review"
              :cols="60"
              :rows="10"
              wrap="soft"
              :valid="!errors[0]"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <SfButton class="form__button">
          Add review
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  onBeforeMount,
  computed,
} from '@vue/composition-api';
import {
  reviewGetters, useReview, userGetters, useUser,
} from '@vue-storefront/magento';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { min, oneOf, required } from 'vee-validate/dist/rules';
import {
  SfInput,
  SfButton,
  SfSelect,
  SfTextarea,
} from '@storefront-ui/vue';
import { useVueRouter } from '~/helpers/hooks/useVueRouter';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters',
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country',
});
const BASE_FORM = (id) => ({
  nickname: '',
  ratings: {},
  sku: id,
  summary: '',
  text: '',
});

export default defineComponent({
  name: 'ProductAddReview',
  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfTextarea,
    ValidationProvider,
    ValidationObserver,
  },
  emits: ['add-review'],
  setup(_, { emit }) {
    const { route } = useVueRouter();
    const { id } = route.params;
    const {
      loading,
      loadReviewMetadata,
      metadata,
      error,
    } = useReview(`productReviews-${id}`);
    const { isAuthenticated, user } = useUser();

    const reviewSent = ref(false);

    const form = ref(BASE_FORM(id));

    const ratingMetadata = computed(() => reviewGetters.getReviewMetadata([...metadata.value]));

    const formSubmitValue = computed(() => {
      const nickname = isAuthenticated.value
        ? userGetters.getFullName(user.value)
        : form.value.nickname;

      const ratings = Object.keys(form.value.ratings).map((key) => ({
        id: key,
        value_id: `${form.value.ratings[key]}`,
      }));

      return {
        ...form.value,
        nickname,
        ratings,
      };
    });

    const submitForm = (reset) => () => {
      if (!(
        formSubmitValue.value.ratings[0].value_id
        || formSubmitValue.value.ratings[0].id
        || formSubmitValue.value.nickname
        || formSubmitValue.value.summary
        || formSubmitValue.value.sku
        || formSubmitValue.value.text
      )) return;
      try {
        reviewSent.value = true;

        emit('add-review', formSubmitValue.value);

        reset();
      } catch {
        reviewSent.value = false;
      }
    };

    onBeforeMount(async () => {
      await loadReviewMetadata();
    });

    return {
      error,
      form,
      formSubmitValue,
      isAuthenticated,
      loading,
      ratingMetadata,
      reviewSent,
      submitForm,
    };
  },
});
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }

  &__button {
    display: block;
    margin-top: var(--spacer-md);
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
        margin-right: var(--spacer-lg);
      }

      &:last-child {
        margin-right: 0;
        margin-bottom: 0;
      }
    }
  }
}
</style>
