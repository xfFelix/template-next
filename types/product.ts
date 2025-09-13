import { PeriodUnit } from '@/constants/enum/PeriodUnit';
import RightConsumeMode from '@/constants/enum/RightConsumeMode';

/** 权益详情 */
export interface EntitlementDetail {
  /** 权益名称 */
  key: string;
  /** 权益说明链接 */
  descUrl: string;
  /** credits | feature */
  name: string;
  /** 数值或描述，比如"400算力/次"、"无限" */
  value: string;
  /** 算力 */
  credits: number;
  /** 计量单位 unlimited、creditsUsed */
  unit: string;
  /** 商品权益消耗模式 */
  consumeMode: RightConsumeMode;
  /** 并发数 */
  concurrency: number;
}

/** 并发数量配置 */
export type ConcurrencyConfig = Record<
  Consume.CostItem | Consume.FeatureType,
  number
>;

/** 资源包商品 */
export interface ResourceProduct {
  /** 商品Id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 有效周期数 */
  period: number;
  /** 单位 month、year */
  periodUnit: PeriodUnit;
  /** 原价格（分）用于展示 */
  originalPrice: number;
  /** 价格（分）实际支付价格 */
  price: number;
  /** 算力数 */
  credits: number;
  /** 标签 */
  label: string;
  /** 并发数量配置 */
  concurrency: ConcurrencyConfig;
  /** 权益列表 */
  rightItem: EntitlementDetail[];
}

/** 算力消耗规则 */
export interface CreditsConsumptionConfig {
  configName: string;
  configValue: {
    [K in Consume.FeatureType | 'figureClone']: {
      [K in Consume.CostItem]: {
        /** 算力 */
        credits?: number;
        /** 秒/次 */
        second?: number;
      };
    };
  };
}

/** 算力商品 */
export interface CreditsProduct {
  /** 商品Id */
  id: string;
  /** 商品名称 */
  name: string;
  /** 价格（分） */
  price: number;
  /** 算力数 */
  credits: number;
}
