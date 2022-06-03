<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import { SfButton, SfPagination, SfImage } from '@storefront-ui/vue';

const ExtendedSfPagination = {
  ...SfPagination,
};

export default defineComponent({
  name: 'CategoryPagination',
  components: {
    SfButton,
    SfImage,
  },
  extends: ExtendedSfPagination,
  computed: {
    /**
     * On the category page we do not want to reload whole page when pagination changes
     */
    hasRouter() {
      return false;
    },
  },
});
</script>
