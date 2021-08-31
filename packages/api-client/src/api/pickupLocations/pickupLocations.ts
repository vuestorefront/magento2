import gql from 'graphql-tag';

export default gql`
query pickupLocations(
  $area: AreaInput,
  $filters: PickupLocationFilterInput,
  $sort: PickupLocationSortInput,
  $pageSize: Int = 20,
  $currentPage: Int = 1,
  $productsInfo: [ProductInfoInput]
  ) {
  pickupLocations(
    area: $area,
    filters: $filters,
    sort: $sort,
    pageSize: $pageSize,
    currentPage: $currentPage,
    productsInfo: $productsInfo
  ) {
    items {
      pickup_location_code
      name
      email
      fax
      description
      latitude
      longitude
      country_id
      region_id
      region
      city
      street
      postcode
      phone
      min_pickup_date_threshold
      max_pickup_date_threshold
    }
  }
}`;
