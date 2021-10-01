<template>
  <div id="home">
    <SfHero class="hero">
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <LazyHydrate when-visible>
      <SfBannerGrid
        :banner-grid="1"
        class="banner-grid"
      >
        <template
          v-for="item in banners"
          #[item.slot]
        >
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <ProductsCarousel
        :products="newProducts"
        :loading="newProductsLoading"
        title="New Products"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        image="https://cdn.shopify.com/s/files/1/0407/1902/4288/files/newsletter_1240x202.jpg?v=1616496568"
        class="call-to-action"
      />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner />
    </LazyHydrate>
  </div>
</template>
<script type="module">
import {
  SfHero,
  SfBanner,
  SfCallToAction,
  SfBannerGrid,
} from '@storefront-ui/vue';
import {
  useProduct,
  useCart,
  productGetters,
} from '@vue-storefront/magento';
import {
  computed,
  defineComponent,
} from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import ProductsCarousel from '~/components/ProductsCarousel.vue';

export default defineComponent({
  name: 'Home',
  components: {
    InstagramFeed,
    LazyHydrate,
    MobileStoreBanner,
    ProductsCarousel,
    SfBanner,
    SfBannerGrid,
    SfCallToAction,
    SfHero,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const {
      products: newProductsResult,
      search: newProductsSearch,
      loading: newProductsLoading,
    } = useProduct('newProducts');

    const {
      cart,
      load: loadCart,
      addItem: addToCart,
      isInCart,
    } = useCart();

    // @ts-ignore
    const newProducts = computed(() => productGetters.getFiltered(newProductsResult.value?.items, { master: true }));

    onSSR(async () => {
      await newProductsSearch({
        pageSize: 10,
        currentPage: 1,
        sort: {
          position: 'ASC',
        },
      });

      await loadCart();
    });

    return {
      newProducts,
      getChkId: computed(() => cart.value.id),
      newProductsLoading,
      productGetters,
      addToCart,
      isInCart,
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2021',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x224.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_1240x400.jpg',
          },
          link: '/c/women/women-clothing-shirts',
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2021',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_328x224.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerH_1240x400.jpg',
          },
          link: '/c/women/women-clothing-dresses',
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2021',
          buttonText: 'Learn more',
          background: '#efebe9',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerA_328x224.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerA_1240x400.jpg',
          },
          link: '/c/women/women-shoes-sandals',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right',
        },
      ],
      banners: [
        {
          slot: 'banner-A',
          subtitle: 'Dresses',
          title: 'Cocktail & Party',
          description:
            'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
          buttonText: 'Shop now',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerB_328x343.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerF_332x840.jpg',
          },
          class: 'sf-banner--slim desktop-only',
          link: '/c/women/women-clothing-skirts',
        },
        {
          slot: 'banner-B',
          subtitle: 'Dresses',
          title: 'Linen Dresses',
          description:
            'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
          buttonText: 'Shop now',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_328x343.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerE_496x840.jpg',
          },
          class: 'sf-banner--slim banner-central desktop-only',
          link: '/c/women/women-clothing-dresses',
        },
        {
          slot: 'banner-C',
          subtitle: 'T-Shirts',
          title: 'The Office Life',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_328x343.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerC_332x400.jpg',
          },
          class: 'sf-banner--slim banner__tshirt',
          link: '/c/women/women-clothing-shirts',
        },
        {
          slot: 'banner-D',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          image: {
            mobile:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_328x343.jpg',
            desktop:
              'https://cdn.shopify.com/s/files/1/0407/1902/4288/files/bannerG_332x400.jpg',
          },
          class: 'sf-banner--slim',
          link: '/c/women/women-shoes-sandals',
        },
      ],
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    toggleWishlist(index) {
      this.products[index].isInWishlist = !this.products[index].isInWishlist;
    },
  },
});
</script>

<style lang="scss" scoped>
.article-meta h4 a {
  color: #111111;
  font-weight: 600;
  font-size: 20px;
}

.article-meta {
  margin-top: 10px;
}

.article-item__meta-item:not(:last-child)::after {
  display: inline-block;
  content: "";
  width: 5px;
  height: 5px;
  margin: -1px 10px 0 10px;
  border-radius: 100%;
  background: rgba(0, 0, 0, 0.4);
  vertical-align: middle;
}

#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }

  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
        --hero-item-wrapper-text-align: right;
        --hero-item-subtitle-width: 100%;
        --hero-item-title-width: 100%;
        --hero-item-wrapper-padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-2xl);
      }
    }
  }
}

::v-deep .sf-hero__controls {
  --hero-controls-display: none;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;

  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }

  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }

  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
  margin: 0 calc(-1 * var(--spacer-sm)) 0 0;
  @include for-desktop {
    margin: 0;
  }

  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }

    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}
</style>
