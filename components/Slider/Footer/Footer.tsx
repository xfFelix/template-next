import React from 'react';
import { ConfigProvider, message, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react';
import Style from './Footer.module.scss';
import staticRealNameResource from '@/assets/RealName';
import StaticSliderResources from '@/assets/Slider';
import clipboard from '@/utils/clipboard';
import { logout } from '@/utils/login';
import { maskString } from '@/utils/formatStr';
import { useStores } from '@/stores';
import { STATUS_MAP } from '@/constants/ApiKey';
import IconFont from '@/components/IconFont';
import UserInfoImgs from '@/assets/UserInfo';
import Image from 'next/image';

const theme = {
  components: {
    Tooltip: {
      colorBgSpotlight: '#fff',
    },
  },
};

function Footer() {
  const router = useRouter();
  const { userInfo } = useStores();

  /** 退出登录 */
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const copy = async (text: string) => {
    await clipboard(text);
    message.success('已复制您的用户ID');
  };

  const renderRealNameStatus = () => STATUS_MAP[userInfo.verificationStatus]?.[userInfo.verificationType] || staticRealNameResource.unVerify;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'rgba(245, 246, 250, 1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'transparent';
  };

  /** 渲染hover提示内容 */
  const renderTooltipContent = () => (
    <div
      style={{
        padding: '10px 0 0',
        color: '#000',
        fontSize: '14px',
        fontWeight: '500',
        width: '138px',
      }}
    >
      <div style={{ padding: '0 12px' }}>{maskString(String(userInfo?.mobileNumber), 3, 4)}</div>
      <div
        onClick={handleLogout}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          lineHeight: '20px',
          marginTop: '10px',
          cursor: 'pointer',
          padding: '7px 12px',
          borderRadius: '6px',
        }}
      >
        退出登录
        <IconFont size={20} icon="icon_quit" color="red" />
      </div>
    </div>
  );

  return (
    <ConfigProvider theme={theme}>
      <div className={Style.footer}>
        <div className={Style.content}>
          <Image className={Style.avatar} src={userInfo.avatar || UserInfoImgs.defaultAvatar} alt="avatar" />
          <div className={Style.descBox}>
            <div className={Style.title}>{userInfo.id && <Image src={renderRealNameStatus()} alt="" />}</div>
            <div className={Style.text}>
              ID:
              {userInfo.accountNo}
              <Image
                onClick={() => {
                  copy(userInfo.accountNo);
                }}
                className={Style.copyIcon}
                src={StaticSliderResources.copyIcon}
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div className={Style.info}>
          <Tooltip placement="topLeft" title={renderTooltipContent()}>
            <Image src={StaticSliderResources.pointIcon} alt="" />
          </Tooltip>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default observer(Footer);
