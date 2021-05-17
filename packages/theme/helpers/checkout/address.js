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
