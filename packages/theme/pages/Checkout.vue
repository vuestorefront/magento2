<template>
  <div id="checkout">
    <div class="checkout">
      <div class="checkout__main">
        <SfSteps
          v-if="!isThankYou"
          :active="currentStepIndex"
          :class="{ 'checkout__steps': true }"
          @change="handleStepClick"
        >
          <SfStep
            v-for="(step, key) in STEPS"
            :key="key"
            :name="step"
          >
            <nuxt-child />
          </SfStep>
        </SfSteps>
        <nuxt-child v-else />
      </div>
      <div
        v-if="!isThankYou"
        class="checkout__aside desktop-only"
      >
        <transition name="fade">
          <CartPreview key="order-summary" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { SfSteps } from '@storefront-ui/vue';
import {
  computed, defineComponent, ref, useRoute, useRouter, useContext,
} from '@nuxtjs/composition-api';
import CartPreview from '~/components/Checkout/CartPreview.vue';

export default defineComponent({
  name: 'CheckoutPage',
  components: {
    SfSteps,
    CartPreview,
  },
  setup() {
    const route = useRoute();
    const { app } = useContext();
    const { path } = route.value;
    const router = useRouter();
    const currentStep = computed(() => path.split('/').pop());
    const STEPS = ref({
      'user-account': 'User Account',
      shipping: 'Shipping',
      billing: 'Billing',
      payment: 'Payment',
    });
    const currentStepIndex = computed(() => Object.keys(STEPS.value)
      .indexOf(currentStep.value));
    const isThankYou = computed(() => currentStep.value === 'thank-you');

    const handleStepClick = async (stepIndex) => {
      const key = Object.keys(STEPS.value)[stepIndex];
      await router.push(`${app.localePath(`/checkout/${key}`)}`);
    };

    return {
      handleStepClick,
      STEPS,
      currentStepIndex,
      isThankYou,
      currentStep,
    };
  },
});
</script>

<style lang="scss" scoped>
#checkout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}

.checkout {
  @include for-desktop {
    display: flex;
  }

  &__main {
    @include for-desktop {
      flex: 1;
      padding: var(--spacer-xl) 0 0 0;
    }
  }

  &__aside {
    @include for-desktop {
      flex: 0 0 25.5rem;
      margin: 0 0 0 4.25rem;
    }
  }

  &__steps {
    --steps-content-padding: 0 var(--spacer-base);
    @include for-desktop {
      --steps-content-padding: 0;
    }

    &-auth::v-deep .sf-steps__step:first-child {
      --steps-step-color: #e8e4e4;
    }
  }
}

</style>
