import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, ConfigProvider, Empty, message, Popconfirm, Switch, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { ColumnsType } from 'antd/es/table';
import Style from './ApikeyCpn.module.scss';
import { formatTime } from '@/utils/formatTime';
import clipboard from '@/utils/clipboard';
import StaticResources from '@/assets/ApiKey';
import { ApiKeyTableType } from '@/types/ApiKey';
import CreateApiKeyModal from './components/CreateApiKeyModal';
import RealNameModal from './components/RealNameModal';
import { RealNameStatusEnum, RealNameSuccessStatus, RealNameTypeEnum } from '@/constants/ApiKey';
import PersonalRealNameModal from './components/PersonalRealNameModal';
import CompanyRealNameModal from './components/CompanyRealNameModal';
import { StatusTypeEnum } from '@/constants/Common';
import { deleteApiKey, getApiKeyList, updateApiKeyStatus } from '@/api/apiKey';
import { maskString } from '@/utils/formatStr';
import IconFont from '../IconFont';
import { useStores } from '@/stores';
import TheTable from '@/common/TheTable';

const theme = {
  components: {
    Alert: {
      lineWidth: 0,
      background: 'rgba(232, 243, 255, 1)',
    },
    Empty: {
      colorTextDescription: 'rgba(149, 153, 160, 1)',
    },
    Button: {
      iconGap: 4,
    },
    Switch: {
      colorPrimary: '#19D179',
      colorPrimaryHover: '#19D179',
    },
  },
};

