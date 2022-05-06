import { CustomerAddress } from '~/modules/GraphQL/types';

export interface TransformedCustomerAddress extends CustomerAddress {
  apartment: string,
  neighborhood: string,
  extra: string,
  phone: string,
  email: string,
}
