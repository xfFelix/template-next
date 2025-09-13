enum PaymentMethod {
  /** 微信支付 */
  WECHAT = 'wechat',
  /** 支付宝支付 */
  ALIPAY = 'alipay',
  /** 内部赠送 */
  INTERNAL_GIFT = 'gift',
  /** 对公转账 */
  BANK_TRANSFER = 'bank',
}

export default PaymentMethod;
