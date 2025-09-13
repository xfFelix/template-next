import { Cascader } from 'antd';
import { TheCascaderProps } from './interface';
import IconFont from '@/components/IconFont';
import styles from './TheCascader.module.scss';

function TheCascader(props: TheCascaderProps) {
  const { value, onChange, ...other } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Cascader
      classNames={{
        popup: {
          root: styles['cascader-popup-wrapper'],
        },
        root: styles['cascader-wrapper'],
      }}
      value={value}
      suffixIcon={<IconFont icon="icon_arrow_down" size={16} color="rgba(149, 153, 160, 1)" />}
      expandIcon={<IconFont icon="icon-arrow-r" size={14} />}
      onChange={values => onChange?.(values)}
      {...other}
    />
  );
}

export default TheCascader;
