<template>
  <div>
    <SfRadio
      v-for="method in paymentMethods"
      :key="method.value"
      v-e2e="'payment-method'"
      :label="method.label"
      :value="method.value"
      :selected="selectedMethod"
      name="paymentMethod"
      class="form__radio payment"
      @input="definePaymentMethods(method.value)"
    >
      <div class="payment__label">
        {{ method.label }}
      </div>
    </SfRadio>
  </div>
</template>

<script>
import { SfRadio } from '@storefront-ui/vue';
import {
  ref,
  onMounted,
  computed,
  defineComponent,
} from '@vue/composition-api';
import { usePaymentProvider } from '@vue-storefront/magento';

export default defineComponent({
  name: 'VsfPaymentProvider',

  components: {
    SfRadio,
  },

  emits: ['status'],

  setup(props, { emit }) {
    const { load, state, save } = usePaymentProvider();
    const selectedMethod = ref(null);

    onMounted(async () => {
      await load();
    });

    const paymentMethods = computed(() => (Array.isArray(state.value) ? state.value.map((p) => ({
      label: p.title,
      value: p.code,
    })) : []));

    const definePaymentMethods = async (paymentMethod) => {
      try {
        await save({
          paymentMethod: {
            code: paymentMethod,
          },
        });

        selectedMethod.value = paymentMethod;

        emit('status', paymentMethod);
      } catch (e) {
        console.error(e);
      }
    };

    return {
      state,
      paymentMethods,
      selectedMethod,
      definePaymentMethods,
    };
  },
});
</script>

<style lang="scss" scoped>
.payment {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
