<template>
  <div class="container">
    <SfButton
      class="container__currency container__currency--selected"
      @click="isCurrencyModalOpen = !isCurrencyModalOpen"
    >
      {{ currentCurrencySymbol }}
    </SfButton>
    <CurrenciesModal
      v-if="isCurrencyModalOpen"
      :is-modal-open="isCurrencyModalOpen"
      :selected-currency="selectedCurrency"
      @closeModal="isCurrencyModalOpen = false"
    />
  </div>
</template>
<script lang="ts">
import { SfButton } from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';
import CurrenciesModal from './CurrencySelector/CurrenciesModal.vue';

export default defineComponent({
  name: 'CurrencySelector',
  components: {
    SfButton,
    CurrenciesModal,
  },
  setup() {
    const {
      selectedCurrency,
      selectedLocale,
    } = useMagentoConfiguration();

    const currentCurrencySymbol = computed(() => {
      try {
        return (0).toLocaleString(
          selectedLocale.value.replace(/[!"$-/:-?[\]^_`{-~]/, '-'),
          {
            style: 'currency',
            currency: selectedCurrency.value,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          },
        )
          .replace(/\d/g, '')
          .trim();
      } catch {
        return selectedLocale.value;
      }
    });

    const isCurrencyModalOpen = ref(false);

    return {
      currentCurrencySymbol,
      isCurrencyModalOpen,
      selectedCurrency,
      selectedLocale,
    };
  },
});
</script>

<style lang="scss" scoped>

.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
}

.container__currency {
  width: 20px;
  --button-box-shadow: none;
  padding: 0;
  display: flex;
  align-items: center;
  opacity: 0.5;
  border: none;
  margin-right: 15px;
  background-color: white;
  color: black;
  border-radius: 50px;

  &--selected-label {
    font-weight: bold;
  }

  &:hover,
  &--selected {
    opacity: 1;
  }
}
</style>
