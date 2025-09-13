import OrderStatus from '@/constants/OrderStatus';
import PaymentMethod from '@/constants/PaymentMethod';

/** 支付方式列表 */
export const PaymentList = [
  { label: '支付宝支付', value: PaymentMethod.ALIPAY },
  { label: '微信支付', value: PaymentMethod.WECHAT },
  { label: '内部赠送', value: PaymentMethod.INTERNAL_GIFT },
  { label: '对公转账', value: PaymentMethod.BANK_TRANSFER },
];

/** 订单状态列表 */
export const StatusList = [
  { value: OrderStatus.PENDING, label: '待支付', color: 'green' },
  { value: OrderStatus.PAID, label: '已支付', color: 'green' },
  { value: OrderStatus.COMPLETED, label: '已完成', color: 'green' },
  { value: OrderStatus.REFUNDING, label: '退款中', color: 'gray' },
  {
    value: OrderStatus.COMPLETED_REFUNDED,
    label: '已退款',
    color: 'gray',
  },
  { value: OrderStatus.REFUNDED, label: '已退款', color: 'gray' },
  { value: OrderStatus.CLOSED, label: '已失败', color: 'gray' },
  {
    value: OrderStatus.REFUND_FAILED,
    label: '退款失败',
    color: 'gray',
  },
  { value: OrderStatus.INVALID, label: '已失效', color: 'gray' },
];
