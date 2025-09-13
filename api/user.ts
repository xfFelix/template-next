import service from '@/service/request';
import { UserInfoResponse } from '@/types/UserInfo';

/** 获取当前账户信息 */
export function getUserInfo(): Promise<
  HttpResponse.Callback<UserInfoResponse>
> {
  return service.get('/v1/account/me');
}
