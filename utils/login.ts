import { userInfo } from '@/stores';
import Storage from './storage';
import { TOKEN } from '@/constants/StorageKey';

/**
 * @name getToken
 * @returns string
 * @description 获取token
 */
export function getToken() {
  const storage = new Storage();
  const token = storage.get<string>(TOKEN);
  return token;
}

/**
 * @name setToken
 * @param token string
 * @description 设置token
 */
export function setToken(token: string, expiredTime?: number): void {
  const storage = new Storage();
  storage.set(TOKEN, token, expiredTime);
}

/**
 * @name removeToken
 * @description 删除token
 */
export function removeToken(): void {
  const storage = new Storage();
  storage.remove(TOKEN);
}

/**
 * 移除token
 *  */
export function logout() {
  const storage = new Storage();
  storage.remove(TOKEN);
  userInfo.clear();
}

/**
 * 获取cookie
 * @param name cookie名称
 * @returns cookie值
 */
export function getCookie(name: string): string | null {
  const ISSERVER = typeof window === 'undefined';
  if (ISSERVER) return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}
