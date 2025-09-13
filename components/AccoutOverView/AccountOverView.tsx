import React, { useEffect, useRef, useState } from 'react';
import { TablePaginationConfig } from 'antd';
import Style from './AccountOverView.module.scss';
import AccountTableColumns from './constants/AccountTableColumns';
import DashboardDetail from './components/DashboardDetail';
import { ResourceDetail } from '@/types/account';
import { getResourceList } from '@/api/Account/account';
import TheTable from '@/common/TheTable';

export default function AccountOverView() {
  const totalRef = useRef(0);
  const [resourceList, setResourceList] = useState<ResourceDetail[]>([]);
  const [loading, setLoading] = useState(true);

  const currentKey = useRef(0);

  const loadPage = async (page: number, pageSize: number) => {
    setLoading(true);
    currentKey.current += 1;
    const key = currentKey.current;
    try {
      const { data } = await getResourceList({
        page,
        pageSize,
      });

      if (key !== currentKey.current) return;
      totalRef.current = data.total;

      setResourceList(data.results);
    } finally {
      if (key === currentKey.current) {
        setLoading(false);
      }
    }
  };

  const handlePageChange = (pagination: TablePaginationConfig) => {
    loadPage(pagination.current || 1, pagination.pageSize || 10);
  };

  useEffect(() => {
    loadPage(1, 10);
  }, []);

  return (
    <div className={Style['account-page']}>
      <div className={Style.title}>账户总览</div>
      <DashboardDetail />

      <TheTable
        loading={loading}
        // className={styles.table}
        onChange={handlePageChange}
        rowKey={t => t.id}
        columns={AccountTableColumns}
        dataSource={resourceList}
        pagination={{ total: totalRef.current }}
      />
    </div>
  );
}
