/** 支付方式 */
export enum PayType {
  WE_CHATE = 'wechat',
  ALIPAY = 'alipay',
}

/** 支付类型文案 */
export const PayTypeLabel = {
  [PayType.WE_CHATE]: '微信支付',
  [PayType.ALIPAY]: '支付宝支付',
};

/** 支付类型菜单 */
export const PayTypeOptions = [
  { label: PayTypeLabel[PayType.WE_CHATE], value: PayType.WE_CHATE },
  { label: PayTypeLabel[PayType.ALIPAY], value: PayType.ALIPAY },
];
