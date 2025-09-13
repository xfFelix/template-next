import React from 'react';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import Style from './SliderList.module.scss';
import { SliderOptions } from '@/constants/Slider';
import { useStores } from '@/stores';
import IconFont from '@/components/IconFont';

function SliderList() {
  const { sliderInfo } = useStores();
  const router = useRouter();
  const changeActiveKey = (key?: string) => {
    if (!key) return;
    router.push(key);
    sliderInfo.updateActiveKey(key);
  };

  /** 跳转到文档中心 */
  const handleDocClick = () => {
    window.open('https://openapi-doc.shanjian.tv/');
  };

  return (
    <div className={Style['slider-list']}>
      <div className={Style.list}>
        {SliderOptions.map(item => (
          <div
            key={item.key}
            className={cls(Style.item, {
              [Style.active]: item.key === sliderInfo.activeKey,
              [Style.divider]: !item.key,
            })}
            onClick={() => changeActiveKey(item.key)}
          >
            {item.key && <IconFont size={24} icon={item.icon as string} />}
            {item.title}
          </div>
        ))}
      </div>
      <div className={Style.docBtnBox}>
        <div className={Style.docBtn} onClick={handleDocClick}>
          <IconFont size={24} icon="icon_document" />
          <div>文档中心</div>
        </div>
      </div>
    </div>
  );
}

export default observer(SliderList);
