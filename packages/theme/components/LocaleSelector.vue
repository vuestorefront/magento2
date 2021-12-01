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
      :title="availableStores.length > 0 ? 'Change Store': ''"
      @click:close="isLangModalOpen = !isLangModalOpen"
    >
      <SfList
        v-if="availableStores.length > 1"
      >
        <SfListItem
          v-for="store in availableStores"
          :key="store.id"
        >
          <a
            href="/"
            class="container__store--link"
            :class="storeConfigGetters.isSelectedStore(storeConfig)(store) ? 'container__store--selected' : ''"
            @click="handleChanges(() => changeStore(store))"
          >
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ storeConfigGetters.getName(store) }}</span>
              </template>
              <template #icon>
                <SfImage
                  :src="`/icons/langs/${storeConfigGetters.getLocale(store)}.webp`"
                  width="20"
                  alt="Flag"
                  class="language__flag"
                />
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>

      <SfHeading
        title="Choose Currency"
        class="container__lang--title temp_hide"
        v-if="!hideCurrency"
      />

      <SfList
        v-if="availableCurrencies.length > 1 && !hideCurrency"
      >
        <SfListItem
          v-for="currency in availableCurrencies"
          :key="currency"
        >
          <a
            href="/"
            :class="selectedCurrency === currency ? 'container__currency--selected' : ''"
            @click.prevent="handleChanges(() => changeCurrency(currency), false, true)"
          >
            <SfCharacteristic class="currency">
              <template #title>
                <span>{{ currency }}</span>
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>

      <SfHeading
        v-if="availableLocales.length > 1"
        :level="3"
        title="Choose language"
        class="container__lang--title"
      />
      <SfList
        v-if="availableLocales.length > 1"
      >
        <SfListItem
          v-for="lang in availableLocales"
          :key="lang.code"
        >
          <nuxt-link :to="switchLocalePath(lang.code)">
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <SfImage
                  :src="`/icons/langs/${lang.code}.webp`"
                  width="20"
                  alt="Flag"
                  class="language__flag"
                />
              </template>
            </SfCharacteristic>
          </nuxt-link>
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
  storeConfigGetters,
} from '@vue-storefront/magento';
import {
  SfImage,
  SfButton,
  SfList,
  SfHeading,
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api';
import { useI18n } from '~/helpers/hooks/usei18n';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';

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
      selectedCurrency,
      selectedLocale,
    } = useMagentoConfiguration();

    const {
      config,
    } = useConfig();

    const {
      stores,
      change: changeStore,
    } = useStore();

    // Currency switcher isn't working yet
    const {
      currencies,
      change: changeCurrency,
    } = useCurrency();

    const route = useRoute();
    const router = useRouter();

    const {
      path,
      fullPath,
    } = route.value;
    const {
      locales,
      locale,
    } = useI18n();
    const isLangModalOpen = ref(false);

    const availableLocales = computed(() => [...locales].filter((i) => (Object.keys(i).length > 0 && typeof i === 'object' ? i.code !== locale : i !== locale)));
    const availableStores = computed(() => stores.value ?? []);

    const availableCurrencies = computed(() => currencies.value?.available_currency_codes);
    const handleChanges = async (cb, redirect = true, refresh = false) => {
      if (cb) {
        await cb();
      }
      if (redirect) {
        await router.replace(path);
      }

      if (refresh) {
        router.go(fullPath);
      }
    };

    return {
      availableCurrencies,
      availableLocales,
      availableStores,
      changeCurrency,
      changeStore,
      handleChanges,
      isLangModalOpen,
      locale,
      selectedCurrency,
      hideCurrency: true,
      selectedLocale,
      storeConfig: config,
      storeConfigGetters,
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

  &__store {
    &--selected {
      font-weight: bold;
    }
  }
  &__currency {
    &--selected {
      font-weight: bold;
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
