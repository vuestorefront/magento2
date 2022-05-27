<template>
  <div>
    <content-block
      v-for="(block, index) in blocks"
      :key="index"
      :title="block.title"
      :content="block.content"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import { useContent } from '~/composables';
import type { CmsBlock } from '~/modules/GraphQL/types';
import ContentBlock from './ContentBlock.vue';

export default defineComponent({
  name: 'ContentBlocks',
  components: {
    ContentBlock,
  },
  props: {
    identifiers: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const {
      loadBlocks,
    } = useContent();
    const blocks = ref<CmsBlock[]>([]);

    useFetch(async () => {
      if (props.identifiers) {
        blocks.value = await loadBlocks({ identifiers: props.identifiers });
      }
    });

    return {
      blocks,
    };
  },
});
</script>
