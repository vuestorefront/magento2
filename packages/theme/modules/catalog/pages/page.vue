<template>
  <div>
    <component
      :is="type"
      v-if="type"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
} from '@nuxtjs/composition-api';
import { usePageStore } from '~/modules/catalog/store/page';

import CATEGORY from '~/modules/catalog/pages/category.vue';
import CMS_PAGE from '~/modules/catalog/pages/cms.vue';
import PRODUCT from '~/modules/catalog/pages/product.vue';

export default defineComponent({
  name: 'PageResolver',
  components: {
    CATEGORY,
    CMS_PAGE,
    PRODUCT,
  },
  middleware: [
    'url-resolver',
  ],
  setup() {
    const { routeData } = usePageStore();

    const type = computed(() => routeData?.type);

    return {
      type,
    };
  },
});
</script>
