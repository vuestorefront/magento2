<template>
  <SfLoader :loading="loading">
    <div>
      <SfHeading
        :title="page.content_heading"
        :level="1"
        v-if="page.content_heading"
        class="sf-heading--no-underline sf-heading--left"
      />
      <div v-html="page.content"></div>
    </div>
  </SfLoader>
</template>
<script>
import {
  SfLoader,
  SfHeading
} from '@storefront-ui/vue';
import { usePage } from '@vue-storefront/magento-composables';
import {onSSR} from '@vue-storefront/core';
export default {
  components: {
    SfLoader,
    SfHeading
  },
  setup(props) {
    const { page, loadPage, loading } = usePage('cmsPage');
    onSSR(async () => {
      await loadPage(props.identifier);
    });
    return {
      page,
      loading
    };
  },
  props: {
    identifier: {
      type: [String]
    }
  },
  head () {
    const title = this.page.meta_title ? this.page.meta_title : this.page.title;
    const meta = [];
    if (this.page.meta_description) {
      meta.push({hid: 'description', name: 'description', content: this.page.meta_description});
    }
    return {
      title: title,
      meta: meta
    };
  }
};
</script>
