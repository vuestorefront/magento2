<template>
  <SfBreadcrumbs :breadcrumbs="breadcrumbs" />
</template>

<script lang="ts">
import {
  defineComponent, computed, PropType, useContext,
} from '@nuxtjs/composition-api';
import { SfBreadcrumbs } from '@storefront-ui/vue';
import { CategoryTreeInterface } from '~/composables/types';

type Breadcrumb = { text: string, link: string };

export default defineComponent({
  components: { SfBreadcrumbs },
  props: {
    categoryAncestors: {
      type: Array as PropType<CategoryTreeInterface[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { app } = useContext();
    const breadcrumbs = computed<Breadcrumb[]>(() => props.categoryAncestors.map(({ label: text, slug }) => ({
      text,
      link: app.localePath(`/c${slug}`),
    })));

    return {
      breadcrumbs,
    };
  },
});
</script>
