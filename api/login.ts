import service from '@/service/request';
import {
  AuthLoginResponse,
  EncryptedAppIdResponse,
  LoginParam,
  LoginResponse,
  SmsCodeParam,
} from '@/types/Login';

/** 获取验证码 */
export function getSmsCode(data: SmsCodeParam): Promise<API.CommonResponse> {
  return service.post('/v1/auth/sms/send', data);
}

/** 登录 */
export function login(
  data: LoginParam
): Promise<API.DetailResponse<LoginResponse>> {
  return service.post('/v1/auth/sms/login', data);
}

/** 授权登录 */
export function authLogin(
  data: LoginResponse
): Promise<API.DetailResponse<AuthLoginResponse>> {
  return service.post('/v1/auth/shanjian', data);
}

/**
 * 获取验证码加密后的captchaAppId
 */
export function getEncryptedAppId(): Promise<
  API.DetailResponse<EncryptedAppIdResponse>
> {
  return service.get('/v1/captcha/encryptedAppId');
}
