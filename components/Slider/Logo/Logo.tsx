import StaticResources from '@/assets/Login';
import Style from './Logo.module.scss';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className={Style.logo}>
      <Image className={Style.logoImg} src={StaticResources.logo} alt="logo" />
      <div className={Style.divide} />
      <div className={Style.text}>开放平台</div>
    </div>
  );
}
