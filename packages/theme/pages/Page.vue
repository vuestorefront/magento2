<template>
  <div>
    <SfHeading
      v-if="page.content_heading"
      :title="page.content_heading"
      :level="1"
      class="sf-heading--no-underline sf-heading--left"
    />
    <HTMLContent
      :content="page.content"
    />
  </div>
</template>
<script>
import {
  SfHeading,
} from '@storefront-ui/vue';
import {
  computed,
  defineComponent, onMounted, useContext, useRoute,
} from '@nuxtjs/composition-api';
import { useCache, CacheTagPrefix } from '@vue-storefront/cache';
import HTMLContent from '~/components/HTMLContent';
import { useContent } from '~/composables';

export default defineComponent({
  components: {
    HTMLContent,
    SfHeading,
  },
  props: {
    identifier: {
      type: [String],
      default: '',
    },
  },
  setup() {
    const { addTags } = useCache();
    const { error: nuxtError } = useContext();
    const route = useRoute();
    const { params } = route.value;
    const {
      page,
      loadPage,
      error,
    } = useContent();

    onMounted(async () => {
      await loadPage({ identifier: `${params.slug}` });

      if (!page.value || error.value.page) {
        nuxtError({ statusCode: 404 });
      }

      addTags([{ prefix: CacheTagPrefix.View, value: page.identifier }]);
    });

    return {
      page: computed(() => page),
    };
  },
  head() {
    const title = this.page?.meta_title ? this.page?.meta_title : this.page?.title;
    const meta = [];
    if (this.page?.meta_description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: this.page?.meta_description,
      });
    }
    return {
      title,
      meta,
    };
  },
});
</script>
