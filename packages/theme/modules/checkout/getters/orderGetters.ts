import type { Pagination } from '~/composables/types';
import type { CustomerOrders, CustomerOrder, OrderItemInterface } from '~/modules/GraphQL/types';

export const getDate = (order: CustomerOrder): string => new Date(order?.order_date?.replace(/ /g, 'T')).toLocaleDateString();

export const getPrice = (order: CustomerOrder): number => order?.total?.base_grand_total?.value ?? 0;

export const getItemPrice = (item: OrderItemInterface): number => item?.product_sale_price?.value ?? 0;

const getPagination = (orders: CustomerOrders): Pagination => ({
  currentPage: orders?.page_info?.current_page || 1,
  totalPages: orders?.page_info?.total_pages || 1,
  totalItems: orders?.total_count || 0,
  itemsPerPage: orders?.page_info?.page_size || 10,
  pageOptions: [10, 50, 100],
});

const orderGetters = {
  getDate,
  getPrice,
  getItemPrice,
  getPagination,
};

export default orderGetters;
