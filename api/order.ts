import service from '@/service/request';

/**
 * ### 获取订单列表
 * @param params 查询参数
 * @returns 订单列表
 */
export function getOrderList(params: Order.Param) {
  return service.get<unknown, HttpResponse.ResultCallback<Order.Data>>(
    '/v1/orders',
    {
      params,
    }
  );
}

/**
 * ### 导出订单
 * @param params 查询参数
 * @returns Blob对象
 */
export function exportOrder(params: Order.SearchParam) {
  return service.get<unknown, Blob>('/v1/orders/export', {
    params,
    responseType: 'blob',
  });
}
