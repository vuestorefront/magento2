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
            :class="storeGetters.getSelected(storeConfig, store) ? 'container__store--selected' : ''"
            @click="handleChanges({
              callback: () => changeStore(store),
              redirect: false,
              windowRefresh: true,
            })"
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
  storeConfigGetters,
  storeGetters,
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
} from '@nuxtjs/composition-api';
import { useI18n } from '~/helpers/hooks/usei18n';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';
import { useHandleChanges } from '~/helpers/magentoConfig/handleChanges';

export default defineComponent({
  name: 'LocaleSelector',
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
    const { handleChanges } = useHandleChanges();

    const {
      locales,
      locale,
    } = useI18n();
    const isLangModalOpen = ref(false);

    const availableLocales = computed(() => [...locales].filter((i) => (Object.keys(i).length > 0 && typeof i === 'object' ? i.code !== locale : i !== locale)));
    const availableStores = computed(() => stores.value ?? []);

    return {
      availableLocales,
      availableStores,
      changeStore,
      handleChanges,
      isLangModalOpen,
      locale,
      selectedCurrency,
      selectedLocale,
      storeConfig: config,
      storeConfigGetters,
      storeGetters,
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
