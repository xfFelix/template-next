import service from '@/service/request';
import {
  CompanyRealNameFormType,
  COSAuthResponse,
  PersonalRealNameFormType,
  QueryPersonalRealNameProgressType,
  RealNameResponseType,
  RealNameStatusType,
  UploadParams,
} from '@/types/RealName';

/** 个人实名认证 */
export function realNamePersonal(
  data: PersonalRealNameFormType
): Promise<API.DetailResponse<RealNameResponseType>> {
  return service.post('/v1/verification/personal', data);
}

/** 查询个人实名认证进度 */
export function queryPersonalRealNameProgress(
  id: string
): Promise<API.DetailResponse<QueryPersonalRealNameProgressType>> {
  return service.get('/v1/verification/personal', {
    params: {
      id,
    },
  });
}

/** 企业实名认证 */
export function realNameCompany(
  data: CompanyRealNameFormType
): Promise<API.DetailResponse<RealNameResponseType>> {
  return service.post('/v1/verification/enterprise', data);
}

/** 查询实名认证状态 */
export function queryRealNameStatus(): Promise<
  API.DetailResponse<RealNameStatusType>
> {
  return service.get('/v1/verification/status');
}

/** 上传接口 */
export function axiosGetLoraByteToken(
  data: UploadParams
): Promise<API.DetailResponse<COSAuthResponse>> {
  return service.post('/v1/file/cos/sts', data);
}
