<template>
  <div class="container">
    <SfButton
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <SfImage
        :src="`/icons/langs/${locale}.webp`"
        width="20"
        alt="Flag"
      />
    </SfButton>
    <SfBottomModal
      :is-open="isLangModalOpen"
      :title="availableStores.length > 0 ? 'Change language': ''"
      @click:close="isLangModalOpen = !isLangModalOpen"
    >
      <SfList>
        <SfListItem v-for="store in availableStores" :key="store.id">
          <a
            href="/"
            class="container__store--link"
            :class="isStoreSelected(store) ? 'container__store--selected' : ''"
            @click="handleChangeStore(store)"
          >
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ store.store_name }} - {{ store.locale }}</span>
              </template>
              <template #icon>
                <SfImage :src="`/icons/langs/${getStoreLocale(store)}.webp`" width="20" alt="Flag" class="language__flag" />
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>

      <SfHeading
        :level="3"
        title="Choose Currency"
        class="container__lang--title"
      />

      <SfList>
        <SfListItem
          v-for="currency in availableCurrencies"
          :key="currency"
        >
          <a href="/"
             @click.prevent="changeCurrency(currency)">
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
  useConfig,
  useStore,
  useCurrency,
  useCart,
} from '@vue-storefront/magento';
import {
  SfImage,
  SfButton,
  SfList,
  SfHeading,
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import { ref, computed, defineComponent } from '@nuxtjs/composition-api';
import { useI18n } from '~/helpers/hooks/usei18n';
import { onSSR } from '@vue-storefront/core';

export default defineComponent({
  components: {
    SfImage,
    SfButton,
    SfList,
    SfHeading,
    SfBottomModal,
    SfCharacteristic,
  },
  setup() {
    const {
      loadConfig,
      config,
    } = useConfig();

    const {
      load: loadStores,
      stores,
      change: changeStore,
    } = useStore();

    const {
      load: loadCurrencies,
      currencies,
      change: changeCurrency,
    } = useCurrency();

    const { clear, cart } = useCart();

    const { locales, locale } = useI18n();
    const isLangModalOpen = ref(false);
    const availableLocales = computed(() => [...locales].filter((i) => (Object.keys(i).length > 0 && typeof i === 'object' ? i.code !== locale : i !== locale)));

    onSSR(async () => {
      await Promise.all([
        loadConfig(),
        loadStores(),
        loadCurrencies(),
      ]);
    });

    const availableStores = computed(() => stores.value ?? []);
    const selectedStore = computed(() => config.value?.store_code);
    const availableCurrencies = computed(() => currencies.value?.available_currency_codes);

    const handleChangeStore = async (store) => {
      // isLangModalOpen.value = false;
      if (cart?.value) await clear(cart);
      changeStore(store);
    };

    const isStoreSelected = (store) => selectedStore.value?.id === store.id;
    const getStoreLocale = (store) => store?.locale ?? locale;

    return {
      availableStores,
      selectedStore,
      availableLocales,
      locale,
      isLangModalOpen,
      handleChangeStore,
      isStoreSelected,
      getStoreLocale,
      changeCurrency,
      availableCurrencies,
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
  &__lang {
    width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}
</style>
