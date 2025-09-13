enum OrderStatus {
  /** 待支付 */
  PENDING = 'pending',
  /** 已支付 */
  PAID = 'paid',
  /** 已完成 */
  COMPLETED = 'completed',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 已到账部分使用后发生退款 */
  COMPLETED_REFUNDED = 'completedRefunded',
  /** 到账未使用后发生退款（或全额退） */
  REFUNDED = 'refunded',
  /** 手动关闭或失效（未支付超时等） */
  CLOSED = 'closed',
  /** 退款失败 */
  REFUND_FAILED = 'refundFailed',
  /** 无效订单 */
  INVALID = 'invalid',
}

export default OrderStatus;
