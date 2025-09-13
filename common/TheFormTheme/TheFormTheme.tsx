import { ConfigProvider } from 'antd';
import cls from 'classnames';
import { TheFormThemeProps } from './const';
import styles from './TheFormTheme.module.scss';
import { InputTheme } from '@/constants/Theme';

function TheFormTheme(props: TheFormThemeProps) {
  const { children, className } = props;
  return (
    <ConfigProvider
      theme={{
        components: {
          DatePicker: {
            activeBorderColor: 'rgba(149, 153, 160, 1)',
            cellActiveWithRangeBg: 'rgba(5, 179, 96, .2)',
            colorBorder: 'rgba(164,172,188,0.3)',
            colorPrimary: 'rgba(5, 179, 96, 1)',
            hoverBorderColor: 'rgba(149, 153, 160, 1)',
            colorText: 'rgba(25, 25, 25, 1)',
            colorTextPlaceholder: 'rgba(149, 153, 160, 1)',
            fontSizeLG: 14,
            borderRadius: 8,
            fontSizeIcon: 14,
          },
          Input: { ...InputTheme, fontSizeLG: 14, fontSizeIcon: 14 },
          Select: {
            fontSizeIcon: 14,
            colorBorder: 'rgba(164,172,188,0.3)',
            colorPrimary: 'rgb(149,153,160)',
            hoverBorderColor: 'rgba(149, 153, 160, 1)',
            colorText: 'rgba(25, 25, 25, 1)',
            colorTextPlaceholder: 'rgba(149, 153, 160, 1)',
            optionActiveBg: 'rgba(238, 240, 244, 1)',
            optionSelectedBg: '#ffffff',
            optionSelectedColor: 'rgba(5, 179, 96, 1)',
            fontSizeLG: 14,
          },
          Cascader: {
            fontSizeIcon: 14,
            colorBorder: 'rgba(164,172,188,0.3)',
            colorPrimary: 'rgb(149,153,160)',
            colorText: 'rgba(25, 25, 25, 1)',
            colorTextPlaceholder: 'rgba(149, 153, 160, 1)',
            optionSelectedBg: '#ffffff',
            optionSelectedColor: 'rgba(5, 179, 96, 1)',
            fontSizeLG: 14,
          },
          Radio: {
            colorPrimary: 'rgba(5, 179, 96, 1)',
            dotSize: 8,
            colorBorder: 'rgba(164, 172, 188, 0.3)',
            colorText: 'rgba(0, 0, 0, 0.85)',
          },
        },
      }}
    >
      <div className={cls(styles['form-wrapper'], className)}>{children}</div>
    </ConfigProvider>
  );
}

export default TheFormTheme;
