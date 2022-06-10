<template>
  <div>
    <span v-if="isCouponCodeApplied">
      {{ $t('Applied Coupon') }}:
      <span
        class="applied-coupon-code"
        v-text="couponCodeAppliedToCart"
      />
    </span>
    <div class="coupon-code">
      <SfInput
        v-model="couponCodeUserInput"
        data-testid="promo-code"
        name="couponCode"
        :disabled="isCouponCodeApplied"
        :label="$t('Enter promo code')"
        class="sf-input--filled coupon-code__input"
        :error-message="$t(applyCouponMsg.message)"
        :valid="!hasAnyError"
      />
      <SfButton
        class="coupon-code__button"
        @click="applyOrRemoveCoupon"
      >
        {{ $t(isCouponCodeApplied ? 'Remove' : 'Apply') }}
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts">
import { SfButton, SfInput } from '@storefront-ui/vue';
import {
  computed,
  ref,
  defineComponent,
} from '@nuxtjs/composition-api';
import cartGetters from '~/modules/checkout/getters/cartGetters';
import { useCart } from '~/modules/checkout/composables/useCart';

export default defineComponent({
  name: 'CouponCode',
  components: {
    SfButton,
    SfInput,
  },
  setup() {
    const {
      cart, applyCoupon, removeCoupon, error,
    } = useCart();

    const couponCodeUserInput = ref('');

    const couponCodeAppliedToCart = computed(() => cartGetters.getAppliedCoupon(cart.value)?.code);
    const isCouponCodeApplied = computed(() => couponCodeAppliedToCart.value !== undefined);
    const hasAnyError = computed(() => Object.values(error.value).some((value) => value !== null));
    const applyCouponMsg = computed<Error>(() => error.value.applyCoupon || error.value.removeCoupon || { message: '', name: 'apply-coupon' });
    const applyOrRemoveCoupon = async () => {
      const operationPromise = isCouponCodeApplied.value
        ? removeCoupon({})
        : applyCoupon({ couponCode: couponCodeUserInput.value });
      await operationPromise;
      couponCodeUserInput.value = '';
    };

    return {
      couponCodeUserInput,
      couponCodeAppliedToCart,
      isCouponCodeApplied,
      applyCouponMsg,
      applyOrRemoveCoupon,
      hasAnyError,
    };
  },
});
</script>

<style lang="scss" scoped>
.applied-coupon-code {
    font-weight: bold;
}

.coupon-code {
  display: flex;
  align-items: flex-start;
  margin: {
    top: var(--spacer-sm);
    bottom: var(--spacer-sm);
  }

  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }

  &__input {
    flex: 1;
    ::v-deep input {
      --input-background: var(--c-white);
    }
  }
}
</style>
