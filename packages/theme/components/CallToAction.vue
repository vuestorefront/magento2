<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import { SfCallToAction } from '@storefront-ui/vue';

const ExtendedCallToAction = {
  ...SfCallToAction,
  computed: undefined,
};

export default defineComponent({
  name: 'CallToAction',
  extends: ExtendedCallToAction,
  props: {
    imageTag: {
      type: String,
      default: null,
    },
    nuxtImgConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { app } = useContext();
    const image = props.image;
    const isImageString = typeof image === 'string';
    const style = ref({ '--_call-to-action-background-color': props.background });
    const nuxtImgConvert = (imgUrl) => {
      return imgUrl ? `url('${app.$img(imgUrl, props.nuxtImgConfig)}')` : 'none';
    };

    if (props.imageTag === 'nuxt-img' || props.imageTag === 'nuxt-picture') {
      style.value['--_call-to-action-background-desktop-image'] = nuxtImgConvert(isImageString ? image : image.desktop);
      style.value['--_call-to-action-background-image'] = nuxtImgConvert(isImageString ? image : image.mobile);
    } else {
      style.value['--_call-to-action-background-desktop-image'] = `url('${isImageString ? image : image.desktop}')`;
      style.value['--_call-to-action-background-image'] = `url('${isImageString ? image : image.mobile})`;
    }

    return { style };
  },
});
</script>
