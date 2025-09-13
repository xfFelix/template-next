'use client';
import { ConfigProvider } from 'antd';
import styles from './page.module.scss';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN';
import Slider from '@/components/Slider';
import { Suspense } from 'react';

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.layout}>
        <Slider />
        <Suspense>
          <div className={styles.content}>{children}</div>
        </Suspense>
      </div>
    </ConfigProvider>
  );
}
