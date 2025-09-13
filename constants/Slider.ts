import { SliderListProps } from '@/types/Slider';

export const enum SliderValueEnum {
  /** 账户总览 */
  ACCOUNT = '/console/account',
  /** 购买资源 */
  PURCHASE = '/console/purchase',
  /** 订单明细 */
  ORDER = '/console/order',
  /** 消耗明细 */
  CONSUME = '/console/consume',
  /** api密钥 */
  API_KEY = '/console/apiKey',
}

/** 侧边栏 */
export const SliderOptions: Partial<SliderListProps>[] = [
  {
    title: '账户总览',
    key: SliderValueEnum.ACCOUNT,
    icon: 'icon_account',
  },
  {
    title: '购买资源',
    key: SliderValueEnum.PURCHASE,
    icon: 'icon_buy',
  },
  {
    title: '订单明细',
    key: SliderValueEnum.ORDER,
    icon: 'icon_order',
  },
  {
    title: '消耗明细',
    key: SliderValueEnum.CONSUME,
    icon: 'icon_consume',
  },
  {
    title: '',
    key: '',
    icon: 'icon_home',
  },
  {
    title: 'API密钥',
    key: SliderValueEnum.API_KEY,
    icon: 'icon_key',
  },
];
