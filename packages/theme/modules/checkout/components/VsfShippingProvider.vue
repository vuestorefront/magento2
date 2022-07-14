<template>
  <div class="shipping-provider">
    <SfHeading
      :level="3"
      :title="$t('Shipping method')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfLoader :loading="isLoading">
        <div v-if="errorShippingProvider.save">
          {{
            $t(
              'There was some error while trying to select this shipping method. We are sorry, please try with a different shipping method.'
            )
          }}
        </div>
        <div v-else-if="shippingMethods.length === 0">
          {{
            $t(
              'There are no shipping methods available for this country. We are sorry, please try with a different country.'
            )
          }}
        </div>
      </SfLoader>
      <div class="form__radio-group">
        <SfRadio
          v-for="(method, index) in shippingMethods"
          :key="index"
          v-e2e="'shipping-method-label'"
          :label="method.method_title"
          :value="method.method_code"
          :selected="
            selectedShippingMethod && selectedShippingMethod.method_code
          "
          name="shippingMethod"
          :description="method.carrier_title"
          class="form__radio shipping"
          @input="selectShippingMethod(method)"
        >
          <template #label>
            <div class="sf-radio__label shipping__label">
              <div>{{ method.carrier_title }}</div>
              <div v-if="method && (method.amount || method.price_incl_tax)">
                {{ $fc(getShippingMethodPrice(method)) }}
              </div>
            </div>
          </template>
          <template #description>
            <div class="sf-radio__description shipping__description">
              <div class="shipping__info">
                {{ method.method_title }}
              </div>
            </div>
          </template>
        </SfRadio>
      </div>
      <div class="form__action">
        <SfButton
          v-e2e="'continue-to-billing'"
          class="form__action-button"
          type="button"
          :disabled="
            !isShippingMethodStepCompleted || isLoading
          "
          @click="$emit('submit')"
        >
          {{ $t('Continue to billing') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  SfHeading, SfButton, SfRadio, SfLoader,
} from '@storefront-ui/vue';

import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
import type { PropType } from '@nuxtjs/composition-api';
import cartGetters from '~/modules/checkout/getters/cartGetters';
import useCart from '~/modules/checkout/composables/useCart';
import useShippingProvider from '~/modules/checkout/composables/useShippingProvider';
import getShippingMethodPrice from '~/helpers/checkout/getShippingMethodPrice';

import type { SelectedShippingMethod, AvailableShippingMethod } from '~/modules/GraphQL/types';

export default defineComponent({
  name: 'VsfShippingProvider',
  components: {
    SfHeading,
    SfButton,
    SfRadio,
    SfLoader,
  },
  props: {
    shippingMethods: {
      type: Array as PropType<AvailableShippingMethod[]>,
      default: () => [],
    },
  },
  setup() {
    const { cart } = useCart();
    const state = ref<SelectedShippingMethod | null>(null);

    const {
      save: saveShippingProvider,
      error: errorShippingProvider,
      loading: isLoading,
    } = useShippingProvider();

    const selectedShippingMethod = computed(() => state.value);
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const isShippingMethodStepCompleted = computed(
      () => state.value?.method_code && !isLoading.value,
    );

    const selectShippingMethod = async (method: AvailableShippingMethod) => {
      const shippingData = {
        carrier_code: method.carrier_code,
        method_code: method.method_code,
      };

      state.value = await saveShippingProvider({
        shippingMethod: shippingData,
      });
    };

    return {
      errorShippingProvider,
      getShippingMethodPrice,
      isLoading,
      isShippingMethodStepCompleted,
      selectedShippingMethod,
      selectShippingMethod,
      state,
      totals,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}

.shipping-provider {
  .sf-radio {
    &__label {
      display: flex;
      justify-content: space-between;
    }

    &__description {
      --radio-description-margin: 0;
      --radio-description-font-size: var(--font-xs);
    }
  }
}

.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }

  &__action-button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 25rem;
    }
  }

  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
}
</style>
