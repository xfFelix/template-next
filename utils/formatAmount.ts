/**
 * 将数字转换为金额格式（带千分位分隔符）
 * @param amount 金额数值
 * @param options 配置选项
 * @param options.separator 分隔符，默认为','
 * @param options.prefix 前缀，默认为''
 * @param options.unit 货币单位，默认为''
 * @param options.convertUnit 是否需要单位转换，比如分转元，默认为true
 * @param options.showDecimal 是否需要展示小数点，比如123.00，默认true
 * @returns 格式化后的金额字符串
 * @example
 * formatAmount(123456) // '1,234.56'
 * formatAmount(123456, { prefix: '' }) // '1,234.56'
 * formatAmount(1234.56, { convertUnit: false }) // '1,234.56'
 * formatAmount(123456, { unit: '分' }) // '123,456分'
 * formatAmount(123456, { prefix: '¥', unit: '元' }) // '1,234.56'
 */
export const formatAmount = (
  amount: number,
  options?: {
    separator?: string;
    prefix?: string;
    unit?: string;
    convertUnit?: boolean;
    showDecimal?: boolean;
  }
): string => {
  const {
    separator = ',',
    prefix = '',
    unit = '',
    convertUnit = true,
    showDecimal = true,
  } = options || {};

  // 处理异常情况
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return `${prefix}0.00${unit}`;
  }

  // 根据convertUnit决定是否需要转换单位（分转元）
  const value = convertUnit ? amount / 100 : amount;

  // 格式化为固定两位小数
  const fixedValue = value.toFixed(2);

  // 分割整数部分和小数部分
  const [integerPart, decimalPart] = fixedValue.split('.');

  // 处理整数部分的千分位
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separator
  );

  // 如果unit为空字符串，则不显示单位
  const displayUnit = unit || '';

  // 组合最终结果
  return `${prefix}${formattedInteger}${
    showDecimal ? `.${decimalPart}` : ''
  }${displayUnit}`;
};
