import { makeAutoObservable } from 'mobx';
import { UserInfoResponse } from '@/types/UserInfo';
import { getUserInfo } from '@/api/user';
import { queryRealNameStatus } from '@/api/realName';
import { StatusTypeEnum } from '@/constants/Common';

class UserInfo {
  /** 账号ID */
  id: string = '';

  /** 唯一编号，按照规则纯数字生成 */
  accountNo: string = '';

  /**  用户昵称 */
  name: string = '';

  /** 用户头像 */
  avatar: string = '';

  /** 认证类型； */
  verificationType: string = '';

  /** 认证状态 */
  verificationStatus = '';

  /** 手机号 */
  mobileNumber: string = '';

  status: StatusTypeEnum = StatusTypeEnum.ENABLED;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.id = '';
    this.accountNo = '';
    this.name = '';
    this.avatar = '';
    this.verificationType = '';
    this.verificationStatus = '';
    this.mobileNumber = '';
    this.status = StatusTypeEnum.ENABLED;
  }

  update(data: Partial<UserInfoResponse>) {
    for (const key in data) {
      // @ts-expect-error 忽略类型检查
      this[key] = data[key];
    }
  }

  /** 更新用户信息 */
  async updateUserInfo() {
    const res = await getUserInfo();
    if (res.code === 0) {
      const { type, ...data } = res.data;
      this.update(data);
      await this.getRealNameStatus();
    }
  }

  /** 获取用户认证状态 */
  async getRealNameStatus() {
    try {
      const res = await queryRealNameStatus();
      this.verificationType = res.data.type;
      this.verificationStatus = res.data.status;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserInfo;
