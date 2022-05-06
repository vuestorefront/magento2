<template>
  <div>
    <span
      v-if="isPromoCodeApplied"
      class="applied-coupon"
    >
      {{ $t('Applied Coupon') }}:
      <span class="applied-coupon__code">{{ verifiedPromoCodeAppliedToCart }}</span>
    </span>
    <div class="promo-code">
      <SfInput
        v-model="promoCodeUserInput"
        name="promoCode"
        :disabled="isPromoCodeApplied"
        :label="$t('Enter promo code')"
        class="sf-input--filled promo-code__input"
        :error-message="$t('An error occurred')"
        :valid="!hasAnyError"
      />
      <SfButton
        class="promo-code__button"
        @click="applyOrRemovePromoCode"
      >
        {{ isPromoCodeApplied ? $t('Remove') : $t('Apply') }}
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

    const promoCodeUserInput = ref('');

    const verifiedPromoCodeAppliedToCart = computed(() => cartGetters.getAppliedCoupon(cart.value)?.code);
    const isPromoCodeApplied = computed(() => verifiedPromoCodeAppliedToCart.value !== undefined);

    const applyOrRemovePromoCode = async () => {
      try {
        // eslint-disable-next-line unicorn/prefer-ternary
        if (isPromoCodeApplied.value) {
          await removeCoupon({});
        } else {
          await applyCoupon({ couponCode: promoCodeUserInput.value });
        }
      } finally {
        promoCodeUserInput.value = '';
      }
    };

    const hasAnyError = computed(() => Object.values(error.value).some((value) => value instanceof Error));

    return {
      promoCodeUserInput,
      verifiedPromoCodeAppliedToCart,
      isPromoCodeApplied,
      applyOrRemovePromoCode,
      hasAnyError,
    };
  },
});
</script>

<style lang="scss" scoped>
.applied-coupon {
  &__code {
    font-weight: bold;
  }
}
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;

  &:last-child {
    padding-bottom: var(--spacer-xl);
  }

  .promo-code {
    &__input {
      --input-background: var(--c-white);
      flex: 1;
    }
  }
}

.promo-code {
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
    --input-background: var(--c-light);
    flex: 1;
  }
}
</style>
