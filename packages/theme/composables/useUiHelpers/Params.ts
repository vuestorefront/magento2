/**
 * Parameters received by URL search/query params that aren't filters. They're
 * used for searching, sorting and pagination.
 */
export interface NonFilterParams {
  itemsPerPage?: string;
  page?: string;
  sort?: string;
  term?: string;
}

/**
 * Parameters received by URL search/query params to filter products and other
 * entities. It also includes non-filter parameters for searching, sorting and
 * pagination.
 */
export interface FilterParams extends NonFilterParams {
  [key: string]: string | (string | null)[];
}

/**
 * The normalized parameters received by URL search/query params for filtering,
 * searching, sorting and pagination.
 */
export interface Params {
  filters: FilterParams;
  itemsPerPage: number;
  page: number;
  sort: string;
  term?: string;
}
