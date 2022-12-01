<template>
  <SfBottomModal
    :is-open="isModalOpen"
    :title="$t('Choose Currency')"
    @click:close="closeModal"
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
          @click.prevent="changeCurrency({id: currency})"
        >
          <SfCharacteristic class="currency">
            <template #title>
              <span>{{ currency }}</span>
            </template>
          </SfCharacteristic>
        </a>
      </SfListItem>
    </SfList>
    <template #close-mobile>
      <SfButton
        class="sf-button--full-width sf-bottom-modal__cancel"
        aria-label="Close"
        @click="closeModal"
      >
        {{ $t('Cancel') }}
      </SfButton>
    </template>
  </SfBottomModal>
</template>
<script lang="ts">
import {
  defineComponent, computed, onMounted,
} from '@nuxtjs/composition-api';
import {
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import {
  useCurrency,
} from '~/composables';

export default defineComponent({
  name: 'CurrenciesModal',
  components: {
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
  },
  props: {
    isModalOpen: Boolean,
    selectedCurrency: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal'],
  setup() {
    const {
      currency: currencies,
      change: changeCurrency,
      load: loadCurrencies,
    } = useCurrency();

    const availableCurrencies = computed<string[]>(() => currencies.value?.available_currency_codes || []);

    onMounted(() => {
      if (currencies.value && currencies.value?.available_currency_codes) return;
      loadCurrencies();
    });

    return {
      changeCurrency,
      availableCurrencies,
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
});
</script>
<style lang="scss" scoped>
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

.container__currency {
  &--selected-label {
    font-weight: bold;
  }

  &:hover,
  &--selected {
    opacity: 1;
  }
}
</style>
