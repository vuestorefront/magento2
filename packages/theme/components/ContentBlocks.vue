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
<script>
import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api';
import { useContent } from '~/composables';
import ContentBlock from './ContentBlock';

export default defineComponent({
  name: 'ContentBlocks',
  components: {
    ContentBlock,
  },
  props: {
    identifiers: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const {
      loadBlocks,
    } = useContent();
    const blocks = ref([]);

    useFetch(async () => {
      if (props.identifiers) {
        blocks.value = await loadBlocks(props.identifiers);
      }
    });

    return {
      blocks,
    };
  },
});
</script>
