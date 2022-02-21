<template>
  <SfSearchBar
    v-click-outside="closeSearch"
    :placeholder="$t('Search for items')"
    aria-label="Search"
    class="sf-header__search"
    :value="term"
    @input="handleSearch"
    @keydown.enter="handleSearch($event)"
    @keydown.tab="hideSearch"
    @focus="showSearch"
    @click="showSearch"
    @keydown.esc="closeSearch"
  >
    <template #icon>
      <SfButton
        v-if="!!term"
        class="sf-search-bar__button sf-button--pure"
        aria-label="Close search"
        @click="closeSearch"
      >
        <span class="sf-search-bar__icon">
          <SfIcon
            color="var(--c-text)"
            size="18px"
            icon="cross"
          />
        </span>
      </SfButton>
      <SfButton
        v-else
        class="sf-search-bar__button sf-button--pure"
        aria-label="Open search"
        @click="toggleSearch"
        @keydown.tab="hideSearch"
      >
        <span class="sf-search-bar__icon">
          <SfIcon
            color="var(--c-text)"
            size="20px"
            icon="search"
          />
        </span>
      </SfButton>
    </template>
  </SfSearchBar>
</template>

<script>
import {
  SfIcon,
  SfButton,
  SfSearchBar,
} from '@storefront-ui/vue';
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';

import debounce from 'lodash.debounce';
import {
  categoryGetters,
  useCategorySearch,
  useFacet,
} from '@vue-storefront/magento';

export default defineComponent({
  name: 'SearchBar',
  components: {
    SfSearchBar,
    SfButton,
    SfIcon,
  },
  directives: { clickOutside },
  props: {
    itemsPerPage: {
      type: Number,
      default: 12,
    },
    minTermLen: {
      type: Number,
      default: 3,
    },
  },
  setup({ itemsPerPage, minTermLen }, { emit }) {
    const term = ref('');
    const isSearchOpen = ref(false);
    const result = ref(null);

    const {
      result: searchResult,
      search: productsSearch,
    } = useFacet('AppHeader:Products');

    const {
      result: categories,
      search: categoriesSearch,
    } = useCategorySearch('AppHeader:Categories');

    const showSearch = () => {
      if (!isSearchOpen.value) {
        isSearchOpen.value = true;
        emit('SearchBar:toggle', true);
        if (document) {
          document.body.classList.add('no-scroll');
        }
      }
    };

    const hideSearch = () => {
      if (isSearchOpen.value) {
        isSearchOpen.value = false;
        emit('SearchBar:toggle', false);
        emit('SearchBar:result', {});
        if (document) {
          document.body.classList.remove('no-scroll');
        }
      }
    };

    const toggleSearch = () => {
      if (isSearchOpen.value) {
        hideSearch();
      } else {
        showSearch();
      }
    };

    const closeSearch = () => {
      hideSearch();
      term.value = '';
    };

    const handleSearch = debounce(async (paramValue) => {
      term.value = !paramValue.target ? paramValue : paramValue.target.value;
      if (term.value.length < minTermLen) return;

      await Promise.all([
        productsSearch({
          itemsPerPage,
          term: term.value,
        }),
        categoriesSearch({ filters: { name: { match: `${term.value}` } } }),
      ]);

      result.value = {
        products: searchResult.value?.data?.items,
        categories: (categories?.value ?? [])
          .map((element) => categoryGetters.getCategoryTree(element)),
      };

      emit('SearchBar:result', result.value);
    }, 1000);

    return {
      closeSearch,
      showSearch,
      hideSearch,
      toggleSearch,
      handleSearch,
      isSearchOpen,
      term,
    };
  },
});

</script>
