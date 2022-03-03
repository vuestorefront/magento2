<template>
  <div class="navbar section">
    <div class="navbar__aside desktop-only">
      <SfHeading
        :level="3"
        :title="$t('Categories')"
        class="navbar__title"
      />
    </div>
    <div class="navbar__main">
      <SfButton
        :aria-label="$t('Filters')"
        class="sf-button--text navbar__filters-button"
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
        <SfSelect
          :value="sortBy.selected"
          class="navbar__select"
          placeholder="Select sorting"
          @input="doSorting"
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
        <span class="navbar__label desktop-only">{{ $t('Products found') }}</span>
        <span class="desktop-only">{{ pagination.totalItems }}</span>
        <span class="navbar__label smartphone-only">{{ pagination.totalItems }} {{
          $t('Items')
        }}</span>
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
  </div>
</template>
<script>
import { defineComponent, useRouter } from '@nuxtjs/composition-api';
import {
  SfSelect,
  SfButton,
  SfHeading,
} from '@storefront-ui/vue';
import SvgImage from '~/components/General/SvgImage.vue';
import { useUiHelpers, useUiState } from '~/composables';

export default defineComponent({
  name: 'CategoryNavbar',
  components: {
    SvgImage,
    SfSelect,
    SfButton,
    SfHeading,
  },
  props: {
    sortBy: {
      type: Object,
      default: () => {},
    },
    pagination: {
      type: Object,
      default: () => {},
    },
  },
  setup(_, { emit }) {
    const {
      toggleFilterSidebar, changeToCategoryListView, changeToCategoryGridView, isCategoryGridView,
    } = useUiState();
    const router = useRouter();
    const uiHelpers = useUiHelpers();

    const pushState = (path) => {
      if (!window) return;
      window.history.pushState({}, null, `${path}`);
      emit('category:reload-products', { path });
    };

    const doSorting = (sort) => {
      if (typeof window !== 'undefined') {
        const { pathname } = window.location;
        const { search } = window.location;
        const { query } = router.resolve((pathname + search).slice(1)).route;
        const path = router.resolve({ query: { ...query, sort }, path: (search) }).route.fullPath;
        pushState(path);
      }
    };

    return {
      doSorting,
      toggleFilterSidebar,
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
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }

  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }

  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
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
    --select-width: 220px;
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

    @include for-mobile {
      --select-width: 135px;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
    @include for-mobile {
      margin: 0;
      order: 1;
    }
  }

  &__counter {
    font-family: var(--font-family--secondary);
    order: 1;
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
