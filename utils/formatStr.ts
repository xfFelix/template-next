import { message } from 'antd';

/**
 * 字符串脱敏处理
 * @param str 原始字符串
 * @param start 开始位置（从0开始）
 * @param length 需要替换为*的字符长度
 * @param maskChar 替换字符，默认为'*'
 * @returns 脱敏后的字符串
 */
export const maskString = (
  str: string,
  start: number,
  length: number,
  maskChar: string = '*'
): string => {
  if (!str) return '';
  // 参数校验
  if (start < 0 || length < 0) {
    message.error('开始位置和长度不能为负数');
    return '';
  }

  if (start + length > str.length) {
    message.error('开始位置和长度之和不能超过字符串长度');
    return '';
  }

  // 生成掩码字符串
  const mask = maskChar.repeat(length);

  // 拼接结果
  return `${str.slice(0, start)}${mask}${str.slice(start + length)}`;
};
