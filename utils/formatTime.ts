import dayjs from 'dayjs';

export const formatTime = (value: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!value) return '--';
  return dayjs(value).format(format);
};
