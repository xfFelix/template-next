export interface InvoiceData {
  /** 开票金额 */
  amount: number;
  /** 抬头类型 */
  titleType: 'personal' | 'company';
  /** 姓名 仅当 titleType=personal 时必填 */
  personalName?: string;
  /** 身份证 仅当 titleType=personal 时必填 */
  idNumber?: string;
  /** 公司code 仅当 titleType=company 时必填 */
  companyCode?: string;
  /** 公司名 仅当 titleType=company 时必填 */
  companyName?: string;
  /** 税号 仅当 titleType=company 时必填 */
  taxNumber?: string;
  /** 接收电子发票 */
  email: string;
}

export interface ApplyInvoiceModalProps {
  visible: boolean;
  /** 金额 */
  amount: number;
  /** 关闭事件 */
  onClose?: () => void;
  /** 提交事件 */
  onConfirm?: (data: InvoiceData) => void;
}
