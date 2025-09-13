import service from '@/service/request';

/**
 * ### 获取消耗列表
 * @param params 查询参数
 * @returns 消耗列表
 */
export function getConsumeList(params: Consume.Param) {
  return service.get<unknown, HttpResponse.Pagination<Consume.Data>>(
    '/v1/consumption',
    {
      params,
    }
  );
}

/**
 * ### 导出消耗列表
 * @param params 查询参数
 * @returns Blob对象
 */
export function exportConsume(params: Consume.SearchParam) {
  return service.get<unknown, Blob>('/v1/consumption/export', {
    params,
    responseType: 'blob',
  });
}
