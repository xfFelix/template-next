import { UserInfoResponse } from './UserInfo';

/** 图形验证码 */
export interface ICaptchaResult {
  /** 验证结果，0：验证成功。2：用户主动关闭验证码。 */
  ret: number;
  /** 验证成功的票据，当且仅当 ret = 0 时 ticket 有值。 */
  ticket: string;
  /** 本次验证的随机串，后续票据校验时需传递该参数。 */
  randstr: string;
  /** 验证码应用ID。 */
  CaptchaAppId?: string;
  /** 自定义透传参数。 */
  bizState?: string;
  errorCode?: number;
  errorMessage?: string;
}

/** 获取验证码接口参数 */
export interface SmsCodeParam {
  /** 手机号码 */
  mobileNumber: string;
  captchaTicket?: string;
  captchaRandstr?: string;
  type: string;
}

/** 登录接口参数 */
export interface LoginParam {
  /** 手机号码 */
  mobileNumber: string;
  /** 验证码 */
  code: number;
}

/** 登录响应 */
export interface LoginResponse {
  token: string;
}

/** 获取验证码加密后的captchaAppId */
export interface EncryptedAppIdResponse {
  encryptedAppId: string;
}

/** 授权登录返回参数 */
export interface AuthLoginResponse extends UserInfoResponse {
  token: string;
  error: number;
  message: string;
}
