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
import { getPageComponent } from '~/modules/catalog/getters/pageGetters';

import category from '~/modules/catalog/pages/category.vue';
import cms from '~/modules/catalog/pages/cms.vue';
import product from '~/modules/catalog/pages/product.vue';

export default defineComponent({
  name: 'PageResolver',
  components: {
    category,
    cms,
    product,
  },
  middleware: [
    'url-resolver',
  ],
  setup() {
    const { routeData } = usePageStore();

    // eslint-disable-next-line no-underscore-dangle
    const type = computed(() => getPageComponent(routeData?.__typename));

    return {
      type,
    };
  },
});
</script>
