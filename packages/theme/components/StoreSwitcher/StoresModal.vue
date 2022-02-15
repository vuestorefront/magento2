<template>
  <SfBottomModal
    :is-open="isLangModalOpen"
    :title="availableStores.length > 0 ? 'Change Store': ''"
    @click:close="closeModal"
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
              <nuxt-img
                :src="`/icons/langs/${storeConfigGetters.getLocale(store)}.webp`"
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
  </SfBottomModal>
</template>
<script>
import {
  defineComponent,
  onMounted,
  computed,
} from '@nuxtjs/composition-api';
import {
  SfList,
  SfBottomModal,
  SfCharacteristic,
} from '@storefront-ui/vue';
import {
  useStore,
  storeConfigGetters,
  storeGetters,
} from '@vue-storefront/magento';
import { useHandleChanges } from '~/helpers/magentoConfig/handleChanges';

export default defineComponent({
  name: 'StoresModal',
  components: {
    SfList,
    SfBottomModal,
    SfCharacteristic,
  },
  props: {
    isLangModalOpen: Boolean,
    storeConfig: Object,
  },
  emits: ['closeModal'],
  setup() {
    const { handleChanges } = useHandleChanges();

    const {
      stores,
      change: changeStore,
      load: loadStores,
    } = useStore('header-stores');

    const availableStores = computed(() => stores.value ?? []);

    onMounted(() => {
      if (stores.value && stores.value?.length) return;
      loadStores();
    });

    return {
      storeGetters,
      storeConfigGetters,
      handleChanges,
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
