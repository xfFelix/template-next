/** 商品周期单位 */
export enum PeriodUnit {
  /** 天 */
  DAY = 'day',
  /** 月 */
  MONTH = 'month',
  /** 年 */
  YEAR = 'year',
}

/** 不同商品周期单位后缀 */
export const PeriodUnitSuffix = {
  [PeriodUnit.DAY]: '天',
  [PeriodUnit.MONTH]: '个月',
  [PeriodUnit.YEAR]: '年',
};
