<template>
  <div id="home">
    <div>
      hello
      {{ loading ? 'Loading' : wishlist }}
    </div>
  </div>
</template>
<script>
import { useWishlist } from '@vue-storefront/magento';
import { onSSR } from '@vue-storefront/core';

export default {
  name: 'Home',
  setup () {
    const { wishlist, load, loading } = useWishlist('ma-wishlist');
    onSSR(async () => {
      await load();
    });

    console.log(wishlist);

    return {
      wishlist,
      loading
    };
  }
};
</script>
