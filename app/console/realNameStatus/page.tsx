'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Style from './page.module.scss';
import StatusImgs from '@/assets/RealName';
import Image from 'next/image';

export default function RealNameStatus() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const renderError = () => (
    <div className={Style.common}>
      <Image src={StatusImgs.personalFailed} alt="error" />
      <div className={Style.title}>实名认证失败</div>
      <div className={Style.desc}>
        请核对信息后在【闪剪 AI 开放平台】重新提交认证~
      </div>
    </div>
  );
  const renderSuccess = () => (
    <div className={Style.common}>
      <Image src={StatusImgs.personalSuccess} alt="success" />
      <div className={Style.title}>实名认证成功</div>
      <div className={Style.desc}>
        您可以返回【闪剪 AI 开放平台】开始创建API密钥了~
      </div>
    </div>
  );

  const renderContent = () => {
    if (!code) return null;
    return code === '0' ? renderSuccess() : renderError();
  };
  return (
    <div className={Style['real-name-status-container']}>{renderContent()}</div>
  );
}
