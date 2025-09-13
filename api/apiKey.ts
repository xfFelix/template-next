import { StatusTypeEnum } from '@/constants/Common';
import service from '@/service/request';
import { ApiKeyTableType } from '@/types/ApiKey';
import { PageQuery } from '@/types/Common';

/** 获取Api密钥列表 */
export function getApiKeyList(
  params: PageQuery
): Promise<API.DefaultList<ApiKeyTableType>> {
  return service.get('/v1/access/keys', { params });
}

/** 创建Api密钥 */
export function createApiKey(data: {
  name: string;
}): Promise<API.DetailResponse<ApiKeyTableType>> {
  return service.post('/v1/access/key', data);
}

/** 更新Api密钥 */
export function updateApiKey(
  id: string,
  data: {
    name: string;
  }
): Promise<API.DetailResponse<ApiKeyTableType>> {
  return service.put(`/v1/access/key/${id}/info`, data);
}

/** 启用/禁用api密钥 */
export function updateApiKeyStatus(
  id: string,
  status: StatusTypeEnum
): Promise<API.CommonResponse> {
  return service.put(`/v1/access/key/${id}/status`, { status });
}

/** 删除api密钥 */
export function deleteApiKey(id: string): Promise<API.CommonResponse> {
  return service.delete(`/v1/access/key/${id}`, {
    params: {
      id,
    },
  });
}
