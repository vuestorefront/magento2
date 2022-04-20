<template>
  <nuxt-link
    :to="localePath('/')"
    class="sf-header__logo"
  >
    <SfImage
      v-if="logoSrc"
      image-tag="nuxt-img"
      :src="logoSrc"
      :alt="logoAlt"
      :title="logoAlt"
      :width="logoWidth"
      :height="logoHeight"
    />
    <SvgImage
      v-else
      icon="logo"
      :label="$t('Vue Storefront Next')"
      width="35"
      height="34"
    />
  </nuxt-link>
</template>

<script lang="ts">
import { SfImage } from '@storefront-ui/vue';
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useConfig } from '~/composables';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  name: 'HeaderLogo',
  components: { SvgImage, SfImage },
  setup() {
    const { config } = useConfig();

    const logoSrc = computed(() => {
      const baseMediaUrl = config.value.base_media_url;
      const logo = config.value.header_logo_src;

      return baseMediaUrl && logo ? `${baseMediaUrl}logo/${logo}` : '';
    });

    const logoWidth = computed(
      () => config.value.logo_width || '35',
    );

    const logoHeight = computed(
      () => config.value.logo_height || '34',
    );

    const logoAlt = computed(
      () => config.value.logo_alt || '',
    );

    return {
      logoAlt,
      logoHeight,
      logoSrc,
      logoWidth,
    };
  },
});
</script>
<style lang="scss" scoped>
.sf-header__logo {
  @include for-desktop {
    align-items: center;
    display: inline-flex;
    min-height: 80px;
  }
}
</style>
