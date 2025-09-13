import { StatusTypeEnum } from '@/constants/Common';

/** api列表类型 */
export interface ApiKeyTableType {
  id: string;
  /** 名称 */
  name: string;
  /** 密钥 */
  tokenSecret: string;
  /** 状态 */
  status: StatusTypeEnum;
  /** 创建时间 */
  createAt: string;
}

/** 添加apiKey 表单类型 */
export interface AddApiKeyFormType {
  /** 名称 */
  name: string;
}
