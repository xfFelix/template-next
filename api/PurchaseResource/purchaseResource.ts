import { CreditsConsumptionConfig, ResourceProduct } from '@/types/product';
import service from '@/service/request';

/** 查询当前资源包权益信息 */
export async function getProductPackageList(): Promise<
  API.ListResponse<ResourceProduct>
> {
  return service.get('/v1/products/package');
}

/** 查询算力消耗规则 */
export function getCreditsConsumptionConfig(): Promise<
  API.DetailResponse<CreditsConsumptionConfig>
> {
  return service.get('/v1/config/consumption');
}
