import { StatusMap } from '@/types/RealName';
import staticResource from '@/assets/RealName';

/** 认证类型 */
export enum RealNameTypeEnum {
  /** 未认证 */
  UNVERIFIED = 'unverified',
  /**  个人认证 */
  PERSONAL = 'personal',
  /** 企业认证 */
  ENTERPRISE = 'enterprise',
  /** 认证中 */
  AUTHENTICATING = 'authenticating',
}

export const RealNameTypeMap = {
  [RealNameTypeEnum.UNVERIFIED]: '未认证',
  [RealNameTypeEnum.PERSONAL]: '个人认证',
  [RealNameTypeEnum.ENTERPRISE]: '企业认证',
  [RealNameTypeEnum.AUTHENTICATING]: '认证中',
};

/** 认证成功状态 */
export const RealNameSuccessStatus: string[] = [
  RealNameTypeEnum.PERSONAL,
  RealNameTypeEnum.ENTERPRISE,
];

/** 个人认证审核结果 */
export enum RealNameStatusEnum {
  /** 认证中 */
  UNDERWAY = 'underway',
  /** 认证成功 */
  SUCCESS = 'success',
  /** 认证失败 */
  FAILED = 'failed',
}

/** 认证失败状态 */
export const RealNameFailedStatus = [RealNameStatusEnum.FAILED, ''];

/** 中止认证状态 */
export const RealStatusList = [
  RealNameStatusEnum.FAILED,
  RealNameStatusEnum.SUCCESS,
];

/** 认证状态映射 */
export const STATUS_MAP: StatusMap = {
  [RealNameStatusEnum.UNDERWAY]: {
    [RealNameTypeEnum.PERSONAL]: staticResource.verifying,
    [RealNameTypeEnum.ENTERPRISE]: staticResource.verifying,
  },
  [RealNameStatusEnum.SUCCESS]: {
    [RealNameTypeEnum.PERSONAL]: staticResource.personal,
    [RealNameTypeEnum.ENTERPRISE]: staticResource.enterprise,
  },
};
