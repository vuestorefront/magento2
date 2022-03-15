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
<script>
import {
  SfLoader,
  SfHeading,
} from '@storefront-ui/vue';
import {
  defineComponent, ref, useContext, useFetch, useRoute,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import { useContent } from '~/composables';
import HTMLContent from '~/components/HTMLContent';

export default defineComponent({
  name: 'CmsPage',
  components: {
    HTMLContent,
    SfLoader,
    SfHeading,
  },
  props: {
    identifier: {
      type: [String],
      default: '',
    },
  },
  setup(props) {
    const { addTags } = useCache();
    const {
      loadPage,
      error,
      loading,
    } = useContent('cmsPage');

    const route = useRoute();
    const { error: nuxtError, app } = useContext();
    const { params } = route.value;
    const page = ref({});

    useFetch(async () => {
      page.value = await loadPage({ identifier: params.slug || props.identifier });

      if (error?.value?.page || !page.value) {
        return nuxtError({ statusCode: 404, message: app.i18n.t('Page not found') });
      }

      addTags([{ prefix: CacheTagPrefix.View, value: page.value.identifier }]);
    });
    return {
      page,
      loading,
    };
  },
  head() {
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
