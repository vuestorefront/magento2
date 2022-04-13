/** The object used by {@link useBilling} to save new billing information. */
interface BillingDetails {
  apartment?: string;
  city?: string;
  country_code?: string;
  customerAddressId: string;
  extra?: string;
  firstname?: string;
  lastname?: string;
  neighborhood?: string;
  postcode?: string;
  region?: string;
  sameAsShipping: boolean;
  street?: string;
  telephone?: string;
}

export default BillingDetails;
