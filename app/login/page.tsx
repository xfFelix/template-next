import LoginForm from '@/components/LoginForm';
import Style from './page.module.scss';
import loginImgs from '@/assets/Login';
import Image from 'next/image';

export default function Login() {
  return (
    <div className={Style['login-container']}>
      <div className={Style['login-coverImg']}>
        <Image src={loginImgs.loginBg} alt="loginBg" />
      </div>
      <div className={Style['login-content']}>
        <div className={Style['login-desc']}>
          <Image src={loginImgs.logo} className={Style.logo} alt="title" />
          <div className={Style.title}>开放平台账号登录</div>
          <div className={Style['login-form']}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
