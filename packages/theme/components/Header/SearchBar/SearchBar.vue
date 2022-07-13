<template>
  <SfSearchBar
    v-click-outside="closeSearch"
    :placeholder="$t('Search for items')"
    aria-label="Search"
    class="sf-header__search"
    :value="term"
    @input="debouncedHandleSearch($event)"
    @keyup.enter="handleKeydownEnter($event.target.value) /* https://github.com/vuestorefront/storefront-ui/issues/2453#issuecomment-1160231619 */"
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
          <SvgImage
            icon="cross"
            :label="$t('Cancel')"
            width="18"
            height="18"
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
          <SvgImage
            icon="search"
            :label="$t('Search')"
            width="18"
            height="18"
          />
        </span>
      </SfButton>
    </template>
  </SfSearchBar>
</template>

<script lang="ts">
import { SfButton, SfSearchBar } from '@storefront-ui/vue';
import {
  defineComponent, ref, watch, useRoute,
} from '@nuxtjs/composition-api';
import { debounce } from 'lodash-es';
import { clickOutside } from '~/components/directives/click-outside/click-outside-directive';
import SvgImage from '~/components/General/SvgImage.vue';
import { useProduct } from '~/modules/catalog/product/composables/useProduct';
import { Products } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'SearchBar',
  components: {
    SfSearchBar,
    SfButton,
    SvgImage,
  },
  directives: { clickOutside },
  props: {
    isSearchOpen: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      default: 12,
    },
    minTermLen: {
      type: Number,
      default: 3,
    },
  },
  emits: ['set-is-open', 'set-search-results'],
  setup(props, { emit }) {
    const term = ref('');
    const route = useRoute();

    const { getProductList } = useProduct();

    const showSearch = () => {
      if (!props.isSearchOpen) {
        emit('set-is-open', true);
        if (document) {
          document.body.classList.add('no-scroll');
        }
      }
    };

    const hideSearch = () => {
      if (props.isSearchOpen) {
        emit('set-is-open', false);
        emit('set-search-results', null);
        if (document) {
          document.body.classList.remove('no-scroll');
        }
      }
    };

    const toggleSearch = () => {
      if (props.isSearchOpen) {
        hideSearch();
      } else {
        showSearch();
      }
    };

    const closeSearch = (event: MouseEvent) => {
      if (document) {
        const searchResultsEl = document.querySelector('.search');
        const closeTriggerElement = event.target as HTMLElement;

        if (!searchResultsEl?.contains(closeTriggerElement)) {
          hideSearch();
          term.value = '';
        }
      } else {
        hideSearch();
        term.value = '';
      }
    };

    const rawHandleSearch = async (searchTerm: string) => {
      term.value = searchTerm;
      if (term.value.length < props.minTermLen) return;

      // M2-579
      const productList : Products = await getProductList({
        pageSize: props.itemsPerPage,
        search: term.value,
      }) as unknown as Products;

      emit('set-search-results', productList!.items);
    };

    const debouncedHandleSearch = debounce(rawHandleSearch, 1000);

    const handleKeydownEnter = (searchTerm: string) => {
      // cancel debounce timeout started by typing into the searchbar - this is to avoid making two network requests instead of one
      debouncedHandleSearch.cancel();
      rawHandleSearch(searchTerm);
    };

    watch(route, () => {
      hideSearch();
      term.value = '';
    });

    return {
      closeSearch,
      showSearch,
      hideSearch,
      toggleSearch,
      rawHandleSearch,
      debouncedHandleSearch,
      handleKeydownEnter,
      term,
    };
  },
});

</script>

<style lang="scss" scoped>
.sf-search-bar__button {
  position: relative;
  right: 20px;
  bottom: 0;
}
</style>
