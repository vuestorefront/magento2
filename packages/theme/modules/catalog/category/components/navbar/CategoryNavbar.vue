<template>
  <div class="navbar section">
    <SfButton
      :aria-label="$t('Filters')"
      class="sf-button--text navbar__filters-button smartphone-only"
      @click="toggleFilterSidebar"
    >
      <SvgImage
        class="navbar__filters-icon"
        height="24"
        icon="filter2"
        width="24"
      />
      {{ $t('Filters') }}
    </SfButton>
    <div class="navbar__sort">
      <span class="navbar__label desktop-only">{{ $t('Sort by') }}:</span>
      <SkeletonLoader
        v-if="isLoading"
        class="navbar__select navbar__select-skeleton"
        height="26px"
        width="185px"
        margin="0"
      />
      <SfSelect
        v-else
        :value="sortBy.selected"
        class="navbar__select"
        @input="doChangeSorting"
      >
        <SfSelectOption
          v-for="option in sortBy.options"
          :key="option.value"
          :value="option.value"
          class="sort-by__option"
        >
          {{ $t(option.label) }}
        </SfSelectOption>
      </SfSelect>
    </div>

    <div class="navbar__counter">
      <span class="navbar__label desktop-only">{{ $t('Products found') }}: </span>
      <SkeletonLoader
        v-if="isLoading"
        width="15px"
        height="26px"
        margin="0"
      />
      <span v-else>{{ pagination.totalItems }}</span>
      <span class="navbar__label smartphone-only">&nbsp;{{ $t('Items') }}</span>
    </div>

    <div class="navbar__view">
      <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
      <SvgImage
        :aria-pressed="isCategoryGridView"
        :class="{ 'navbar__view-icon--active': isCategoryGridView }"
        :label="$t('Change to grid view')"
        class="navbar__view-icon"
        height="12"
        icon="tiles"
        width="12"
        @click.native="changeToCategoryGridView"
      />
      <SvgImage
        :aria-pressed="!isCategoryGridView"
        :class="{ 'navbar__view-icon--active': !isCategoryGridView }"
        :label="$t('Change to list view')"
        class="navbar__view-icon"
        height="12"
        icon="list"
        width="12"
        @click.native="changeToCategoryListView"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import {
  SfSelect,
  SfButton,
} from '@storefront-ui/vue';
import SvgImage from '~/components/General/SvgImage.vue';
import { useUiHelpers, useUiState } from '~/composables';
import { Pagination } from '~/composables/types';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';
import { SortingModel } from '~/modules/catalog/category/composables/useFacet/sortingOptions';

export default defineComponent({
  components: {
    SkeletonLoader,
    SvgImage,
    SfSelect,
    SfButton,
  },
  props: {
    sortBy: {
      type: Object as PropType<SortingModel>,
      required: true,
    },
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const {
      toggleFilterSidebar, changeToCategoryListView, changeToCategoryGridView, isCategoryGridView,
    } = useUiState();
    const uiHelpers = useUiHelpers();
    const doChangeSorting = (sort: string) => {
      uiHelpers.changeSorting(sort, false);
      emit('reloadProducts');
    };
    return {
      toggleFilterSidebar,
      doChangeSorting,
      ...uiHelpers,
      changeToCategoryListView,
      changeToCategoryGridView,
      isCategoryGridView,
    };
  },
});
</script>

<style lang="scss" scoped>

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  padding: var(--spacer-sm) var(--spacer-xs);;

  @include for-desktop {
    border-width: 1px 0 1px 0;
    padding: var(--spacer-base);
  }

  &__aside {
    display: flex;
    align-items: center;
  }

  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }

  &__main {
    flex: 1;
    padding: 0;
    justify-content: space-between;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }

  &__title {
    --heading-title-font-weight: var(--font-weight--semibold);
    --heading-title-font-size: var(--font-size--xl);
  }

  &__filters-icon {
    margin: 0 0 0 var(--spacer-xs);
    order: 1;
    @include for-desktop {
      margin: 0 var(--spacer-xs) 0 0;
      order: 0;
    }
  }

  &__filters-button {
    display: flex;
    align-items: center;
    --button-font-size: var(--font-size--base);
    --button-text-decoration: none;
    --button-color: var(--c-link);
    --button-font-weight: var(--font-weight--normal);
    @include for-mobile {
      --button-font-weight: var(--font-weight--medium);
      order: 2;
    }

    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }

    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }

  &__label {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    color: var(--c-text-muted);
    @include for-desktop {
      color: var(--c-link);
      margin: 0 var(--spacer-2xs) 0 0;
    }
  }

  &__select {
    --select-padding: 0;
    --select-height: auto;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-option-font-size: var(--font-size-sm);
    --select-error-message-height: 0;

    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size-sm);
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--light);
      margin: 0;
    }

    ::v-deep .sf-select__placeholder {
      --select-option-font-size: var(--font-size-sm);
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    @include for-mobile {
      margin: 0;
      order: 1;
    }
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
    display: flex;
    align-items: center;

    margin: {
      left: var(--spacer-xs);
      right: var(--spacer-xs);
    }
    @include for-desktop {
      margin: auto 0 auto auto;
      order: 0;
    }
  }

  &__view {
    display: flex;
    align-items: center;
    order: 0;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
      order: 0;
    }

    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;

      &:last-child {
        margin: 0;
      }
    }

    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--secondary);
      text-decoration: none;
      color: var(--c-link);
    }
  }

  &__view-icon {
    cursor: pointer;

    &--active {
      color: var(--c-primary);
    }
  }
}
</style>
