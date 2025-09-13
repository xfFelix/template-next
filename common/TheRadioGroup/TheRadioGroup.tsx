import { Radio } from 'antd';
import { memo } from 'react';
import { TheRadioGroupProps } from './interface';
import styles from './TheRadioGroup.module.scss';

function TheSelect(props: TheRadioGroupProps) {
  const { value, onChange, ...other } = props;
  return <Radio.Group className={styles['radio-wrapper']} value={value} onChange={onChange} {...other} />;
}

export default memo(TheSelect);
