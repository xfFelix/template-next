import { RealNameTypeEnum } from '@/constants/ApiKey';

/** 个人实名认证表单类型 */
export interface PersonalRealNameFormType {
  /** 姓名 */
  realName: string;
  /** 身份证号 */
  idNumber: string;
}

/** 实名认证响应类型 */
export interface RealNameResponseType {
  id: string;
  /** 用于调器h5人脸认证地址 */
  h5faceUrl: string;
  serviceCode?: string;
  serviceMsg?: string;
}

/** 查询个人实名认证状态类型 */
export interface QueryPersonalRealNameProgressType {
  /** 实名认证状态 */
  serviceCode: string;
}

/** 企业实名认证表单类型 */
export interface CompanyRealNameFormType {
  /** 企业名称 */
  companyName: string;
  /** 社会信用代码 */
  creditCode: string;
  /** 营业执照图片URL */
  businessLicenseUrl: string;
  /** 省份 */
  province: string;
  /** 城市 */
  city: string;
  /** 详细地址 */
  addressDetail: string;
  /** 法定代表人姓名 */
  legalPersonName: string;
  /** 法人身份证号（加密存储） */
  legalPersonIdNumber: string;
  /** 法人身份证正面照 */
  legalPersonIdFrontUrl: string;
  /** 法人身份证反面照 */
  legalPersonIdBackUrl: string;
  /** 企业联系人手机号（加密存储） */
  contactMobile: string;
}

/** 实名认证状态 */
export interface RealNameStatusType {
  /** 实名认证类型 */
  type: RealNameTypeEnum;
  status: string;
}

/** 认证状态 枚举 */
export interface StatusMap {
  [key: string]: {
    [key: string]: string;
  };
}

/** 上传组件参数 */
export interface UploadParams {
  /** 类型 image， video */
  type: string;
  /** 场景  verification-认证 */
  scene: string;
  /** 后缀 jpg png */
  extName: string;
  /** 是否临时存储 默认false */
  isTemp?: boolean;
}

export interface COSCredentials {
  sessionToken: string;
  tmpSecretId: string; // 临时 SecretId
  tmpSecretKey: string; // 临时 SecretKey
}

/** 上传组件返回参数 */

export interface COSAuthResponse {
  bucket: string;
  region: string;
  key: string;
  expiredTime: number; // 过期时间戳（秒）
  expiration: string; // 过期时间（Date 对象）
  credentials: COSCredentials;
  requestId: string;
  startTime: number; // 开始时间戳（秒）
}
