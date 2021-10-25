export const formatAddressReturnToData = (address) => ({
  city: address.city,
  firstname: address.firstname,
  lastname: address.lastname,
  postcode: address.postcode,
  region: address.region.code,
  street: address.street[0],
  apartment: address.street[1],
  telephone: address.telephone,
  country_code: address.country.code,
});

export const addressFromApiToForm = (address) => {
  // eslint-disable-next-line no-underscore-dangle
  if (address?.__typename) {
    return {
      firstname: address.firstname,
      lastname: address.lastname,
      street: Array.isArray(address.street) ? address.street[0] : '',
      apartment: Array.isArray(address.street) ? (address.street[1] || '') : '',
      city: address.city,
      region: address?.region?.code || address?.region?.region,
      country_code: address?.country?.code || address.country_code,
      postcode: address.postcode,
      telephone: address.telephone,
    };
  }

  return address;
};
