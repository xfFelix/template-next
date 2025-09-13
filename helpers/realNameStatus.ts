import { message } from 'antd';
import {
  RealNameFailedStatus,
  RealNameStatusEnum,
  RealNameSuccessStatus,
  RealNameTypeEnum,
} from '@/constants/ApiKey';
import { REAL_NAME_ID } from '@/constants/StorageKey';
import UserInfo from '@/stores/UserInfo';

/** 认证消息提示 */
export const realNameMessage = (userInfo: UserInfo) => {
  if (
    RealNameSuccessStatus.includes(userInfo.verificationType) &&
    userInfo.verificationStatus === RealNameStatusEnum.SUCCESS
  ) {
    localStorage.removeItem(`${REAL_NAME_ID}${userInfo.accountNo}`);
    message.success('认证成功，您可以开始创建API 密钥了！');
  }
  if (
    userInfo.verificationType === RealNameTypeEnum.UNVERIFIED ||
    RealNameFailedStatus.includes(userInfo.verificationStatus)
  ) {
    localStorage.removeItem(`${REAL_NAME_ID}${userInfo.accountNo}`);
    message.error('认证失败，请核信息后重新进行认证！');
  }
};

/** 判断是否有在认证结果出来前关闭界面 */
export const checkRealName = (userInfo: UserInfo) => {
  const ISSERVER = typeof window === 'undefined';
  if (ISSERVER) return;
  const realNameId = localStorage.getItem(
    `${REAL_NAME_ID}${userInfo.accountNo}`
  );
  if (!realNameId) return;
  realNameMessage(userInfo);
};
