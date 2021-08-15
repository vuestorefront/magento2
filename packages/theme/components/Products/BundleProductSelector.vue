<template>
  <SfList class="bundle_products">
    <SfListItem
      v-for="(bundle, index) in bundles"
      :key="index"
      class="bundle_product--item"
    >
      <p
        :class="{'bundle_product--item-required': bundle.required }"
      >
        {{ bundle.title }}
      </p>
      <SfList
        class="bundle_product--options"
      >
        <SfListItem
          v-for="(option, i) in bundle.options"
          :key="i"
          class="bundle_product--option"
        >
          <template
            v-if="bundle.options.length === 1"
          >
            {{ productGetters.getName(option.product) }}
            <SfPrice
              :regular="$n(productGetters.getPrice(option.product).regular, 'currency')"
              :special="productGetters.getPrice(option.product).special && $n(productGetters.getPrice(option.product).special, 'currency')"
            />
          </template>
          <template
            v-else
          >
            <SfRadio
              v-model="selectedOptions[bundle.uid].uid"
              :name="bundle.uid"
              :value="option.uid"
              :label="productGetters.getName(option.product)"
              @change="selectedOptions[bundle.uid].price = productGetters.getPrice(option.product).regular"
            >
              <template #description>
                <SfPrice
                  :regular="$n(productGetters.getPrice(option.product).regular, 'currency')"
                  :special="productGetters.getPrice(option.product).special && $n(productGetters.getPrice(option.product).special, 'currency')"
                />
              </template>
            </SfRadio>
          </template>
        </SfListItem>
      </SfList>
      <p>
        Quantity
      </p>
      <SfQuantitySelector
        v-model="selectedOptions[bundle.uid].quantity"
        :disabled="canChangeQuantity(bundle)"
      />
    </SfListItem>
  </SfList>
</template>
<script>
import {
  SfList,
  SfPrice,
  SfQuantitySelector,
  SfRadio,
} from '@storefront-ui/vue';
import { productGetters } from '@vue-storefront/magento';
import { ref, watch, computed } from '@vue/composition-api';
import { bundleProductInitialSelector } from '~/helpers/product/bundleProduct';

export default {
  name: 'BundleProductSelector',
  components: {
    SfList,
    SfPrice,
    SfQuantitySelector,
    SfRadio,
  },
  props: {
    bundles: {
      type: Array,
      required: true,
    },
  },
  emits: ['update-bundle', 'update-price'],
  setup(props, { emit }) {
    const selectedOptions = ref(bundleProductInitialSelector(props.bundles));

    const canChangeQuantity = (bundle) => {
      const selectedOption = bundle.options.find((o) => o.uid === selectedOptions.value[bundle.uid].uid);

      return !selectedOption.can_change_quantity;
    };

    const price = computed(() => Object.keys(selectedOptions.value)
      .reduce((s, k) => s + (Number.parseFloat(selectedOptions.value[k].price) * selectedOptions.value[k].quantity), 0));

    watch(computed(() => props.bundles), (newBundles) => {
      selectedOptions.value = bundleProductInitialSelector(newBundles);
    });

    watch(computed(() => selectedOptions.value), () => {
      emit('update-bundle', selectedOptions.value);
      emit('update-price', price.value);
    }, { deep: true });

    return {
      productGetters,
      selectedOptions,
      canChangeQuantity,
      price,
    };
  },
};
</script>
