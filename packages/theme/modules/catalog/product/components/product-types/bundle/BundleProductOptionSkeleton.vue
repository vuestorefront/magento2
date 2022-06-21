<template>
  <div>
    <SkeletonLoader
      width="100%"
      height="23px"
    />
    <SkeletonLoader
      width="100%"
      height="240px"
    />
    <div>
      <SkeletonLoader
        width="80px"
        height="23px"
      />
    </div>
    <SkeletonLoader
      width="108px"
      height="52px"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
} from '@nuxtjs/composition-api';
import SkeletonLoader from '~/components/SkeletonLoader/index.vue';

export default defineComponent({
  name: 'BundleProductOptionSkeleton',
  components: {
    SkeletonLoader,
  },
});
</script>
