import { CreditsProduct, EntitlementDetail } from '@/types/product';
import {
  DashboardDetail,
  ResourceDetail,
  UserResourcePackSearchParams,
} from '@/types/account';
import service from '@/service/request';

/** 获取算力商品列表 */
export async function getCreditsProductList(): Promise<
  API.ListResponse<CreditsProduct>
> {
  return service.get('/v1/products/credits');
}

/** 获取仪表盘详情 */
export async function getDashboardDetail(): Promise<
  API.DetailResponse<DashboardDetail>
> {
  return service.get('/v1/dashboard');
}

/** 查询当前资源包权益信息 */
export async function getResourceEntitlements(): Promise<
  API.ListResponse<EntitlementDetail>
> {
  return service.get('/v1/resources/entitlements');
}

/** 查询用户资源包列表 */
export async function getResourceList(
  params: UserResourcePackSearchParams
): Promise<API.DefaultList<ResourceDetail>> {
  return service.get('/v1/resources', { params });
}
