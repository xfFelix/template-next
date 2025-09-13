/** 算力规则 */
export interface ComputeRule {
  /** 算力规则名称 */
  label: string;
  /** 算力规则枚举值 */
  value: Consume.CostItem;
  /** 算力 */
  credits?: number;
  /** 是否按秒计算 */
  second?: number;
}
