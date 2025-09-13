import { ConfigProvider, Form, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { DefaultOptionType } from 'antd/es/select';
import styles from './ApplyInvoiceModal.module.scss';
import CustomModal from '@/components/CustomModal';
import { ApplyInvoiceModalProps, InvoiceData } from './interface';
import { TitleTypeList } from './const';
import { formatAmount } from '@/utils/formatAmount';
import TheFormTheme from '@/common/TheFormTheme';
import { isIdCard } from '@/utils/is';
import TheButton from '@/common/TheButton';
import { getCompany, getCompanyList } from '@/api/invoice';
import TheSelect from '@/common/TheSelect';
import TheRadioGroup from '@/common/TheRadioGroup';

const theme = {
  components: {
    Modal: {
      borderRadiusLG: 12,
    },
  },
};

export default function ApplyInvoiceModal(props: ApplyInvoiceModalProps) {
  const { visible, amount, onClose, onConfirm } = props;
  const [form] = Form.useForm<InvoiceData>();
  const titleType = Form.useWatch('titleType', form);
  const [companies, setCompanies] = useState<Invoice.Company[]>([]);
  const companyName = useRef('');

  useEffect(() => {
    if (!visible) {
      form?.resetFields();
    } else {
      form?.setFieldValue('amount', formatAmount(amount, { prefix: '¥ ' }));
    }
  }, [visible, amount]);

  /**
   * @name 提交
   * @returns
   */
  const handleConfirm = async () => {
    const value = await form.validateFields();
    onConfirm?.({ ...value, companyName: companyName.current });
  };

  const { run: handleSearch } = useDebounceFn(
    async (value: string) => {
      const { data } = await getCompanyList(value);
      setCompanies(data.results);
    },
    {
      wait: 300,
    }
  );

  async function handleCompanyChange(value: string, option: DefaultOptionType | DefaultOptionType | [] | undefined) {
    const { data } = await getCompany(value);
    form.setFieldValue('taxNumber', data.taxNo);
    companyName.current = data.name || ((option as DefaultOptionType).label as string);
  }

  return (
    <ConfigProvider theme={theme}>
      <CustomModal closable={{ 'aria-label': 'Custom Close Button' }} open={visible} onCancel={onClose} footer={null} maskClosable={false}>
        <div className={styles['apply-invoice-modal']}>
          <div className={styles.title}>申请开票</div>
          <TheFormTheme className={styles['form-container']}>
            <Form
              requiredMark={false}
              labelCol={{ span: 5 }}
              colon={false}
              autoComplete="off"
              form={form}
              size="large"
              initialValues={{ titleType: 'personal' }}
            >
              <Form.Item name="amount" label="开票金额" rules={[{ required: true, message: '请输入开票金额' }]}>
                <Input disabled />
              </Form.Item>
              <Form.Item label="抬头类型" name="titleType" rules={[{ required: true, message: '请选择抬头类型' }]}>
                <TheRadioGroup options={TitleTypeList} />
              </Form.Item>
              {titleType === 'personal' ? (
                <>
                  <Form.Item name="personalName" label="个人姓名" rules={[{ required: true, message: '请输入您的个人姓名' }]}>
                    <Input placeholder="请输入您的个人姓名" />
                  </Form.Item>
                  <Form.Item
                    name="idNumber"
                    label="身份证号"
                    rules={[
                      { required: true, message: '请输入18位身份证号' },
                      () => ({
                        validator(_, value) {
                          if (!value || isIdCard(value)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('请输入正确的身份证'));
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="请输入18位身份证号" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="companyCode" label="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
                    <TheSelect
                      showSearch
                      placeholder="请输入企业名称"
                      defaultActiveFirstOption={false}
                      suffixIcon={null}
                      filterOption={false}
                      notFoundContent={null}
                      onSearch={handleSearch}
                      options={companies.map(item => ({
                        label: item.name,
                        value: item.code,
                      }))}
                      onChange={handleCompanyChange}
                    />
                  </Form.Item>
                  <Form.Item name="taxNumber" label="税号" rules={[{ required: true, message: '请输入企业税号' }]}>
                    <Input placeholder="请输入企业税号" />
                  </Form.Item>
                </>
              )}

              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入接收邮箱' },
                  { type: 'email', message: '请输入正确的邮箱' },
                ]}
              >
                <Input placeholder="请输入接收邮箱" />
              </Form.Item>
            </Form>
          </TheFormTheme>
          <TheButton className={styles['btn-confirm']} onClick={handleConfirm}>
            确认开票
          </TheButton>
        </div>
      </CustomModal>
    </ConfigProvider>
  );
}
