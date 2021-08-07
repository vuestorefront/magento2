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
import { onSSR } from '@vue-storefront/core';
import { useContent } from '@vue-storefront/magento';
import ContentBlock from './ContentBlock';

export default {
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
      blocks,
      loadBlocks,
    } = useContent();

    onSSR(async () => {
      if (props.identifiers) await loadBlocks(props.identifiers);
    });

    return {
      blocks,
    };
  },
};
</script>
