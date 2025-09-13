'use client';

import { ConfigProvider, Form, Input, message, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounceFn } from 'ahooks';
import AgreementLink from '../AgreementLink';
import Style from './LoginForm.module.scss';
import useGetState from '@/hooks/useGetState';
import { SliderValueEnum } from '@/constants/Slider';
import { CaptchaAppId } from '@/constants/TencentCaptcha';
import { ICaptchaResult, LoginParam } from '@/types/Login';
import { authLogin, getEncryptedAppId, getSmsCode, login } from '@/api/login';
import { getCookie, setToken } from '@/utils/login';
import CustomButton from '../CustomButton';
import ButtonType from '@/constants/enum/ButtonType';

/** 验证码sdk地址 */
const TJCaptchaUrl = 'https://bhb-frontend.bhbcdn.com/static/files/mtv/files/TJCaptcha.js';

const { Link } = Typography;
const theme = {
  components: {
    Form: {
      itemMarginBottom: 16,
    },
    Input: {
      activeBorderColor: '#000',
      hoverBorderColor: '#000',
      activeShadow: 'transparent',
      borderRadius: 8,
    },

    Typography: {
      colorTextDisabled: 'rgba(65, 131, 237, 50%)',
      colorLink: 'rgba(65, 131, 237, 1)',
      colorLinkHover: 'rgba(45, 114, 232, 1)',
      colorLinkActive: 'rgba(26, 98, 211, 1)',
    },
  },
};

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm<LoginParam>();
  const [isShowPowerBtn, setIsShowPowerBtn] = useState(false);
  const [powerToken, setPowerToken] = useState('');
  /** 验证码是否在发送中 */
  const [isSendIng, setIsSendIng] = useState(false);
  /** 手机号校验是否通过 */
  const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
  const [, setMs, getMs] = useGetState(60);
  const timer = useRef<NodeJS.Timeout>(null);

  /** 加载外部js文件，这里主要加载图形校验 */
  const loadScript = () => {
    const script = document.createElement('script');
    script.src = TJCaptchaUrl;
    script.async = true;
    script.onload = () => {
      console.log(`${TJCaptchaUrl} 加载完成`);
      // 脚本加载后的回调逻辑
    };
    script.onerror = () => {
      console.error(`${TJCaptchaUrl} 加载失败`);
    };
    document.body.appendChild(script);
  };

  /** 倒计时 */
  const countdown = () => {
    timer.current = setInterval(() => {
      setMs(getMs() - 1);
      if (getMs() <= 0) {
        timer.current && clearTimeout(timer.current);
        setIsSendIng(false);
        setMs(60);
      }
    }, 1000);
  };

  // /** 获取验证码 */
  const handleSendCode = async (captchaTicket?: string, captchaRandstr?: string) => {
    try {
      // 校验手机号
      const value = await form.validateFields(['mobileNumber']);
      const data = {
        mobileNumber: value.mobileNumber,
        captchaTicket,
        captchaRandstr,
        type: 'login',
      };
      await getSmsCode(data);
      setIsSendIng(true);
      setMs(60);
      countdown();
    } catch (err) {
      console.log(err);
      message.error('验证码发送失败');
      setIsMobileNumberValid(false);
    }
  };

  /**
   * 图形验证回调函数
   */
  const CaptchaCallback = (res: ICaptchaResult) => {
    if (res.ret === 0) {
      handleSendCode(res.ticket, res.randstr);
    }
  };

  /** 显示图形码 */
  const onCaptchaShow = async () => {
    try {
      const { data } = await getEncryptedAppId();
      // @ts-expect-error 忽略类型检查警告
      const captcha = new window.TencentCaptcha(CaptchaAppId, CaptchaCallback, {
        aidEncrypted: data.encryptedAppId,
      });

      // 调用方法，显示验证码
      captcha.show();
    } catch (err) {
      console.log(err);
      // 加载异常，调用验证码js加载错误处理函数
      setIsMobileNumberValid(false);
      message.error('验证码加载失败，请刷新页面重试');
    }
  };

  /** 获取验证码 */
  const getCode = async () => {
    try {
      // 校验手机号
      await form.validateFields(['mobileNumber']);
      /** 先进行图形验证码 */
      onCaptchaShow();
    } catch (err) {
      console.log(err);
    }
  };

  /** 登录/注册 */
  const sign = async () => {
    try {
      const data = await form.validateFields();
      const res = await login(data);
      setToken(res.data.token);
      router.push(SliderValueEnum.ACCOUNT);
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (!error.message) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      message.error(error.message);
    }
  };

  /** 授权登录 */
  const handleAuthLogin = async () => {
    try {
      const res = await authLogin({
        token: powerToken,
      });
      setToken(res.data.token);
      message.success('登录成功');
      router.push(SliderValueEnum.ACCOUNT);
    } catch (error) {
      console.log(error);
      message.error('授权失败,请稍后重试');
    }
  };

  /** 监听手机号状态 */
  const watchMobileNumber = async () => {
    try {
      await form.validateFields(['mobileNumber']);
      setIsMobileNumberValid(false);
    } catch (error) {
      setIsMobileNumberValid(true);
      console.log(error);
    }
  };

  const { run } = useDebounceFn(
    () => {
      watchMobileNumber();
    },
    {
      wait: 500,
    }
  );

  /** 清理状态 */
  const clear = () => {
    timer.current && clearInterval(timer.current);
    setIsSendIng(false);
    setMs(60);
    setPowerToken('');
    setIsShowPowerBtn(false);
    setIsMobileNumberValid(true);
  };

  useEffect(() => {
    loadScript();
    const token = getCookie('token');
    if (token) {
      setPowerToken(token);
      setIsShowPowerBtn(true);
    }
    return () => {
      clear();
    };
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Form autoComplete="off" form={form} className={Style.form}>
        <Form.Item
          name="mobileNumber"
          required
          style={{ paddingBottom: '8px', marginBottom: '8px' }}
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('请输入手机号'));
                }
                if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
                  return Promise.reject(new Error('请输入正确的手机号'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input maxLength={11} onChange={run} style={{ width: 318, height: 48 }} placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          required
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('请输入验证码'));
                }
                if (String(value).length !== 6) {
                  return Promise.reject(new Error('请输入6位验证码'));
                }
                return Promise.resolve();
              },
            },
          ]}
          name="code"
        >
          <Input
            style={{ width: 318, height: 48 }}
            placeholder="请输入验证码"
            maxLength={6}
            suffix={
              <Link onClick={getCode} disabled={isSendIng || isMobileNumberValid}>
                {!isSendIng ? '发送验证码' : `重新发送(${getMs()})`}
              </Link>
            }
          />
        </Form.Item>
        <Form.Item label={null} style={{ margin: '54px 0 14px' }}>
          <div className={Style.agreement}>
            登录注册即代表已阅读并同意我们的
            <AgreementLink url="https://static.shanjian.tv/shanjian/openapi_user_agreement.html" desc="用户协议" fontSize={13} />
            及
            <AgreementLink url="https://static.shanjian.tv/shanjian/openapi_privacy_policy.html" desc="隐私政策" fontSize={13} />
          </div>
        </Form.Item>
        <Form.Item label={null}>
          <CustomButton type={ButtonType.BLACK} className={Style.btn} onClick={sign}>
            登录 <span>/</span> 注册
          </CustomButton>
        </Form.Item>
        {isShowPowerBtn && (
          <Form.Item label={null}>
            <CustomButton type={ButtonType.LINE} className={Style['btn-auth']} onClick={handleAuthLogin}>
              使用 闪剪AI 账号登录
            </CustomButton>
          </Form.Item>
        )}
      </Form>
    </ConfigProvider>
  );
}
