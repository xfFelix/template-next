import service from '@/service/request';

/**
 * ### 根据公司名称获取企业代码
 * @param keyword 公司名称
 * @returns 企业列表
 */
export function getCompanyList(keyword: string) {
  return service.get<unknown, HttpResponse.ResultCallback<Invoice.Company>>(
    '/v1/invoice/companies/code',
    {
      params: { keyword },
    }
  );
}

/**
 * ### 根据企业代码获取企业发票信息
 * @param code 企业代码
 * @returns 企业信息
 */
export function getCompany(code: string) {
  return service.get<unknown, HttpResponse.Callback<Invoice.Data>>(
    '/v1/invoice/companies/info',
    {
      params: { code },
    }
  );
}

/**
 * ### 开发票
 * @param orderNo
 * @returns void
 */
export function applyInvoice(data: Invoice.Apply) {
  return service.post<unknown, HttpResponse.Callback<void>>(
    '/v1/invoice/apply',
    data
  );
}
