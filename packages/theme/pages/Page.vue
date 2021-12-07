<template>
  <SfLoader :loading="loading">
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
  </SfLoader>
</template>
<script>
import {
  SfLoader,
  SfHeading,
} from '@storefront-ui/vue';
import { useContent } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';
import { defineComponent, useContext, useRoute } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent';

export default defineComponent({
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
    const {
      page,
      error,
      loadContent,
      loading,
    } = useContent('cmsPage');
    const route = useRoute();
    const { error: nuxtError } = useContext();
    const { params } = route.value;

    onSSR(async () => {
      await loadContent(params.slug || props.identifier);
      if (error?.value?.content) nuxtError({ statusCode: 404 });
    });
    return {
      page,
      loading,
    };
  },
  head() {
    const title = this.page.meta_title ? this.page.meta_title : this.page.title;
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
