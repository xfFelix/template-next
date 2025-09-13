import { ColumnsType } from 'antd/es/table';
import ResourceStateTab from '../components/ResourceStateTab';
import { formatTime } from '@/utils/formatTime';

const AccountTableColumns: ColumnsType = [
  {
    title: '资源包名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '资源包状态',
    dataIndex: 'status',
    key: 'status',
    render(_, { status }) {
      return <ResourceStateTab state={status} />;
    },
  },
  {
    title: '算力消耗情况',
    dataIndex: 'creditsUsed',
    key: 'creditsUsed',
    render(_, { creditsUsed = 0, initialCredits }) {
      return (
        <span>
          {creditsUsed.toLocaleString()}算力 / {initialCredits.toLocaleString()}
          算力
        </span>
      );
    },
  },
  {
    title: '有效期',
    dataIndex: 'expiredAt',
    key: 'expiredAt',
    render(_, { expiredAt }) {
      return formatTime(expiredAt);
    },
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
];

export default AccountTableColumns;
