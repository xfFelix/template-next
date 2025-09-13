import { message } from 'antd';

/**
 * 字节数转为MB
 */
const toMB = (byte: number) => Number((byte / 1024 / 1024).toFixed(2));
/**
 * 效验文件大小
 * @param file 文件
 * @param size 单位 KB
 */
export function fileSizeVail(
  file: File,
  size: number,
  tip = '上传的文件过大'
): boolean {
  if (!size) return true;
  if (toMB(file.size) > size) {
    message.warning(tip);
  }
  return !(toMB(file.size) > size);
}
