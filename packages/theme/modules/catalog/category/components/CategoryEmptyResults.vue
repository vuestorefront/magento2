<template>
  <div class="empty-result">
    <slot>
      <SvgImage
        icon="logo"
        :label="$t('Vue Storefront Next')"
        width="50"
        height="50"
      />
      <p>{{ $t("We can't find products matching the selection.") }}</p>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  components: {
    SvgImage,
  },
});
</script>
<style lang="scss" scoped>
.empty-result {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  @include for-mobile {
    min-height: 10vh
  }
}
</style>
