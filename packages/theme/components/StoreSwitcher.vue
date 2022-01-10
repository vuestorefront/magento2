<template>
  <div class="container">
    <SfButton
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <SfCharacteristic class="store-switcher">
        <template #title>
          <span>{{ storeConfig.store_name }}</span>
        </template>
        <template #icon>
          <SfImage
            :src="`/icons/langs/${storeConfigGetters.getLocale(storeConfig)}.webp`"
            width="20"
            alt="Flag"
            class="language__flag"
          />
        </template>
      </SfCharacteristic>
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
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import {
  ref,
  computed,
  defineComponent,
} from '@nuxtjs/composition-api';
import { useHandleChanges } from '~/helpers/magentoConfig/handleChanges';

export default defineComponent({
  name: 'StoreSwitcher',
  components: {
    SfImage,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
  },
  setup() {
    const {
      config,
    } = useConfig();

    const {
      stores,
      change: changeStore,
    } = useStore();

    const { handleChanges } = useHandleChanges();
    const isLangModalOpen = ref(false);

    const availableStores = computed(() => stores.value ?? []);

    return {
      availableStores,
      changeStore,
      handleChanges,
      isLangModalOpen,
      storeConfig: config,
      storeConfigGetters,
      storeGetters,
    };
  },
});
</script>

<style lang="scss" scoped>

.container {
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

  .language {
    padding: var(--spacer-sm);

    &__flag {
      margin-right: var(--spacer-sm);
    }
  }

  .sf-list {
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

  .sf-characteristic__text {
    color: var(--bottom-modal-title-color, var(--c-text));
  }

  .store-switcher {
    text-transform: capitalize;
    color: var(--bottom-modal-title-color, var(--c-link));
    font-size: var(--font-size--sm);
  }
}
</style>
