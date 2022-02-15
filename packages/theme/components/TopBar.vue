<template>
  <SfTopBar class="topbar">
    <template #left>
      <SfButton class="sf-button--text">
        {{ $t('Help & FAQs') }}
      </SfButton>
    </template>
    <template #center>
      <p>{{ $t('Download') }}</p>
      <SfButton class="topbar__button sf-button--text">
        {{ $t('Find out more') }}
      </SfButton>
    </template>
    <template #right>
      <CurrencySelector v-if="hasCurrencyToSelect" />
      <StoreSwitcher v-if="hasStoresToSelect" />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import { useCurrency, useStore } from '@vue-storefront/magento';
import { computed } from '@nuxtjs/composition-api';

export default {
  components: {
    CurrencySelector: () => import('./CurrencySelector'),
    SfTopBar,
    SfButton,
    StoreSwitcher: () => import('./StoreSwitcher'),
  },
  setup() {
    const {
      stores,
    } = useStore();

    const {
      currencies,
    } = useCurrency();

    return {
      hasStoresToSelect: computed(() => stores.value.length > 1),
      hasCurrencyToSelect: computed(() => currencies.value?.available_currency_codes?.length > 1),
    };
  },
};

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
