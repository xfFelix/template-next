import { DatePicker, Form, Input, Popover, TableColumnProps } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import cls from 'classnames';
import { formatDurationScene } from '@bhb-frontend/utils/lib/format';
import styles from './ConsumeDetail.module.scss';
import TheButton from '@/common/TheButton';
import TheFormTheme from '@/common/TheFormTheme';
import { exportConsume, getConsumeList } from '@/api/consume';
import downloadExcel from '@/utils/downloadExcel';
import { getApiKeyList } from '@/api/apiKey';
import TheTable from '@/common/TheTable';
import { CostItemList, FeatureTypeList, StatusList } from './const';
import IconFont from '../IconFont';
import TheCascader from '@/common/TheCascader';
import { formatAmount } from '@/utils/formatAmount';
import { transformDate2Range } from '@/utils/dayjs';
import Direction from '@/constants/Direction';
import TheSelect from '@/common/TheSelect';

const { RangePicker } = DatePicker;

const DEFAULT_SIZE = 15;
const DEFAULT_PAGE = 1;
export default function ConsumeDetail() {
  const [form] = Form.useForm<Consume.SearchParam & { dateRange: [string, string]; costs: string[] }>();
  const [dataSource, setDataSource] = useState<Consume.Data[]>([]);
  const [apiKeys, setApiKeys] = useState<{ label: string; value: string }[]>([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [cursor, setCursor] = useState<{
    pre?: string;
    next?: string;
    hasNext?: boolean;
  }>({});
  const [direction, setDirection] = useState<Consume.Direction>(Direction.NEXT);

  const columns: TableColumnProps<Partial<Consume.Data>>[] = [
    {
      title: '消耗时间',
      dataIndex: 'createdAt',
      render: text => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
    {
      title: '功能类型',
      dataIndex: 'category',
      render: text => {
        const item = FeatureTypeList.find(item => item.value === text);
        return item?.label;
      },
    },
    {
      title: '计费项',
      dataIndex: 'costRightsType',
      render: text => {
        const item = CostItemList.find(item => item.value === text);
        return item?.label;
      },
    },
    {
      title: (
        <div className={styles['tag-wrapper']}>
          时长
          <Popover content="视频合成的时长，形象克隆、声音定制、音频转文字（ASR）按次收费不展示时长" trigger="hover" className={styles.popover}>
            <span>
              <IconFont icon="icon_hint" color="rgba(25, 25, 25, 0.5)" style={{ marginLeft: '8px' }} />
            </span>
          </Popover>
        </div>
      ),
      dataIndex: 'duration',
      render: value => (value ? formatDurationScene(value) : '-'),
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      render: (text, row) => {
        const item = StatusList.find(item => item.value === text);
        return (
          <div className={styles['tag-wrapper']}>
            <span className={cls(styles.tag, styles[item?.color || ''])}>{item?.label}</span>
            {text === 'failed' && row.errorMessage ? (
              <Popover content={row.errorMessage} trigger="hover" className={styles.popover}>
                <span>
                  <IconFont icon="icon_hint" color="rgba(25, 25, 25, 0.5)" style={{ marginLeft: '8px' }} />
                </span>
              </Popover>
            ) : null}
          </div>
        );
      },
    },
    { title: '任务ID', dataIndex: 'taskId' },
    {
      title: (
        <div className={styles['tag-wrapper']}>
          预扣算力
          <Popover content="任务提交后会预扣一部分算力，多扣除或生成失败会进行返还" trigger="hover" className={styles.popover}>
            <span>
              <IconFont icon="icon_hint" color="rgba(25, 25, 25, 0.5)" style={{ marginLeft: '8px' }} />
            </span>
          </Popover>
        </div>
      ),
      dataIndex: 'preCostCredits',
      render: col => (col ? formatAmount(col, { convertUnit: false }) : '-'),
    },
    {
      title: (
        <div className={styles['tag-wrapper']}>
          消耗算力
          <Popover content="生成任务成功后实际扣除的算力展示" trigger="hover" className={styles.popover}>
            <span>
              <IconFont icon="icon_hint" color="rgba(25, 25, 25, 0.5)" style={{ marginLeft: '8px' }} />
            </span>
          </Popover>
        </div>
      ),
      dataIndex: 'credits',
      render: (col, row) => {
        if (col) {
          return formatAmount(col, { convertUnit: false });
        }
        // 预扣不存在时，为无限定制
        if (!row.preCostCredits) return '-';
        return '0';
      },
    },
  ];

  useEffect(() => {
    getKeyList();
    getConsumes({ limit: DEFAULT_SIZE });
  }, []);

  async function getKeyList() {
    try {
      const { data } = await getApiKeyList({ page: 1, pageSize: 100 });
      const apiKeyList = data.results?.map(item => ({ label: item.name, value: item.id })) || [];
      setApiKeys(apiKeyList);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取消耗列表
   * @param params
   */
  async function getConsumes(params: Consume.Param) {
    try {
      const { data } = await getConsumeList(params);
      setDataSource(data.results);
      setDirection(data.pageInfo.direction);
      setCursor({
        hasNext: data.pageInfo.hasMore,
        pre: data.pageInfo.prevCursor,
        next: data.pageInfo.nextCursor,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取查询参数
   * @returns
   */
  function getSearchValues(): Consume.SearchParam {
    const values = form.getFieldsValue();
    const { dateRange, costs, apiKeyId, ...rest } = values;
    const [startDate, endDate] = transformDate2Range(dateRange);
    let code = costs?.[costs.length - 1] as Consume.CostItem | undefined;
    if (code === 'all') code = undefined;
    return {
      startDate,
      endDate,
      costRightsType: code,
      apiKeyId: apiKeyId === 'all' ? undefined : apiKeyId,
      ...rest,
    };
  }

  function handleSearch() {
    const searchParams = getSearchValues();
    setPage(DEFAULT_PAGE);
    getConsumes({ ...searchParams, limit: DEFAULT_SIZE });
  }

  function handlePageChange(dir: Consume.Direction) {
    if (dir === Direction.NEXT) {
      if (direction === Direction.NEXT && !cursor.hasNext) return;
    } else if (dir === Direction.PREV) {
      if (page === DEFAULT_PAGE) return;
    }
    const searchParams = getSearchValues();
    setPage(pre => (dir === Direction.NEXT ? pre + 1 : pre - 1));
    getConsumes({
      ...searchParams,
      limit: DEFAULT_SIZE,
      cursor: dir === Direction.NEXT ? cursor.next : cursor.pre,
      direction: dir,
    });
  }

  async function handleExport() {
    try {
      const values = getSearchValues();
      const response = await exportConsume(values);
      downloadExcel(response, `闪剪AI开放平台-消耗明细表-${dayjs(Date.now()).format('YYYY-MM-DD')}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles['consume-wrapper']}>
      <div className={styles.title}>消耗明细</div>
      <div className={styles.condition}>
        <TheFormTheme>
          <Form layout="inline" size="large" form={form} initialValues={{ apiKeyId: 'all', costs: ['all'] }}>
            <Form.Item label="API密钥名称" colon={false} name="apiKeyId">
              <TheSelect
                allowClear
                options={[{ label: '全部', value: 'all' }, ...apiKeys]}
                placeholder="全部"
                defaultActiveFirstOption={false}
                style={{ width: 200 }}
              />
            </Form.Item>
            <Form.Item label="消耗时间" colon={false} name="dateRange">
              <RangePicker
                prefix={<IconFont icon="icon_date" size={16} />}
                suffixIcon={<IconFont icon="icon_arrow_down" size={16} color="rgba(149, 153, 160, 1)" />}
              />
            </Form.Item>
            <Form.Item label="功能类型/计费项" colon={false} name="costs">
              <TheCascader options={[{ label: '全部', value: 'all' }, ...FeatureTypeList]} style={{ width: 200 }} placeholder="全部" />
            </Form.Item>
            <Form.Item label="任务ID" colon={false} name="taskId">
              <Input placeholder="请输入任务ID" style={{ width: 200 }} allowClear />
            </Form.Item>
          </Form>
        </TheFormTheme>
        <div className={styles.btns}>
          <TheButton className={styles['btn-search']} onClick={handleSearch}>
            查询
          </TheButton>
          <TheButton className={styles['btn-export']} icon={<IconFont icon="icon_export" size={16} color="#fff" />} onClick={handleExport}>
            导出数据
          </TheButton>
        </div>
      </div>
      <TheTable rowKey="taskId" className={styles.table} columns={columns} dataSource={dataSource} pagination={false}>
        {dataSource?.length > 0 ? (
          <div className={styles['pagination-container']}>
            <div
              className={cls(styles['pagination-item'], styles.operate, {
                [styles.disabled]: page === DEFAULT_PAGE,
              })}
              onClick={() => handlePageChange(Direction.PREV)}
            >
              <IconFont icon="icon-arrow-l" size={12} />
            </div>
            <div className={cls(styles['pagination-item'], styles['page-num'])}>{page}</div>
            <div
              className={cls(styles['pagination-item'], styles.operate, {
                [styles.disabled]: direction === Direction.NEXT && !cursor.hasNext,
              })}
              onClick={() => handlePageChange(Direction.NEXT)}
            >
              <IconFont icon="icon-arrow-r" size={12} />
            </div>
          </div>
        ) : null}
      </TheTable>
    </div>
  );
}
