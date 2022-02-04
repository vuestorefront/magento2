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
import { defineComponent } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent';

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
  // TODO: check if it's possible to use Redis with asyncData
  async asyncData({ app, params, error: nuxtError }) {
    const { data } = await app.$vsf.$magento.api.cmsPage(params.slug);

    if (!data.cmsPage) {
      nuxtError({ statusCode: 404 });
    }

    return {
      page: data.cmsPage,
    };
  },
  head() {
    const title = this.page?.meta_title ? this.page?.meta_title : this.page?.title;
    const meta = [];
    if (this.page?.meta_description) {
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
