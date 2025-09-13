import service from '@/service/request';
import { CreateOrderApiParams, OrderDetail } from '@/types/orderDetail';

/** 创建订单 */
export async function createOrder(
  params: CreateOrderApiParams
): Promise<API.DetailResponse<OrderDetail>> {
  return service.post('/v1/orders', params);
}

/** 获取订单详情 */
export async function getOrderDetail(
  orderNo: string
): Promise<API.DetailResponse<Order.Data>> {
  return service.get(`/v1/orders/${orderNo}/status`);
}
