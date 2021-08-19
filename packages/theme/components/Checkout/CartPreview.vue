<template>
  <div>
    <div class="highlighted">
      <SfHeading
        :level="3"
        :title="$t('Order summary')"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </div>
    <div class="highlighted">
      <SfProperty
        :name="$t('Products')"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('Subtotal')"
        :value="$n(totals.subtotal, 'currency')"
        :class="['sf-property--full-width', 'sf-property--large property']"
      />
      <SfProperty
        v-if="hasDiscounts"
        :name="$t('Discount')"
        :value="$n(discountsAmount, 'currency')"
        class="sf-property--full-width sf-property--small property"
      />
      <SfProperty
        v-if="selectedShippingMethod"
        :name="$t('Shipping')"
        :value="$n(getShippingMethodPrice(selectedShippingMethod), 'currency')"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('Total')"
        :value="$n(totals.total, 'currency')"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <div class="highlighted promo-code">
      <SfInput
        v-model="promoCode"
        name="promoCode"
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
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
  SfHeading,
  SfButton,
  SfProperty,
  SfCharacteristic,
  SfInput,
} from '@storefront-ui/vue';
import {
  computed,
  onMounted,
  watch,
  ref,
  defineComponent,
} from '@vue/composition-api';
import { useCart, cartGetters } from '@vue-storefront/magento';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';

const CHARACTERISTICS = [
  {
    title: 'Safety',
    description: 'It carefully packaged with a personal touch',
    icon: 'safety',
  },
  {
    title: 'Easy shipping',
    description:
      'You’ll receive dispatch confirmation and an arrival date',
    icon: 'shipping',
  },
  {
    title: 'Changed your mind?',
    description: 'Rest assured, we offer free returns within 30 days',
    icon: 'return',
  },
];

export default defineComponent({
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfProperty,
    SfCharacteristic,
    SfInput,
  },
  setup() {
    const {
      cart,
      removeItem,
      updateItemQty,
      applyCoupon,
      removeCoupon,
    } = useCart();

    const listIsHidden = ref(false);
    const promoCode = ref('');

    const promoIsApplied = computed(() => cartGetters.getAppliedCoupon(cart.value)?.code);

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value));
    const hasDiscounts = computed(() => discounts.value.length > 0);
    const discountsAmount = computed(() => -1 * discounts.value.reduce((a, el) => el.value + a, 0));
    const selectedShippingMethod = computed(() => cartGetters.getSelectedShippingMethod(cart.value));

    const setCartCoupon = () => {
      promoCode.value = promoIsApplied.value;
    };

    onMounted(setCartCoupon);

    watch(promoIsApplied, setCartCoupon);

    const handleCoupon = async () => {
      await (
        promoIsApplied.value
          // @TODO - Remove ignore when https://github.com/vuestorefront/vue-storefront/issues/5966 is applied
          // @ts-ignore
          ? removeCoupon({ currentCart: cart.value })
          : applyCoupon({ couponCode: promoCode.value })
      );
    };

    return {
      cart,
      discounts,
      discountsAmount,
      hasDiscounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      promoCode,
      removeItem,
      updateItemQty,
      cartGetters,
      getShippingMethodPrice,
      promoIsApplied,
      handleCoupon,
      characteristics: CHARACTERISTICS,
      selectedShippingMethod,
    };
  },
});
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;

  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}

.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}

.property {
  margin-bottom: var(--spacer-base);
}

.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-base);
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
    --input-background: var(--c-white);
    flex: 1;
  }
}

</style>
