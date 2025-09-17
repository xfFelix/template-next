import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Style from './PaymentCard.module.scss';
import { PayType, PayTypeOptions } from '../../constants/enum/PayType';
import useGetState from '@/hooks/useGetState';
import { createOrder, getOrderDetail } from '@/api/Order/order';
import { QrcodeMode } from '@/constants/enum/QrcodeMode';
import translateAmount from '@/helpers/translateAmount';
import { ONE_SECONDS, TWO_SECONDS } from '@/constants/time';
import { OrderDetail } from '@/types/orderDetail';
import PaymentCardStyle from '@/constants/enum/PaymentCardStyle';
import CustomButton from '../CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import IconFont from '../IconFont';
import OrderStatus from '@/constants/OrderStatus';
import PAYMENT_AGREEMENT_LINK from '@/config/PaymentAgreementLink';
import CommonImageAssets from '@/assets/Common';
import Image from 'next/image';

interface PaymentCardProps {
  /** 关联商品 */
  goodsId: string;
  /** 支付卡片组件样式类型 */
  styleType: PaymentCardStyle;
  /** 成功回调 */
  onSuccess: () => void;
}

/** 支付成功状态的类型数组 */
const PaySuccessTypes = [OrderStatus.PAID, OrderStatus.COMPLETED];

function PaymentCard(props: PaymentCardProps) {
  const { goodsId, styleType = PaymentCardStyle.HORIZONTAL, onSuccess } = props;

  /** 二维码大小 */
  const qrcodeSize = styleType === PaymentCardStyle.HORIZONTAL ? 110 : 172;

  // 当前商品 id
  const [, setCurrentGoodsId, getCurrentGoodsId] = useGetState('');

  // 当前激活 tab
  const [tab, setTab, getTab] = useGetState(PayType.WE_CHATE);

  // 加载状态
  const [loading, setLoading] = useState(false);

  // 支付订单详情
  const [order, setOrder, getOrder] = useGetState<OrderDetail | undefined>(
    undefined
  );

  const currentOrderKey = useRef(0);

  // 订单二维码链接
  const [codeUrl, setCodeUrl] = useState('');

  /** 生成二维码链接 */
  const initCodeUrl = (type: PayType, data: OrderDetail) => {
    setCodeUrl('');
    if (!data?.charge?.nativeData) return;

    if (type === PayType.WE_CHATE) {
      setCodeUrl(data?.charge?.nativeData.code_url);
    } else {
      const url = URL.createObjectURL(
        new Blob([data.charge.nativeData.data], { type: 'text/html' })
      );
      setCodeUrl(url);
    }
  };

  // 订单过期状态
  const [isExpired, setIsExpired, getIsExpired] = useGetState(false);

  /** 初始化订单 */
  const initOrder = async (type: PayType) => {
    if (!goodsId) return;
    setCodeUrl('');
    setOrder(undefined);
    setIsExpired(false);
    setLoading(true);
    currentOrderKey.current += 1;
    const key = currentOrderKey.current;

    const { data } = await createOrder({
      goodsId,
      payMethod: type,
      qrcodeMode: QrcodeMode.CUSTOM,
      qrcodeWidth: qrcodeSize,
    });

    if (key !== currentOrderKey.current) return;

    setOrder(data);
    initCodeUrl(type, data);
    setTimeout(() => {
      if (key !== currentOrderKey.current) return;
      setLoading(false);
    }, ONE_SECONDS);
  };

  /** 用户切换菜单 */
  const handleTab = (type: PayType) => {
    if (getTab() === type) return;
    setTab(type);
    initOrder(type);
  };

  /** 轮询订单状态 */
  const pollingOrder = async () => {
    const { orderNo } = getOrder() || {};
    if (!getIsExpired() && orderNo) {
      const { data } = await getOrderDetail(orderNo);
      if (PaySuccessTypes.includes(data.status as OrderStatus)) {
        setOrder(undefined);
        onSuccess?.();
      } else if (data.status !== OrderStatus.PENDING) {
        setIsExpired(true);
      }
    }
  };

  /** 用户点击充值协议 */
  const handleLink = () => {
    window.open(PAYMENT_AGREEMENT_LINK);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      pollingOrder();
    }, TWO_SECONDS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!goodsId) return;
    if (goodsId !== getCurrentGoodsId()) {
      setCurrentGoodsId(goodsId);
      initOrder(tab);
    }
  }, [goodsId]);

  return (
    <div className={cls(Style['payment-card'], Style[styleType])}>
      <div className={Style.header}>
        <div className={Style['tab-bar']}>
          {PayTypeOptions.map(t => (
            <div
              key={t.value}
              onClick={() => handleTab(t.value)}
              className={cls(Style['tab-item'], {
                [Style.active]: tab === t.value,
              })}
            >
              {t.value === PayType.WE_CHATE ? (
                <IconFont icon="icon_wechat" size={18} color="#28C445" />
              ) : (
                <IconFont icon="icon_alipay" size={18} color="#06B4FD" />
              )}
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={Style.content}>
        <div
          className={cls(Style.qrcode, {
            [Style.loading]: loading,
            [Style['is-expired']]: isExpired,
          })}
        >
          {tab === PayType.WE_CHATE ? (
            <QRCodeSVG
              value={codeUrl}
              className={Style['code-url']}
              size={qrcodeSize}
            />
          ) : (
            <iframe
              scrolling="no"
              className={Style.iframe}
              title="二维码"
              src={codeUrl}
              width={qrcodeSize}
              height={qrcodeSize}
            />
          )}

          <div className={Style['expired-box']} onClick={() => initOrder(tab)}>
            <IconFont icon="icon_refresh" color="#fff" size={24} />
            <span>刷新</span>
          </div>

          <div className={Style.spin}>
            <Image
              src={CommonImageAssets.LOADING_ICON}
              className={Style.icon}
              alt=""
            />
          </div>
          {/* <Spin spinning className={Style.spin} /> */}
        </div>
        <div className={Style.detail}>
          <div className={Style.price}>
            扫码支付
            <span className={Style.icon}>¥</span>
            <span className={Style.num}>{translateAmount(order?.amount)}</span>
          </div>
          <div className={Style.tip}>
            请使用{tab === PayType.WE_CHATE ? '微信' : '支付宝'}扫码支付
          </div>
          <div className={Style.agreement}>
            确认支付即代表同意本平台
            <CustomButton
              type={ButtonType.TEXT}
              className={Style.link}
              onClick={handleLink}
            >
              《充值协议》
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
