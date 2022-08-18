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
        :value="$fc(totals.subtotal)"
        :class="['sf-property--full-width', 'sf-property--large property']"
      />
      <SfProperty
        v-if="hasDiscounts"
        :name="$t('Discount')"
        :value="$fc(discount)"
        class="sf-property--full-width sf-property--small property"
      />
      <SfProperty
        v-if="selectedShippingMethod"
        :name="$t('Shipping')"
        :value="$fc(getShippingMethodPrice(selectedShippingMethod))"
        class="sf-property--full-width sf-property--large property"
      />

      <SfProperty
        :name="$t('Total')"
        :value="$fc(totals.total)"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <CouponCode class="highlighted" />
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
import { SfHeading, SfProperty, SfCharacteristic } from '@storefront-ui/vue';
import { computed, ref, defineComponent } from '@nuxtjs/composition-api';
import cartGetters from '~/modules/checkout/getters/cartGetters';
import useCart from '~/modules/checkout/composables/useCart';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';
import CouponCode from '../../../components/CouponCode.vue';

const CHARACTERISTICS = [
  {
    title: 'Safety',
    description: 'It carefully packaged with a personal touch',
    icon: 'safety',
  },
  {
    title: 'Easy shipping',
    description: 'You’ll receive dispatch confirmation and an arrival date',
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
    SfProperty,
    SfCharacteristic,
    CouponCode,
  },
  setup() {
    const { cart, removeItem, updateItemQty } = useCart();

    const listIsHidden = ref(false);

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const discount = computed(() => -cartGetters.getDiscountAmount(cart.value));
    const hasDiscounts = computed(() => Math.abs(discount.value) > 0);
    const selectedShippingMethod = computed(() => cartGetters.getSelectedShippingMethod(cart.value));

    return {
      cart,
      discount,
      hasDiscounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      removeItem,
      updateItemQty,
      cartGetters,
      getShippingMethodPrice,
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
</style>
