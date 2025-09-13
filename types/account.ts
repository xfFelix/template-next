import { ResourcePackageType } from '@/constants/enum/ResourcePackageType';

/** 用户资源包接口请求参数 */
export interface UserResourcePackSearchParams {
  /** 页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/**  账户信息 仪表盘详情 */
export interface DashboardDetail {
  /** 算力总览 */
  overview: {
    /** 剩余算力 */
    remainingCredits: number;
    /** 当月生成任务数 */
    monthTaskCount: number;
    /** 当日生成任务数 */
    todayTaskCount: number;
    /** 累计消耗算力 */
    totalCreditsUsed: number;
  };
  /** 当前资源包 */
  resources: {
    /** 资源包唯一ID */
    id: string;
    /** 当前资源包名称 */
    name: string;
    /** 当前公共并发数 */
    concurrency: number;
    /** 当前资源包有效期（ISO8601） */
    expiredAt: string;
    /** 当前资源包类型 */
    packageType: ResourcePackageType;
  };
}

/** 资源包详情 */
export interface ResourceDetail {
  /** 资源包唯一ID */
  id: string;
  /** 资源包名称 */
  name: string;
  /** 总算力 */
  totalCredits: number;
  /** 已消耗算力 */
  creditsUsed: number;
  /** 状态: active / inactive / expired */
  status: string;
  /** 公共并发数 */
  concurrency: number;
  /** 资源包有效期（ISO8601）激活状态才会有有效期。 */
  expiredAt: string;
  /** 订单号 */
  orderNo: string;
}
