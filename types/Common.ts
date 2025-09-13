/** 弹窗 抽屉类的公共属性 */
export interface SwitchVisible {
  visible: boolean;
  setVisible: (arg: boolean) => void;
}

/** 游标查询 */
export interface CursorQuery {
  /** 页大小 */
  pageSize: number;
  /** 分页标识 */
  sid: string;
}

/** 常规分页查询 */
export interface PageQuery {
  /** 页大小 */
  pageSize?: number;
  /** 分页标识 */
  page?: number;
}

export interface PaginationProps {
  page?: number;
  pageSize?: number;
  total?: number;
}

export interface JsonTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}
