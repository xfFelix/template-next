import { PayType } from '@/constants/enum/PayType';
import { QrcodeMode } from '@/constants/enum/QrcodeMode';

export interface OrderDetail {
  /** 订单号 */
  orderNo: string;
  /** 支付金额 */
  amount: number;
  charge: {
    no: string;
    nativeData: {
      // 微信支付
      nonce_str: string;
      code_url: string;
      appid: string;
      sign: string;
      trade_type: string;
      return_msg: string;
      result_code: string;
      mch_id: string;
      return_code: string;
      prepay_id: string;

      // 支付宝
      data: string;
    };
  };
}

/** 创建订单参数 */
export interface CreateOrderApiParams {
  /** 商品ID */
  goodsId: string;
  /** 支付方式 */
  payMethod: PayType;
  /** 二维码渲染方式 */
  qrcodeMode: QrcodeMode;
  /** 二维码宽度 */
  qrcodeWidth: number;
}
