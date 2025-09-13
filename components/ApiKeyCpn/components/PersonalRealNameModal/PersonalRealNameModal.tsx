import { Checkbox, ConfigProvider, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import cls from 'classnames';
import Style from './PersonalRealNameModal.module.scss';
import { realNamePersonal } from '@/api/realName';
import { useStores } from '@/stores';
import { REAL_NAME_ID } from '@/constants/StorageKey';
import { CheckBoxTheme, InputTheme } from '@/constants/Theme';
import CustomModal from '@/components/CustomModal';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import { realNameMessage } from '@/helpers/realNameStatus';

export interface PersonalRealNameModalProps {
  visible: boolean;
  onChangeVisible: (visible: boolean) => void;
}

const theme = {
  components: {
    Modal: {
      borderRadiusLG: 12,
    },
    Form: {
      labelHeight: 40,
    },
    Input: InputTheme,
    Checkbox: CheckBoxTheme,
  },
};

function PersonalRealNameModal(props: PersonalRealNameModalProps) {
  const { userInfo } = useStores();
  const { visible, onChangeVisible } = props;

  const [form] = Form.useForm();

  const pollInterval = useRef<NodeJS.Timeout | null>(null);

  /** 判断是否已经点击过认证 */
  const [isClickCheck, setIsClickCheck] = useState(false);

  /** 关闭弹窗 */
  const handleCancel = async () => {
    const ISSERVER = typeof window === 'undefined';
    await userInfo.getRealNameStatus();
    if (!ISSERVER && isClickCheck) {
      realNameMessage(userInfo);
    }
    onChangeVisible(false);
    setIsClickCheck(false);
    form.resetFields();
  };

  /** 确认实名认证 */
  const createApiKey = async () => {
    const value = await form.validateFields();
    const ISSERVER = typeof window === 'undefined';
    if (!ISSERVER) {
      const { readAgreement, ...data } = value;
      const res = await realNamePersonal(data);
      if (res.data.serviceCode) {
        message.error(res.data.serviceMsg);
        return;
      }
      localStorage.setItem(
        `${REAL_NAME_ID}${userInfo.accountNo}`,
        REAL_NAME_ID
      );
      setIsClickCheck(true);
      window.open(res.data.h5faceUrl);
    }
  };

  useEffect(
    () => () => {
      pollInterval.current && clearInterval(pollInterval.current);
    },
    []
  );

  const renderForm = () => (
    <Form autoComplete="off" form={form} className={Style.form}>
      <div className={Style.desc}>
        我们将严格遵守相关法律法规，保护您的个人信息
      </div>

      <Form.Item
        label={<div className={Style['form-label']}>真实姓名</div>}
        name="realName"
        required
        colon={false}
        rules={[{ required: true, message: '请输入身份证姓名' }]}
      >
        <Input placeholder="请输入身份证姓名" className={Style.text} />
      </Form.Item>
      <Form.Item
        label={<div className={Style['form-label']}>身份证号</div>}
        name="idNumber"
        required
        colon={false}
        rules={[
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(new Error('请输入身份证号码'));
              }
              if (
                !/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(
                  value
                )
              ) {
                return Promise.reject(new Error('请输入正确的18位身份证号码'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input
          maxLength={18}
          placeholder="请输入身份证号码"
          className={Style.text}
        />
      </Form.Item>

      <Form.Item label={null}>
        <div className={Style.btnBox}>
          <CustomButton
            type={ButtonType.BLACK}
            className={Style['confirm-btn']}
            onClick={createApiKey}
          >
            确定
          </CustomButton>
        </div>
      </Form.Item>
      <Form.Item
        className={cls('check-tip-from-error')}
        style={{ marginBottom: 0 }}
        name="readAgreement"
        valuePropName="checked"
        label={null}
        required
        rules={[
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(new Error('请先同意协议'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Checkbox className={Style.checkbox}>
          <span className={Style.agreementCheckbox}>
            您理解并同意 闪剪AI开放平台 有权自行或委托第三方，审查您
            在实名认证时提供的信息是否真实、准确及有效。若提供虚假信息，由此带来的全部结果由您承担。
          </span>
        </Checkbox>
      </Form.Item>
    </Form>
  );

  const renderCheck = () => (
    <div className={Style.check}>
      <div className={Style.text}>您已提交个人信息</div>
      <CustomButton
        type={ButtonType.BLACK}
        className={Style['check-btn']}
        onClick={handleCancel}
      >
        已完成人脸校验
      </CustomButton>
    </div>
  );

  const renderContent = () => (isClickCheck ? renderCheck() : renderForm());

  return (
    <ConfigProvider theme={theme}>
      <CustomModal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        styles={{
          content: { width: isClickCheck ? '340px' : '440px' },
        }}
      >
        <div className={Style['personal-real-name-modal']}>
          <div className={Style.title}>个人实名认证</div>
          {renderContent()}
        </div>
      </CustomModal>
    </ConfigProvider>
  );
}
export default observer(PersonalRealNameModal);
