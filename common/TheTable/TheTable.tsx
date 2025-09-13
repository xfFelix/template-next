import { ConfigProvider, Table, TablePaginationConfig } from 'antd';
import { memo, useMemo } from 'react';
import cls from 'classnames';
import styles from './TheTable.module.scss';
import { TheTableProps } from './const';
import EmptyImageEnum from '@/assets/empty';
import Image from 'next/image';

function TheTable(props: TheTableProps) {
  const { className, pagination, children, ...restProps } = props;

  const pagin: false | TablePaginationConfig | undefined = useMemo(() => {
    if (typeof pagination === 'boolean') {
      return pagination;
    }
    return {
      showTotal: total => <span>共{total}条</span>,
      itemRender: renderItem,
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
  }, [pagination]);

  function renderItem(page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: React.ReactNode) {
    if (type !== 'page') {
      return element;
    }
    return <span>{page}</span>;
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerSplitColor: '#f5f6faff',
            headerColor: '#63666d',
            headerBg: '#f5f6faff',
            cellPaddingBlock: 12,
          },
          Pagination: {
            colorText: 'rgba(25,25,25,1)',
            itemActiveBg: '#F5F6FA',
            colorPrimary: 'rgba(245, 246, 250, 1)',
            colorPrimaryHover: 'rgba(245, 246, 250, 1)',
            colorBgTextHover: 'rgba(245, 246, 250, 1)',
          },
          Select: {
            optionSelectedBg: '#F5F6FA',
          },
        },
      }}
    >
      <div className={styles['table-wrapper']}>
        <Table
          size="large"
          className={cls(styles['table-container'], className)}
          locale={{
            emptyText: (
              <div className={styles.empty}>
                <Image src={EmptyImageEnum.Table} alt="" className={styles['empty-img']} />
                <div className={styles['empty-text']}>什么都没有 🤔</div>
              </div>
            ),
          }}
          pagination={pagin}
          {...restProps}
        />
        {children}
      </div>
    </ConfigProvider>
  );
}

export default memo(TheTable);
