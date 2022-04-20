<template>
  <HTMLContent :content="content" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import HTMLContent from '~/components/HTMLContent.vue';

export default defineComponent({
  components: { HTMLContent },
  props: {
    content: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang='scss' scoped>
@import './CmsContent.scss';
</style>
