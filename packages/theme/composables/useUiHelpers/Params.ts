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

/** Parameters received by URL search/query params. */
export interface QueryParams extends NonFilterParams {
  [key: string]: string | (string | null)[];
}

/** Parameters to filter products and other entities. */
export interface FilterParams {
  [key: string]: (null | string)[];
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
