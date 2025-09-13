declare namespace Order {
  /** 订单类型，具体查看enum：OrderType.ts */
  type Type = 'credits' | 'package';
  /** 订单状态，具体查看enum：OrderStatus.ts */
  type Status =
    | 'pending'
    | 'paid'
    | 'completed'
    | 'refunding'
    | 'completedRefunded'
    | 'refunded'
    | 'closed'
    | 'refundFailed'
    | 'invalid';
  /** 支付方式，具体查看enum：PaymentMethod.ts */
  type PaymentMethod = 'wechat' | 'alipay' | 'gift' | 'bank';

  /** 查询参数 */
  interface SearchParam {
    /** 格式: 2025-07-18 00:00:00 */
    startDate?: string;
    /** 格式: 2025-07-19 00:00:00 */
    endDate?: string;
  }

  /** 请求参数 */
  interface Param extends SearchParam {
    page: number;
    pageSize: number;
  }

  /** 订单列表数据 */
  interface Data {
    /** 订单号 */
    orderNo: string;
    /** 订单名称 */
    name: string;
    /** 订单类型 */
    type: Type;
    /** 支付金额 */
    amount: number;
    /** 获取算力 */
    credits: number;
    /** 支付状态 */
    status: Status;
    /** 支付渠道 */
    payChannel: PaymentMethod;
    /** 支付时间 */
    payAt: string;
    /** 商品数量 1.1.0 并发数商品新增 */
    quantity: number;
    /** 发票状态 1.1.0 并发数商品新增 */
    invoiceStatus: string;
  }
}
