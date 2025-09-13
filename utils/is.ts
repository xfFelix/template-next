/**
 * 校验身份证号码
 * @param idCard 身份证号码
 * @returns {boolean} 是否为有效的身份证号码
 */
export const isIdCard = (idCard: string): boolean => {
  // 基本格式校验：15位或18位数字，18位的最后一位可以是X
  const reg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(idCard)) {
    return false;
  }

  // 如果是15位身份证
  if (idCard.length === 15) {
    return true; // 由于15位老身份证已经很少使用，这里只做简单校验
  }

  // 18位身份证校验
  // 加权因子
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码
  const codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  // 身份证前17位
  const idCard17 = idCard.substring(0, 17);

  // 身份证最后一位
  const lastCode = idCard.substring(17, 18).toUpperCase();

  // 计算校验码
  let sum = 0;
  for (let i = 0; i < 17; i += 1) {
    sum += parseInt(idCard17[i], 10) * weights[i];
  }

  // 计算出的校验码
  const calculatedCode = codes[sum % 11];

  // 校验日期合法性
  const year = parseInt(idCard.substring(6, 10), 10);
  const month = parseInt(idCard.substring(10, 12), 10);
  const day = parseInt(idCard.substring(12, 14), 10);
  const date = new Date(year, month - 1, day);

  // 日期是否合法
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  // 最终校验
  return calculatedCode === lastCode && isValidDate;
};
