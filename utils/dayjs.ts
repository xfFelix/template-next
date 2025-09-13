import dayjs from 'dayjs';

/** 日期范围禁止选择今天之后 */
export const disabledDate = (current: number) =>
  // Can not select days before today and today
  current && current > (dayjs().endOf('day') as unknown as number);

export function transformDate2Range(
  value: [string | dayjs.Dayjs, string | dayjs.Dayjs]
): [string | undefined, string | undefined] {
  if (!Array.isArray(value)) return [undefined, undefined];
  return [
    `${dayjs(value[0]).format('YYYY-MM-DD')} 00:00:00`,
    `${dayjs(value[1]).format('YYYY-MM-DD')} 23:59:59`,
  ];
}

/** 时间显示转换 */
export const formatDate = (value: string) => {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  const y = date.getFullYear();
  const m =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const n =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const s =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${y}-${m}-${d} ${h}:${n}:${s}`;
};
