import { AgnosticPagination } from '~/composables/types';
import { CustomerOrder, OrderItemInterface } from '~/modules/GraphQL/types';

export const getDate = (order: CustomerOrder): string => new Date(order?.order_date).toLocaleDateString() || '';

export const getId = (order: CustomerOrder): string => String(Number.parseInt(order?.number, 10) || Math.floor(Math.random() * 100));

export const getStatus = (order: CustomerOrder): string => order?.status || 'Failed';

export const getPrice = (order: CustomerOrder): number | null => order?.total?.grand_total?.value || 0;

export const getItems = (order: CustomerOrder): OrderItemInterface[] => order?.items || [];

export const getItemSku = (item: OrderItemInterface): string => item?.product_sku || '';

export const getItemName = (item: OrderItemInterface): string => item?.product_name || '';

export const getItemQty = (item: OrderItemInterface): number => item?.quantity_ordered || 0;

export const getItemPrice = (item: OrderItemInterface): number => item?.product_sale_price?.value || 0;

export const getFormattedPrice = (price: OrderItemInterface) => String(price);

const getPagination = (orders: any): AgnosticPagination => ({
  currentPage: orders?.page_info?.current_page || 1,
  totalPages: orders?.page_info?.total_pages || 1,
  totalItems: orders?.total_count || 0,
  itemsPerPage: orders?.page_info?.page_size || 10,
  pageOptions: [10, 50, 100],
});

const orderGetters = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getPagination,
};

export default orderGetters;
