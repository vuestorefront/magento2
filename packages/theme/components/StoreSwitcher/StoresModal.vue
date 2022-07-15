<template>
  <SfBottomModal
    :is-open="isLangModalOpen"
    :title="availableStores.length > 0 ? $t('Change Store') : ''"
    @click:close="closeModal"
  >
    <SfList v-if="availableStores.length > 1">
      <SfListItem
        v-for="store in availableStores"
        :key="store.id"
      >
        <a
          href="/"
          class="container__store--link"
          :class="
            storeConfig.store_code === store.store_code
              ? 'container__store--selected'
              : ''
          "
          @click.prevent="changeStore(store)"
        >
          <SfCharacteristic class="language">
            <template #title>
              <span>{{ store.store_name }}</span>
            </template>
            <template #icon>
              <SfImage
                image-tag="nuxt-img"
                :src="`/icons/langs/${store.locale}.webp`"
                width="20"
                height="20"
                alt="Flag"
                class="language__flag"
              />
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
  defineComponent, onMounted, computed, PropType,
} from '@nuxtjs/composition-api';
import {
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic,
  SfImage,
} from '@storefront-ui/vue';
import { StoreConfig } from '~/modules/GraphQL/types';
import { AvailableStores, useStore } from '~/composables';

export default defineComponent({
  name: 'StoresModal',
  components: {
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic,
    SfImage,
  },
  props: {
    isLangModalOpen: Boolean,
    storeConfig: {
      type: Object as PropType<StoreConfig>,
      default: (): StoreConfig => ({}),
    },
  },
  emits: ['closeModal'],
  setup() {
    const {
      stores,
      change: changeStore,
      load: loadStores,
    } = useStore();

    const availableStores = computed<AvailableStores>(() => stores.value ?? []);

    onMounted(() => {
      if (stores.value && stores.value?.length) return;
      loadStores();
    });

    return {
      availableStores,
      changeStore,
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
});
</script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
}

.container__store {
  &--selected {
    font-weight: bold;
  }
}

.sf-characteristic__text {
  color: var(--bottom-modal-title-color, var(--c-text));
}

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
</style>
