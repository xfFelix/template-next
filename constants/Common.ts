/** 状态 */
export enum StatusTypeEnum {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

/**  状态颜色映射  */
export const StatusColorMap = {
  [StatusTypeEnum.ENABLED]: 'green',
  [StatusTypeEnum.DISABLED]: 'red',
};
export const StatusMap = {
  [StatusTypeEnum.ENABLED]: '上架',
  [StatusTypeEnum.DISABLED]: '下架',
};
/** 状态 */
export const StatusOption = [
  {
    value: StatusTypeEnum.ENABLED,
    label: '上架',
  },
  {
    value: StatusTypeEnum.DISABLED,
    label: '下架',
  },
];
