import { Checkbox, ConfigProvider, Form, Input, message } from 'antd';
import React from 'react';
import cls from 'classnames';
import Addres from '@/constants/Address.json';
import Style from './CompanyRealNameModal.module.scss';
import StaticResources from '@/assets/ApiKey';
import AgreementLink from '@/components/AgreementLink';
import { realNameCompany } from '@/api/realName';
import { REAL_NAME_ID } from '@/constants/StorageKey';
import CustomModal from '@/components/CustomModal';
import CustomUpload from '@/components/CustomUpload';
import { useStores } from '@/stores';
import { CheckBoxTheme, InputTheme } from '@/constants/Theme';
import IconFont from '@/components/IconFont';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import TheCascader from '@/common/TheCascader';
import TheFormTheme from '@/common/TheFormTheme';
import Image from 'next/image';

export interface CompanyRealNameModalProps {
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
    Input: {
      ...InputTheme,
      paddingBlock: 10,
      placeholderColor: '#9599A0',
    },
    Checkbox: CheckBoxTheme,
  },
};

export default function CompanyRealNameModal(props: CompanyRealNameModalProps) {
  const { visible, onChangeVisible } = props;
  const { userInfo } = useStores();
  const [form] = Form.useForm();

  /** 关闭弹窗 */
  const handleCancel = () => {
    onChangeVisible(false);
    form.resetFields();
  };

  /** 确认实名认证 */
  const confirmRealName = async () => {
    const value = await form.validateFields();
    const { readAgreement: _a, province: address, ...data } = value;
    const newData = {
      ...data,
      province: address[0],
      city: address[1],
    };
    await realNameCompany(newData);
    const ISSERVER = typeof window === 'undefined';
    if (!ISSERVER) {
      localStorage.setItem(
        `${REAL_NAME_ID}${userInfo.accountNo}`,
        REAL_NAME_ID
      );
    }
    await userInfo.getRealNameStatus();
    message.success('认证信息已提交，1-3天内会有审核结果');
    handleCancel();
  };

  return (
    <ConfigProvider theme={theme}>
      <CustomModal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={visible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
        styles={{
          content: { width: '630px' },
        }}
      >
        <div className={Style['company-real-name-modal']}>
          <TheFormTheme>
            <Form
              autoComplete="off"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 13 }}
            >
              <div className={Style.listForm}>
                <div className={Style.title}>企业实名认证</div>
                <Form.Item
                  label="企业名称"
                  name="companyName"
                  required
                  colon={false}
                  rules={[{ required: true, message: '请输入企业名称' }]}
                >
                  <Input
                    placeholder="请输入企业名称"
                    className={Style.text}
                    maxLength={50}
                  />
                </Form.Item>
                <Form.Item
                  label="社会信用代码"
                  name="creditCode"
                  required
                  colon={false}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            new Error('请输入社会信用代码')
                          );
                        }
                        if (!/^[0-9A-Z]{18}$/.test(value)) {
                          return Promise.reject(
                            new Error('请输入正确的社会信用代码')
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入社会信用代码"
                    className={Style.text}
                    maxLength={18}
                  />
                </Form.Item>
                <Form.Item
                  label="营业执照"
                  extra={
                    <div className={Style.extra}>
                      请上传最新营业执照，JPG或PNG格式，大小不超过5M
                    </div>
                  }
                  name="businessLicenseUrl"
                  colon={false}
                  required
                  rules={[
                    {
                      required: true,
                      message: '请上传营业执照',
                    },
                  ]}
                  style={{ textAlign: 'left' }}
                >
                  <CustomUpload
                    className="upload"
                    size={5}
                    style={{ width: '140px', height: '96px' }}
                  >
                    <div className={Style.licenseUpload}>
                      <IconFont size={20} icon="icon_add" color="#000" />
                      <span className={Style.desc}>上传</span>
                    </div>
                  </CustomUpload>
                </Form.Item>
                <Form.Item
                  label="所在地"
                  name="province"
                  rules={[{ required: true, message: '请选择所在地' }]}
                  colon={false}
                >
                  <TheCascader
                    style={{ width: 200 }}
                    className={cls(Style.text)}
                    fieldNames={{ label: 'name', value: 'name' }}
                    options={Addres}
                    placeholder="请选择省份/城市"
                  />
                </Form.Item>
                <Form.Item label="详细地址" name="addressDetail" colon={false}>
                  <Input.TextArea
                    placeholder="请输入详细地址"
                    className={Style.text}
                    style={{ minHeight: 110 }}
                  />
                </Form.Item>
                <Form.Item
                  label="企业法定代表人姓名"
                  name="legalPersonName"
                  required
                  colon={false}
                  rules={[
                    { required: true, message: '请填写企业法定代表人姓名' },
                  ]}
                >
                  <Input
                    placeholder="请填写企业法定代表人姓名"
                    className={Style.text}
                    maxLength={20}
                  />
                </Form.Item>
                <Form.Item
                  label="企业法定代表人身份证"
                  name="legalPersonIdNumber"
                  required
                  colon={false}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(
                            new Error('请输入18位二代身份证号码')
                          );
                        }
                        if (
                          !/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/.test(
                            value
                          )
                        ) {
                          return Promise.reject(
                            new Error('请输入正确的18位二代身份证号码')
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="请填写法定代表人18位二代身份证号码"
                    className={Style.text}
                    maxLength={18}
                  />
                </Form.Item>
                <Form.Item
                  label="法定代表人身份证上传"
                  colon={false}
                  required
                  rules={[
                    {
                      required: true,
                      message: '请上传法定代表人身份证',
                    },
                  ]}
                >
                  <div style={{ display: 'flex', height: '96px' }}>
                    <Form.Item
                      name="legalPersonIdFrontUrl"
                      colon={false}
                      rules={[
                        {
                          required: true,
                          message: '请上传法定代表人正面身份证',
                        },
                      ]}
                      style={{
                        textAlign: 'left',
                        width: '140px',
                        marginRight: 12,
                      }}
                    >
                      <CustomUpload
                        size={5}
                        className="legalPerson"
                        style={{ width: '140px', height: '96px' }}
                      >
                        <div className={Style.customUpload}>
                          <Image src={StaticResources.EMBLEM} alt="" />
                          <div className={Style['customUpload-box']}>
                            <IconFont size={20} icon="icon_add" color="#000" />
                            <span className={Style['customUpload-box-des']}>
                              身份证人像面
                            </span>
                          </div>
                        </div>
                      </CustomUpload>
                    </Form.Item>
                    <Form.Item
                      name="legalPersonIdBackUrl"
                      colon={false}
                      rules={[
                        {
                          required: true,
                          message: '请上传法定代表人反面身份证',
                        },
                      ]}
                      style={{ textAlign: 'left' }}
                    >
                      <CustomUpload
                        size={5}
                        className="legalPerson"
                        style={{ width: '140px', height: '96px' }}
                      >
                        <div className={Style.customUpload}>
                          <Image src={StaticResources.EMBLEM_BACK} alt="" />
                          <div className={Style['customUpload-box']}>
                            <IconFont size={20} icon="icon_add" color="#000" />
                            <span className={Style['customUpload-box-des']}>
                              身份证国徽面
                            </span>
                          </div>
                        </div>
                      </CustomUpload>
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item
                  label="企业联系人手机号"
                  name="contactMobile"
                  required
                  colon={false}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error('请输入手机号'));
                        }
                        if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
                          return Promise.reject(
                            new Error('请输入正确的手机号')
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="请填入企业联系人手机号"
                    className={Style.text}
                    maxLength={11}
                    prefix={<div className={Style.prefix}>+86</div>}
                  />
                </Form.Item>
              </div>
              <Form.Item
                label={null}
                style={{
                  margin: '5px auto 20px',
                  width: '360px',
                }}
                wrapperCol={{ span: 24 }}
              >
                <div className={Style.btnBox}>
                  <CustomButton
                    type={ButtonType.BLACK}
                    className={Style['confirm-btn']}
                    onClick={confirmRealName}
                  >
                    确定
                  </CustomButton>
                </div>
              </Form.Item>
              <Form.Item
                className={cls('check-tip-from-error')}
                style={{
                  margin: '0 auto ',
                  width: '360px',
                  textAlign: 'center',
                }}
                wrapperCol={{ span: 24 }}
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
                    <span>
                      已阅读并同意
                      <AgreementLink
                        url="https://static.shanjian.tv/shanjian/openapi_realname_authentication.html"
                        desc="《闪剪AI开放平台实名认证协议》"
                        fontSize={12}
                      />
                    </span>
                  </span>
                </Checkbox>
              </Form.Item>
            </Form>
          </TheFormTheme>
        </div>
      </CustomModal>
    </ConfigProvider>
  );
}
