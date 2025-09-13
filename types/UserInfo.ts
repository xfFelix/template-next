import { StatusTypeEnum } from '@/constants/Common';

/** 用户信息 */
export interface UserInfoResponse {
  /** 账号ID */
  id: string;
  /** 唯一编号，按照规则纯数字生成 */
  accountNo: number;
  /**  用户昵称 */
  name: string;
  /** 用户头像 */
  avatar: string;
  /** 认证类型； */
  verificationType: string;
  /** 会话信息 */
  token: string;
  /** 账号状态 */
  status: StatusTypeEnum;
  type: string;
}
