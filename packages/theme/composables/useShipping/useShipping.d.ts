import { Ref } from '@nuxtjs/composition-api';
import {
  AvailableShippingMethod,
  CartAddressCountry, CartAddressRegion,
  CartItemInterface,
  CartItemQuantity,
  Maybe,
  Scalars,
  SelectedShippingMethod,
} from '~/modules/GraphQL/types';

export declare type ComputedProperty<T> = Readonly<Ref<Readonly<T>>>;
export declare type CustomQuery = Record<string, string>;

export interface UseShippingErrors {
  load: Error;
  save: Error;
}

export interface CartAddressInterface {
  city: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  country: CartAddressCountry;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<CartAddressRegion>;
  street: Array<Maybe<Scalars['String']>>;
  telephone: Scalars['String'];
}

export interface ShippingCartAddress extends CartAddressInterface {
  available_shipping_methods?: Maybe<Array<Maybe<AvailableShippingMethod>>>;
  /** @deprecated `cart_items_v2` should be used instead */
  cart_items?: Maybe<Array<Maybe<CartItemQuantity>>>;
  cart_items_v2?: Maybe<Array<Maybe<CartItemInterface>>>;
  city: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  country: CartAddressCountry;
  customer_notes?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  /** @deprecated This information shoud not be exposed on frontend */
  items_weight?: Maybe<Scalars['Float']>;
  lastname: Scalars['String'];
  pickup_location_code?: Maybe<Scalars['String']>;
  postcode?: Maybe<Scalars['String']>;
  region?: Maybe<CartAddressRegion>;
  selected_shipping_method?: Maybe<SelectedShippingMethod>;
  street: Array<Maybe<Scalars['String']>>;
  telephone: Scalars['String'];
}

export interface UseShippingInterface<SHIPPING_ADDRESS> {
  error: ComputedProperty<UseShippingErrors>;
  loading: ComputedProperty<boolean>;
  load(params: {
    customQuery?: CustomQuery;
  }): Promise<SHIPPING_ADDRESS | {}>;
  save: (params: {
    params: any;
    shippingDetails: any;
    customQuery?: CustomQuery;
  }) => Promise<SHIPPING_ADDRESS | {} >;
}
