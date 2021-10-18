<template>
  <div>
    <span
      v-if="promoIsApplied"
      class="applied-coupon"
    >
      {{ $t('Applied Coupon') }}:
      <span class="applied-coupon__code">{{ promoCode }}</span>
    </span>
    <div class="promo-code">
      <SfInput
        v-model="promoCode"
        name="promoCode"
        :disabled="promoIsApplied"
        :label="$t('Enter promo code')"
        class="sf-input--filled promo-code__input"
      />
      <SfButton
        class="promo-code__button"
        @click="handleCoupon"
      >
        {{ promoIsApplied ? $t('Remove') : $t('Apply') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { SfButton, SfInput } from '@storefront-ui/vue';
import { useCart, cartGetters } from '@vue-storefront/magento';
import {
  computed,
  onMounted,
  watch,
  ref,
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'CouponCode',
  components: {
    SfButton,
    SfInput,
  },
  setup() {
    const { cart, applyCoupon, removeCoupon } = useCart();
    const promoCode = ref('');
    const promoIsApplied = computed(
      () => cartGetters.getAppliedCoupon(cart.value)?.code,
    );

    const setCartCoupon = () => {
      promoCode.value = promoIsApplied.value;
    };

    const handleCoupon = async () => {
      await (promoIsApplied.value
        ? removeCoupon({ currentCart: cart.value })
        : applyCoupon({ couponCode: promoCode.value }));
    };

    onMounted(setCartCoupon);
    watch(promoIsApplied, setCartCoupon);

    return {
      handleCoupon,
      promoIsApplied,
      promoCode,
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
