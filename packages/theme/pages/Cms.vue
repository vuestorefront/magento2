<template>
  <SfLoader :loading="loading">
    <div class="cms-page">
      <SfHeading
        v-if="page && page.content_heading"
        :title="page.content_heading"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
      <HTMLContent
        v-if="page && page.content"
        :content="page.content"
      />
    </div>
  </SfLoader>
</template>
<script lang="ts">
import { SfLoader, SfHeading } from '@storefront-ui/vue';
import {
  defineComponent,
  ref,
  useFetch,
  useContext,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { getMetaInfo } from '~/helpers/getMetaInfo';
import { useContent } from '~/composables';
import type { CmsPage } from '~/modules/GraphQL/types';
import { usePageStore } from '~/stores/page';
import HTMLContent from '~/components/HTMLContent.vue';

export default defineComponent({
  name: 'CmsPage',
  components: {
    HTMLContent,
    SfLoader,
    SfHeading,
  },
  setup() {
    const { routeData } = usePageStore();
    const { addTags } = useCache();
    const { error: nuxtError } = useContext();
    const {
      loadPage,
      loading,
      error,
    } = useContent();

    const page = ref<CmsPage | null>(null);

    useFetch(async () => {
      page.value = await loadPage({ identifier: routeData.identifier });

      if (error?.value?.page || !page.value) nuxtError({ statusCode: 404 });

      addTags([{ prefix: CacheTagPrefix.View, value: routeData.identifier }]);
    });
    return {
      page,
      loading,
    };
  },
  head() {
    return getMetaInfo(this.page);
  },
});
</script>
<style lang="scss" scoped>
.cms-page {
  padding: var(--spacer-sm);
}
</style>
