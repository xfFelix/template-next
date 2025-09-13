import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, message, TableColumnProps } from 'antd';
import dayjs from 'dayjs';
import cls from 'classnames';
import styles from './OrderDetail.module.scss';
import TheButton from '@/common/TheButton';
import TheFormTheme from '@/common/TheFormTheme';
import { exportOrder, getOrderList } from '@/api/order';
import downloadExcel from '@/utils/downloadExcel';
import OrderType from '@/constants/OrderType';
import TheTable from '@/common/TheTable';
import BusinessIcon from '../BusinessIcon';
import IconFont from '../IconFont';
import { formatAmount } from '@/utils/formatAmount';
import { transformDate2Range } from '@/utils/dayjs';
import clipboard from '@/utils/clipboard';
import { PaymentList, StatusList } from './const';
import ApplyInvoiceModal from '../ApplyInvoiceModal';
import { InvoiceData } from '../ApplyInvoiceModal/interface';
import { applyInvoice } from '@/api/invoice';
import InvoiceStatus from '@/constants/InvoiceStatus';

const { RangePicker } = DatePicker;
export default function OrderDetail() {
  const [dataSource, setDataSource] = useState<Order.Data[]>([]);
  const [form] = Form.useForm<{ dateRange: [string, string] }>();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({ page: 1, pageSize: 20 });
  const [order, setOrder] = useState<Order.Data>();
  /** 开票弹窗 */
  const [applyVisible, setApplyVisible] = useState(false);

  useEffect(() => {
    getOrders(page);
  }, []);

  const columns: TableColumnProps<Partial<Order.Data>>[] = [
    { title: '订单名称', dataIndex: 'name' },
    {
      title: '订单类型',
      dataIndex: 'type',
      render: col => {
        if (col === OrderType.CREDITS) {
          return '加购算力';
        }
        return '购买资源包';
      },
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      render: col => `${formatAmount(col, { unit: '元' })}`,
    },
    {
      title: '购买数量',
      dataIndex: 'quantity',
    },
    {
      title: '获得算力',
      dataIndex: 'credits',
      render: col => `${formatAmount(col, { convertUnit: false })}算力`,
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      render: col => {
        const item = StatusList.find(item => item.value === col);
        return <span className={cls(styles.tag, styles[item?.color || ''])}>{item?.label}</span>;
      },
    },
    {
      title: '支付渠道',
      dataIndex: 'payChannel',
      render: col => {
        const item = PaymentList.find(item => item.value === col);
        return item?.label;
      },
    },
    {
      title: '支付时间',
      dataIndex: 'payAt',
      render: text => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
      render: col => (
        <Button type="link" onClick={() => handleCopy(col)}>
          {col}
        </Button>
      ),
    },
    {
      title: '开票操作',
      dataIndex: 'operate',
      align: 'center',
      render: (_, row) => (
        <Button type="link" disabled={row.invoiceStatus === InvoiceStatus.ISSUED} onClick={() => handleApply(row)}>
          {row.invoiceStatus === InvoiceStatus.ISSUED ? '已开票' : '申请开票'}
        </Button>
      ),
    },
  ];

  /**
   * 获取订单列表
   * @param params
   */
  async function getOrders(params: Partial<Order.Param> = {}) {
    try {
      const searchValues = getSearchValues();
      const searchParams: Order.Param = {
        ...searchValues,
        page: page.page,
        pageSize: page.pageSize,
      };
      const response = await getOrderList({ ...searchParams, ...params });
      setDataSource(response.data.results);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询
   */
  function handleSearch() {
    setPage({ page: 1, pageSize: page.pageSize });
    getOrders({ page: 1 });
  }

  /**
   *
   * @returns
   */
  function getSearchValues(): Order.SearchParam {
    const values = form.getFieldsValue();
    const { dateRange } = values;
    const [startDate, endDate] = transformDate2Range(dateRange);
    return { startDate, endDate };
  }

  /**
   * 导出订单
   */
  async function handleExport() {
    try {
      const values = getSearchValues();
      const response = await exportOrder(values);
      downloadExcel(response, `闪剪AI开放平台-订单明细表-${dayjs(Date.now()).format('YYYY-MM-DD')}`);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 处理分页变化
   * @param page
   * @param pageSize
   */
  function handlePageChange(page: number, pageSize: number) {
    setPage({ page, pageSize });
    getOrders({ page, pageSize });
  }

  async function handleCopy(text: string) {
    await clipboard(text);
    message.success('复制成功');
  }

  /** 点击申请开票 */
  function handleApply(order: Partial<Order.Data>) {
    setOrder(order as Order.Data);
    setApplyVisible(true);
  }

  /** 开票 */
  async function onApplyInvoice(invoice: InvoiceData) {
    const { titleType, personalName, companyName, idNumber, taxNumber, email } = invoice;
    await applyInvoice({
      orderNo: order?.orderNo as string,
      titleType,
      buyerName: (titleType === 'personal' ? personalName : companyName) as string,
      buyerTaxNo: (titleType === 'personal' ? idNumber : taxNumber) as string,
      email,
    });
    message.success('申请开票成功');
    setApplyVisible(false);
    getOrders();
  }

  return (
    <div className={styles['order-wrapper']}>
      <div className={styles.title}>订单明细</div>
      <div className={styles.condition}>
        <TheFormTheme>
          <Form layout="inline" size="large" form={form}>
            <Form.Item label="支付时间" colon={false} name="dateRange">
              <RangePicker
                allowClear
                prefix={<IconFont icon="icon_date" size={16} />}
                suffixIcon={<IconFont icon="icon_arrow_down" size={16} color="rgba(149, 153, 160, 1)" />}
              />
            </Form.Item>
            <Form.Item>
              <TheButton className={styles['btn-search']} onClick={handleSearch}>
                查询
              </TheButton>
            </Form.Item>
          </Form>
        </TheFormTheme>

        <TheButton className={styles['btn-export']} onClick={handleExport} icon={<IconFont icon="icon_export" size={16} color="#fff" />}>
          导出数据
        </TheButton>
      </div>
      <TheTable
        rowKey="orderNo"
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: page.pageSize,
          total,
          onChange: handlePageChange,
        }}
      />
      <BusinessIcon />
      {/* 开票弹窗 */}
      <ApplyInvoiceModal visible={applyVisible} amount={order?.amount || 0} onClose={() => setApplyVisible(false)} onConfirm={onApplyInvoice} />
    </div>
  );
}
