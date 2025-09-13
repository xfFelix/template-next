import { Select } from 'antd';
import { memo } from 'react';
import { TheSelectProps } from './interface';
import IconFont from '@/components/IconFont';
import styles from './TheSelect.module.scss';

function TheSelect(props: TheSelectProps) {
  const { value, onChange, ...other } = props;
  return (
    <Select
      classNames={{
        popup: {
          root: styles['select-popup-wrapper'],
        },
        root: styles['select-wrapper'],
      }}
      value={value}
      suffixIcon={<IconFont icon="icon_arrow_down" size={16} color="rgba(149, 153, 160, 1)" />}
      onChange={onChange}
      {...other}
    />
  );
}

export default memo(TheSelect);
