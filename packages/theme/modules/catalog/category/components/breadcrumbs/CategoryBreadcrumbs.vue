<template>
  <SfBreadcrumbs
    :breadcrumbs="breadcrumbs"
    class="breadcrumbs"
  />
</template>

<script lang="ts">
import {
  defineComponent, useFetch, ref,
} from '@nuxtjs/composition-api';
import { SfBreadcrumbs } from '@storefront-ui/vue';
import { useUiHelpers } from '~/composables';
import { useTraverseCategory } from '~/modules/catalog/category/helpers/useTraverseCategory';

type Breadcrumb = { text: string, link: string };

export default defineComponent({
  components: { SfBreadcrumbs },
  setup() {
    const { getCatLink } = useUiHelpers();

    const {
      categoryAncestors, isCategoryTreeLoaded, loadCategoryTree,
    } = useTraverseCategory();
    const breadcrumbs = ref<Breadcrumb[]>([]);

    useFetch(async () => {
      if (!isCategoryTreeLoaded.value) {
        await loadCategoryTree();
      }

      breadcrumbs.value = categoryAncestors.value.slice(0, -1).map((category) => ({
        text: category.name,
        link: getCatLink(category),
      }));
    });

    return {
      breadcrumbs,
    };
  },
});
</script>
<style lang="scss" scoped>
.breadcrumbs {
  margin-left: var(--spacer-sm);

  @include for-mobile {
    margin-top: var(--spacer-lg)
  }
}
</style>
