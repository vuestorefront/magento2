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
      <!--
      /**
       * The currency switch is commented, until the Core package
       * enables the switch of currency without returning to the browser one with i18n
       */
        <CurrencySelector />
      -->
      <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
// import CurrencySelector from './CurrencySelector';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    // CurrencySelector,
    SfTopBar,
    SfButton,
    LocaleSelector,
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
