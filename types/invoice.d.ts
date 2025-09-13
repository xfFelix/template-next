declare namespace Invoice {
  type TitleType = 'personal' | 'company';
  /** 发票状态，详情查看InvoiceStatus.ts */
  type Status = 'none' | 'pending' | 'issued';
  /** 企业 */
  interface Company {
    code: string;
    name: string;
  }

  /** 企业发票信息 */
  interface Data {
    /** 公司名称 */
    name: string;
    /** 税号 */
    taxNo: string;
    /** 公司地址 */
    address: string;
    /** 公司手机号码 */
    telephone: string;
  }

  interface Apply {
    /** 订单号 */
    orderNo: string;
    /** 发票抬头 */
    titleType: TitleType;
    /** 购方名称 */
    buyerName: string;
    /** 身份证或者企业税号 */
    buyerTaxNo: string;
    /** 接收电子发票 */
    email: string;
  }
}
