<template>
  <div id="home">
    <div>
      hello
      {{ loading ? 'Loading' : wishlist }}
    </div>
  </div>
</template>
<script>
import { useWishlist } from '@vue-storefront/magento-composables';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Home',
  setup () {
    const { wishlist, load, loading } = useWishlist('ma-wishlist');
    onSSR(async () => {
      await load();
    });

    return {
      wishlist,
      loading
    };
  }
};
</script>
