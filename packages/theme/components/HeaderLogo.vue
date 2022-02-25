<template>
  <nuxt-link
    :to="localePath('/')"
    class="sf-header__logo"
  >
    <nuxt-img
      v-if="logoSrc"
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

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api';
import { useConfig, storeConfigGetters } from '@vue-storefront/magento';
import SvgImage from '~/components/General/SvgImage.vue';

export default defineComponent({
  name: 'HeaderLogo',
  components: { SvgImage },
  setup() {
    const { config } = useConfig();

    const logoSrc = computed(
      () => {
        const baseMediaUrl = storeConfigGetters.getBaseMediaUrl(config.value);
        const logo = storeConfigGetters.getLogoSrc(config.value);

        return baseMediaUrl && logo ? `${baseMediaUrl}logo/${logo}` : ''
      }
    );

    const logoWidth = computed(
      () => storeConfigGetters.getLogoWidth(config.value) || '35',
    );

    const logoHeight = computed(
      () => storeConfigGetters.getLogoHeight(config.value) || '34',
    );

    const logoAlt = computed(
      () => storeConfigGetters.getLogoAlt(config.value) || '',
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
