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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import { useTopBar } from './useTopBar';

export default defineComponent({
  components: {
    CurrencySelector: () => import('../CurrencySelector.vue'),
    StoreSwitcher: () => import('../StoreSwitcher.vue'),
    SfTopBar,
    SfButton,
  },
  setup() {
    const { hasCurrencyToSelect, hasStoresToSelect } = useTopBar();

    return {
      hasCurrencyToSelect,
      hasStoresToSelect,
    };
  },
});

</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  z-index: 2;
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}

::v-deep {
  .sf-top-bar__container {
    justify-content: space-between;
    & > * {
      width: calc(100% / 3);
      justify-content: center;
    }
    & > :first-child {
      justify-content: flex-start;
    }
    & > :last-child {
      justify-content: flex-end;
    }
  }
}
</style>
