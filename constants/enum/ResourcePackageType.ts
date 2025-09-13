/** 资源包商品类型 */
export enum ResourcePackageType {
  /** 试用版 */
  TRIAL = 'trial', //
  /** 正式版 */
  OFFICIAL = 'official', //
}

/** 资源包商品类型文案 */
export const ResourcePackageTypeLabel = {
  [ResourcePackageType.OFFICIAL]: '正式版',
  [ResourcePackageType.TRIAL]: '试用版',
};
