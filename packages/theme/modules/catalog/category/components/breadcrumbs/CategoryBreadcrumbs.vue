<template>
  <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
</template>

<script lang="ts">
import {
  defineComponent, computed, PropType,
} from '@nuxtjs/composition-api';
import { SfBreadcrumbs } from '@storefront-ui/vue';
import type { CategoryTree } from '~/modules/GraphQL/types';
import { useUiHelpers } from '~/composables';

type Breadcrumb = { text: string, link: string };

export default defineComponent({
  components: { SfBreadcrumbs },
  props: {
    categoryAncestors: {
      type: Array as PropType<CategoryTree[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { getCatLink } = useUiHelpers();
    const breadcrumbs = computed<Breadcrumb[]>(() => props.categoryAncestors.map((category) => ({
      text: category.name,
      link: getCatLink(category),
    })));

    return {
      breadcrumbs,
    };
  },
});
</script>
