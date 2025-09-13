/** 资源包状态 */
export enum ResourceState {
  /** 待生效 */
  PENDING = 'pending',
  /** 激活 */
  ACTIVE = 'active',
  /** 冻结 */
  FROZEN = 'frozen',
  /** 过期 */
  EXPIRED = 'expired',
  /** 退款 */
  CANCELED = 'canceled',
}

export const ResourceStateLabel = {
  [ResourceState.PENDING]: '未生效',
  [ResourceState.ACTIVE]: '生效中',
  [ResourceState.EXPIRED]: '已过期',
  [ResourceState.FROZEN]: '延迟生效',
  [ResourceState.CANCELED]: '已退款',
};