function ApiKeyCpn({ data }: { data: ApiKeyTableType[] }) {
  const { userInfo } = useStores();

  /** apiKey列表 */
  const [apiKeyList, setApiKeyList] = useState<ApiKeyTableType[]>(data);

  /** apiKey弹窗 */
  const [visible, setVisible] = useState(false);

  /** 实名认证提示弹窗 */
  const [realNameVisible, setRealNameVisible] = useState(false);

  /** 个人实名认证弹窗 */
  const [personalRealNameVisible, setPersonalRealNameVisible] = useState(false);

  /** 企业实名认证弹窗 */
  const [companyRealNameVisible, setCompanyRealNameVisible] = useState(false);

  /** 密钥详情 */
  const [apiKeyDetail, setApiKeyDetail] = useState<Partial<ApiKeyTableType>>({});

  const [loading, setLoading] = useState(false);
  /** 获取列表数据 */
  const getList = async () => {
    try {
      setLoading(true);
      const { data } = await getApiKeyList({
        page: 1,
        pageSize: 20,
      });
      setApiKeyList(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /** 改变启用状态 */
  const onChangeStatus = async (id: string, status: StatusTypeEnum) => {
    try {
      await updateApiKeyStatus(id, status === StatusTypeEnum.ENABLED ? StatusTypeEnum.DISABLED : StatusTypeEnum.ENABLED);
      message.success('操作成功');
      getList();
    } catch (error) {
      console.log(error);
      message.error('操作失败');
    }
  };

  /** 控制apiKey弹窗显示 */
  const handleVisible = (value: boolean) => {
    setVisible(value);
  };

  /** 控制实名认证弹窗显示 */
  const handleRealNameVisible = (value: boolean, type?: RealNameTypeEnum) => {
    setRealNameVisible(value);
    if (!type) return;
    if (type === RealNameTypeEnum.PERSONAL) {
      setPersonalRealNameVisible(true);
      return;
    }
    setCompanyRealNameVisible(true);
  };

  /** 控制个人实名认证弹窗显示 */
  const handlePersonalRealNameVisible = (value: boolean) => {
    setPersonalRealNameVisible(value);
  };

  /** 控制企业实名认证弹窗显示 */
  const handleCompanyRealNameVisible = (value: boolean) => {
    setCompanyRealNameVisible(value);
  };

  /** 控制弹窗密钥详情 */
  const handleApiKeyDetail = (value: Partial<ApiKeyTableType>) => {
    setApiKeyDetail(value);
  };

  /** 编辑apiKey */
  const UpdateApiKeyName = (data: { id: string; name: string }) => {
    setVisible(true);
    setApiKeyDetail(data);
  };

  /** 删除apiKey */
  const removeApiKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      message.success('删除成功');
      getList();
    } catch (error) {
      console.log(error);
      message.error('删除失败');
    }
  };

  /** 是否已实名认证状态 */
  const isRealNameStatus = useMemo(() => {
    if (RealNameSuccessStatus.includes(userInfo.verificationType)) {
      return userInfo.verificationStatus !== RealNameStatusEnum.FAILED;
    }
    return userInfo.verificationType !== RealNameTypeEnum.UNVERIFIED;
  }, [userInfo.verificationStatus, userInfo.verificationType]);

  /** 是否认证中状态 */
  const isVerifying = userInfo.verificationStatus === RealNameStatusEnum.UNDERWAY;

  /** 认证中区分个人和企业 */
  const handleIsVerifying = () => {
    if (userInfo.verificationType === RealNameTypeEnum.ENTERPRISE) {
      message.warning('您提交的实名认证正在审核中，完成认证后才可创建哦~');
      return;
    }
    message.warning('您已提交认证信息，请5分钟后重试');
  };

  /** 创建apiKey */
  const createApiKey = () => {
    if (!isRealNameStatus) {
      setRealNameVisible(true);
      return;
    }
    if (isVerifying) {
      handleIsVerifying();
      return;
    }
    if (apiKeyList?.length >= 20) {
      message.warning('无法创建，您最多可创建 20 个 API 密钥~');
      return;
    }
    setVisible(true);
  };

  const copy = async (text: string) => {
    await clipboard(text);
    message.success('复制成功');
  };

  useEffect(() => {
    getList();
  }, []);

  const columns: ColumnsType = [
    {
      title: 'API密钥名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <div className={Style.nowrap}>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: 'API密钥',
      dataIndex: 'tokenSecret',
      key: 'tokenSecret',
      render: (text: string) => (
        <div>
          <span style={{ color: '#000', marginRight: '3px' }}>{maskString(text, 10, 6)}</span>
          <span className={Style.link} onClick={() => copy(text)}>
            复制
          </span>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: col => <span>{formatTime(col)}</span>,
    },
    {
      title: '启用状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: StatusTypeEnum, { id }) => <Switch defaultChecked={status === StatusTypeEnum.ENABLED} onChange={() => onChangeStatus(id, status)} />,
    },
    {
      title: '操作',
      render: (_, { id, name, status }) => (
        <div className={Style.options}>
          <Button type="link" icon={<IconFont size={16} icon="icon_edit" />} style={{ padding: 0 }} onClick={() => UpdateApiKeyName({ id, name })}>
            编辑
          </Button>
          <Popconfirm title="删除apiKey" description="确认删除该apiKey吗？" okText="确认" cancelText="取消" onConfirm={() => removeApiKey(id)}>
            <Button disabled={StatusTypeEnum.ENABLED === status} type="link" icon={<IconFont size={16} icon="icon_delete" />}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const renderAlert = (
    <div className={Style['alert-content']}>
      账号尚未完成实名认证，创建服务及调用服务等行为前，需先实名认证，请前往
      <div className={Style.btn} onClick={() => setRealNameVisible(true)}>
        实名认证
      </div>
    </div>
  );

  return (
    <ConfigProvider theme={theme}>
      <div className={Style['api-container']}>
        <div className={Style.header}>
          <div className={Style.content}>
            <div className={Style.title}>API密钥</div>
            <div className={Style.tip}>请妥善保管您的API密钥，您最多可创建20个API密钥。</div>
          </div>
          {isRealNameStatus && (
            <div className={Style['create-btn']} onClick={createApiKey}>
              <div className={Style.add}>+</div>
              创建API密钥
            </div>
          )}
        </div>
        {!isRealNameStatus && (
          <div className={Style['api-container-alert']}>
            <Alert message={renderAlert} icon={<IconFont size={16} icon="icon_center" />} type="info" showIcon />
          </div>
        )}

        <div className={Style['api-container-table']}>
          <TheTable
            loading={loading}
            columns={columns}
            dataSource={apiKeyList}
            style={{ borderRadius: 12 }}
            rowKey={record => record.id}
            pagination={false}
            locale={{
              emptyText: (
                <Empty
                  className={Style.empty}
                  image={StaticResources.EMPTY}
                  styles={{
                    image: { height: 86, width: 86 },
                  }}
                  description="你还没有创建过API密钥 🤔"
                >
                  <div className={Style['create-btn']} style={{ marginTop: 15 }} onClick={createApiKey}>
                    <div className={Style.add}>+</div>
                    创建API密钥
                  </div>
                </Empty>
              ),
            }}
          />
        </div>
      </div>
      {visible && (
        <CreateApiKeyModal
          apiKeyDetail={apiKeyDetail}
          onChangeApiKeyDetail={handleApiKeyDetail}
          visible={visible}
          onChangeVisible={handleVisible}
          onRefresh={getList}
        />
      )}
      <RealNameModal visible={realNameVisible} onChangeVisible={handleRealNameVisible} />
      {personalRealNameVisible && <PersonalRealNameModal visible={personalRealNameVisible} onChangeVisible={handlePersonalRealNameVisible} />}
      {companyRealNameVisible && <CompanyRealNameModal visible={companyRealNameVisible} onChangeVisible={handleCompanyRealNameVisible} />}
    </ConfigProvider>
  );
}

export default observer(ApiKeyCpn);
