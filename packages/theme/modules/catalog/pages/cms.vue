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
  defineComponent, ref, useFetch,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import type { MetaInfo } from 'vue-meta';
import { useContent } from '~/composables';
import type { CmsPage } from '~/modules/GraphQL/types';
import { usePageStore } from '~/modules/catalog/store/page';
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
    const { loadPage, loading } = useContent();

    const page = ref<CmsPage | null>(null);

    useFetch(async () => {
      page.value = await loadPage({ identifier: routeData.identifier });

      addTags([{ prefix: CacheTagPrefix.View, value: routeData.identifier }]);
    });
    return {
      page,
      loading,
    };
  },
  head() : MetaInfo {
    if (!this.page) {
      return null;
    }

    const title = this.page?.meta_title ? this.page.meta_title : this.page.title;
    const meta = [];
    if (this.page.meta_description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.page.meta_description,
      });
    }
    return {
      title,
      meta,
    };
  },
});
</script>
<style lang="scss" scoped>
.cms-page {
  padding: var(--spacer-sm);
}
</style>
