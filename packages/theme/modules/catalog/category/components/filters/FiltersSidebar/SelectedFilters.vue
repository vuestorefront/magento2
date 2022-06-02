<template>
  <div class="selected-filters-wrapper">
    <SfBadge
      v-for="(filter, key) in removableFilters"
      :key="key"
      class="selected-filter"
      data-testid="selected-filter"
    >
      <HTMLContent
        class="selected-filter__label"
        tag="span"
        :content="getLabel(filter)"
      />
      <button
        type="button"
        class="selected-filter__remove"
        data-testid="selected-filter-remove"
        @click.prevent="$emit('removeFilter', { id: filter.id, value: filter.value })"
      >
        <SfIcon
          class="sf-cross__icon"
          icon="cross"
          size="20px"
          color="white"
          viewBox="0 0 24 12"
        />
      </button>
    </SfBadge>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api';
import { SfBadge, SfIcon } from '@storefront-ui/vue';
import HTMLContent from '~/components/HTMLContent.vue';
import type { RemovableFilterInterface } from '~/modules/catalog/category/components/filters/useFilters';
import { FilterTypeEnum } from '~/modules/catalog/category/config/config';

export default defineComponent({
  components: {
    HTMLContent,
    SfBadge,
    SfIcon,
  },
  props: {
    removableFilters: {
      type: Array as PropType<RemovableFilterInterface[]>,
      default: () => [],
    },
  },
  setup() {
    const { app: { i18n } } = useContext();

    const getLabel = (filter: RemovableFilterInterface) => {
      if (filter.type === FilterTypeEnum.YES_NO) {
        const yesNo = filter.label === '1' ? i18n.t('Yes') : i18n.t('No');
        return `${filter.name}: ${yesNo}`;
      }

      return filter.label;
    };

    return {
      getLabel,
    };
  },
});
</script>
<style lang="scss">
.selected-filters-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.selected-filter {
  display: flex;
  margin-right: var(--spacer-xs);
  margin-bottom: var(--spacer-xs);
  padding: var(--spacer-xs) var(--spacer-xs);

  &__label {
    font-size: var(--font-size--base);
  }

  &__remove {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
