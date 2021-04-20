<template>
  <SfLoader :loading="loading">
    <div>
      <SfHeading
        v-if="page.content_heading"
        :title="page.content_heading"
        :level="1"
        class="sf-heading--no-underline sf-heading--left"
      />
      <div v-html="page.content" />
    </div>
  </SfLoader>
</template>
<script>
import {
  SfLoader,
  SfHeading,
} from '@storefront-ui/vue';
import { usePage } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  components: {
    SfLoader,
    SfHeading,
  },
  props: {
    identifier: {
      type: [String],
    },
  },
  setup(props) {
    const { page, loadPage, loading } = usePage('cmsPage');
    onSSR(async () => {
      await loadPage(props.identifier);
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
      meta.push({ hid: 'description', name: 'description', content: this.page.meta_description });
    }
    return {
      title,
      meta,
    };
  },
};
</script>
