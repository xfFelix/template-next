import { ConfigProvider, Form, Input, message } from 'antd';
import React from 'react';
import cls from 'classnames';
import Style from './CreateApiKeyModal.module.scss';
import { ApiKeyTableType } from '@/types/ApiKey';
import { createApiKey, updateApiKey } from '@/api/apiKey';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import { InputTheme } from '@/constants/Theme';

export interface CreateApiKeyModalProps {
  visible: boolean;
  apiKeyDetail: Partial<ApiKeyTableType>;
  onChangeVisible: (visible: boolean) => void;
  onChangeApiKeyDetail: (apiKeyDetail: Partial<ApiKeyTableType>) => void;
  onRefresh: () => void;
}

const theme = {
  components: {
    Modal: {
      borderRadiusLG: 12,
    },
    Input: InputTheme,
  },
};

export default function CreateApiKeyModal(props: CreateApiKeyModalProps) {
  const { visible, onChangeVisible, apiKeyDetail, onChangeApiKeyDetail, onRefresh } = props;

  const title = apiKeyDetail?.name ? '编辑API密钥' : '创建API密钥';
  const [form] = Form.useForm();

  /** 关闭弹窗 */
  const handleCancel = () => {
    onChangeVisible(false);
    onChangeApiKeyDetail({});
    form.resetFields();
  };

  /** 确认生成编辑ApiKey */
  const handleApiKey = async () => {
    const value = await form.validateFields();
    console.log(value);
    if (apiKeyDetail?.id) {
      await updateApiKey(apiKeyDetail.id, { name: value.name });
      handleCancel();
      message.success('编辑成功');
      onRefresh();
      return;
    }
    await createApiKey({ name: value.name });
    message.success('创建成功');
    onRefresh();
    handleCancel();
  };

  return (
    <ConfigProvider theme={theme}>
      <CustomModal closable={{ 'aria-label': 'Custom Close Button' }} open={visible} onCancel={handleCancel} footer={null} maskClosable={false}>
        <div className={Style['create-api-key-modal']}>
          <Form autoComplete="off" form={form} initialValues={apiKeyDetail}>
            <div className={Style.title}>{title}</div>
            <div className={Style.desc}>为您的 API密钥 命名，方便管理和区分~</div>

            <Form.Item name="name" required rules={[{ required: true, message: '请输入API密钥名称' }]}>
              <Input placeholder="请输入API密钥名称" className={Style.text} maxLength={50} showCount />
            </Form.Item>

            <Form.Item label={null} style={{ marginBottom: 0 }}>
              <div className={Style.btnBox}>
                <CustomButton type={ButtonType.LINE} className={cls(Style['common-btn'])} onClick={handleCancel}>
                  取消
                </CustomButton>
                <CustomButton type={ButtonType.BLACK} className={cls(Style['common-btn'])} onClick={handleApiKey}>
                  确定
                </CustomButton>
              </div>
            </Form.Item>
          </Form>
        </div>
      </CustomModal>
    </ConfigProvider>
  );
}
