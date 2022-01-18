<template>
  <div class="container">
    <SfButton
      class="container__currency container__currency--selected"
      @click="isCurrencyModalOpen = !isCurrencyModalOpen"
    >
      {{ currentCurrencySymbol }}
    </SfButton>
    <SfBottomModal
      :is-open="isCurrencyModalOpen"
      title="Choose Currency"
      @click:close="isCurrencyModalOpen = !isCurrencyModalOpen"
    >
      <SfList
        v-if="availableCurrencies.length > 1"
      >
        <SfListItem
          v-for="currency in availableCurrencies"
          :key="currency"
        >
          <a
            href="/"
            :class="selectedCurrency === currency ? 'container__currency--selected-label' : ''"
            @click.prevent="handleChanges({
              callback: () => changeCurrency({id: currency}),
              redirect: false,
              refresh: true
            })"
          >
            <SfCharacteristic class="currency">
              <template #title>
                <span>{{ currency }}</span>
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script>
import {
  useCurrency,
} from '@vue-storefront/magento';
import {
  SfImage,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';
import { useHandleChanges } from '~/helpers/magentoConfig/handleChanges';

export default defineComponent({
  name: 'CurrencySelector',
  components: {
    SfImage,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
  },
  setup() {
    const {
      selectedCurrency,
      selectedLocale,
    } = useMagentoConfiguration();

    /**
     * The currency switch is commented, until the Core package
     * enables the switch of currency without returning to the browser one with i18n
     */
    const {
      currencies,
      change: changeCurrency,
    } = useCurrency();

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

    const { handleChanges } = useHandleChanges();

    const isCurrencyModalOpen = ref(false);

    const availableCurrencies = computed(() => currencies.value?.available_currency_codes);

    return {
      currentCurrencySymbol,
      availableCurrencies,
      changeCurrency,
      handleChanges,
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

  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }

  .sf-bottom-modal::v-deep .sf-bottom-modal__close {
    position: var(--circle-icon-position, absolute);
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }

  .sf-list {
    .language {
      padding: var(--spacer-sm);

      &__flag {
        margin-right: var(--spacer-sm);
      }
    }

    @include for-desktop {
      display: flex;
    }
  }

  &__currency {
    &--selected-label {
      font-weight: bold;
    }

    width: 20px;
    --button-box-shadow: none;
    padding: 0px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    margin-right: 15px;
    background-color: white;
    color: black;
    border-radius: 50px;

    &:hover,
    &--selected {
      opacity: 1;
    }

    &--title {
      --heading-title-font-weight: var(--font-weight--normal);
      padding: var(
              --bottom-modal-title-padding,
              var(--spacer-sm) var(--spacer-lg)
      );
      color: var(--bottom-modal-title-color, var(--c-text));
      text-align: var(--bottom-modal-title-text-align, center);
      @include for-mobile {
        --heading-title-font-size: var(--font-size--xs);
        --heading-title-font-weight: var(--font-weight--bold);
      }
    }
  }
}
</style>
