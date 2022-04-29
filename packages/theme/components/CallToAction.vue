<template>
  <section class="sf-call-to-action">
    <SfImage
      :image-tag="imageTag"
      :src="imageSrc"
      :alt="title"
      :width="imageWidth"
      :height="imageHeight"
      :nuxt-img-config="nuxtImgConfig"
      class="sf-call-to-action__image"
    />
    <div class="sf-call-to-action__text-container">
      <slot
        name="title"
        v-bind="{ title }"
      >
        <h2
          v-if="title"
          class="sf-call-to-action__title"
        >
          {{ title }}
        </h2>
      </slot>
      <slot
        name="description"
        v-bind="{ description }"
      >
        <p
          v-if="description"
          class="sf-call-to-action__description"
        >
          {{ description }}
        </p>
      </slot>
    </div>
    <slot
      name="button"
      v-bind="{ buttonText, link }"
    >
      <SfButton
        v-if="buttonText"
        :link="link"
        class="sf-call-to-action__button"
        @click="$emit('click')"
      >
        {{ buttonText }}
      </SfButton>
    </slot>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import { SfButton, SfCallToAction, SfImage } from '@storefront-ui/vue';
import { ImageModifiers } from '@nuxt/image';

const ExtendedCallToAction = {
  ...SfCallToAction,
  computed: undefined,
};

export default defineComponent({
  name: 'CallToAction',
  components: {
    SfButton,
    SfImage,
  },
  extends: ExtendedCallToAction,
  props: {
    imageHeight: {
      type: [Number, String],
      default: '',
    },
    imageSrc: {
      type: String,
      default: '',
    },
    imageTag: {
      type: String,
      default: '',
    },
    imageWidth: {
      type: [Number, String],
      default: '',
    },
    nuxtImgConfig: {
      type: Object as PropType<ImageModifiers | {}>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.sf-call-to-action {
  position: relative;

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    ::v-deep img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text-container {
    position: relative;
  }
}
</style>
