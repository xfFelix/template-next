import { useEffect, useRef, useState } from 'react';
import Style from './ConsumptionRules.module.scss';
import CreditsProductsModal from '@/components/CreditsProductsModal';
import { CreditsProductsModalRef } from '@/components/CreditsProductsModal/CreditsProductsModal';
import CustomButton from '@/components/CustomButton/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import { getCreditsConsumptionConfig } from '@/api/PurchaseResource/purchaseResource';
import IconFont from '@/components/IconFont';
import { CostItemList, VoiceCodeList } from '@/components/ConsumeDetail/const';
import { ComputeRule } from './interface';

function ConsumptionRules() {
  const productsModalRef = useRef<CreditsProductsModalRef>(null);
  const [rules, setRules] = useState<ComputeRule[]>();
  const [configName, setConfigName] = useState('');

  const showCreditsProductsModal = () => {
    productsModalRef.current?.show();
  };

  const initConfig = async () => {
    const {
      data: { configValue, configName },
    } = await getCreditsConsumptionConfig();
    setConfigName(configName);
    /** 对算力规则对象进行序列化转为数组展示 */
    const configObj = {
      ...configValue?.voiceReproduce,
      ...configValue?.videoGenerate,
      ...configValue?.figureClone,
    };
    const list = CostItemList.map(item => {
      const isVoice = VoiceCodeList.some(i => i.value === item.value);
      return isVoice ? { ...item, label: `声音克隆${item.label}模型` } : item;
    }).reduce<ComputeRule[]>((pre, cur) => {
      if (configObj?.[cur.value]?.credits) {
        const credits = configObj?.[cur.value]?.credits;
        const second = configObj?.[cur.value]?.second;
        return [...pre, { ...cur, credits, second }];
      }
      return pre;
    }, []);
    setRules(list);
  };

  useEffect(() => {
    initConfig();
  }, []);

  return (
    <div className={Style['consumption-rule']}>
      <CreditsProductsModal ref={productsModalRef} />
      <div className={Style.title}>算力消耗规则</div>
      {configName ? (
        <>
          <div className={Style['rule-list']}>
            {rules?.map(item => (
              <div key={item.value} className={Style['rule-item']}>
                <div className={Style.left}>{item.label}</div>
                <div className={Style.right}>{`${item.second ? `${item.second} 秒` : '1 个'} = ${item?.credits} 算力`}</div>
              </div>
            ))}
          </div>
          <div className={Style.footer}>
            <CustomButton type={ButtonType.BLACK} className={Style.btn} onClick={showCreditsProductsModal}>
              <IconFont icon="icon_stars_fill" color="#FFF" size={24} />
              加购永久算力
            </CustomButton>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ConsumptionRules;
