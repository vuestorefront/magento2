<script>
import { defineComponent, onMounted } from '@nuxtjs/composition-api';
import {
  useUser,
} from '@vue-storefront/magento';
import { useMagentoConfiguration } from '~/composables/useMagentoConfiguration';

export default defineComponent({
  name: 'MagentoConfiguration',

  setup() {
    const { load: loadUser } = useUser();
    const { loadConfiguration } = useMagentoConfiguration();

    onMounted(() => {
      loadConfiguration();
      loadUser();
    });
  },

  render() {
    return null;
  },
});
</script>
