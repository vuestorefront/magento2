<template>
  <SfLoader :loading="loading">
    <div v-if="routeType.type === 'CATEGORY'">
      <Category :category-id="routeType.id"/>
    </div>
    <div v-if="routeType.type === 'PRODUCT'">
      <Product/>
    </div>
    <div v-if="routeType.type === 'CMS_PAGE'">
      <CmsPage :identifier="routeType.relative_url"/>
    </div>
  </SfLoader>
</template>
<script>
import {
  SfLoader
} from '@storefront-ui/vue';
import {useRouter} from '@vue-storefront/magento-composables';
import Category from '~/pages/Category';
import Product from '~/pages/Product';
import CmsPage from './Page';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';

export default {
  components: {
    CmsPage,
    Category,
    Product,
    SfLoader
  },
  name: 'UrlResolver',
  setup(props, context) {
    const { path } = context.root.$route;
    const {loading, search, route} = useRouter('router:' + path);
    onSSR(async () => {
      await search(path);
      if (route.value.data.urlResolver === null) {
        context.root.$nuxt.error({ statusCode: 404, message: 'Page not found' });
      }
    });

    const routeType = computed(() => {
      if (loading.value || route.value.data.urlResolver === null) {
        return {};
      }
      return route.value.data.urlResolver;
    });

    return {
      loading,
      routeType,
      Category,
      Product,
      CmsPage
    };
  }

};
</script>
