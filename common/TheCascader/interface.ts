import { CascaderProps } from 'antd';

export interface TheCascaderProps extends Omit<CascaderProps, 'onChange'> {
  onChange?: (values: (string | number | null)[]) => void;
}
