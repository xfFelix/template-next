import { useEffect, useState } from 'react';
import cls from 'classnames';
import { ResourceProduct } from '@/types/product';
import Style from './ProductCard.module.scss';
import translateAmount from '@/helpers/translateAmount';
import { PeriodUnitSuffix } from '@/constants/enum/PeriodUnit';
import IconFont from '@/components/IconFont';
import RightConsumeMode from '@/constants/enum/RightConsumeMode';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';

interface ProductCardProps {
  product: ResourceProduct;
  onBuy: () => void;
}

function ProductCard(props: ProductCardProps) {
  const { product, onBuy } = props;

  /** 公共并发数, 为 0 时单独展示 */
  const [overallConcurrency, setOverallConcurrency] = useState(0);

  const rights = product.rightItem.filter(t => t.name);

  const concurrencyConfig = product.concurrency;

  useEffect(() => {
    const rights = product.rightItem || [];
    const concurrency = rights[0]?.concurrency || 0;

    if (rights.length > 1) {
      /** 过滤相同并发项 */
      const filterOther = rights.filter(t => t.concurrency !== concurrency);
      if (filterOther.length) {
        setOverallConcurrency(0);
        return;
      }
    }
    setOverallConcurrency(concurrency);
  }, []);

  return (
    <div className={Style['product-card']} key={product.id}>
      {product.label ? <div className={Style['product-label']}>{product.label}</div> : null}
      <div className={Style['product-name']}>{product.name}</div>
      <div className={Style['product-price']}>
        <span className={Style.icon}>¥</span>
        <span className={Style.price}>{translateAmount(product.price)}</span>
        <span className={Style.time}>
          /{product.period}
          {PeriodUnitSuffix[product.periodUnit]}
        </span>
        <span className={Style['original-price']}>¥{translateAmount(product.originalPrice)}</span>
      </div>
      <div className={cls(Style['entitlement-list'])}>
        {rights.map((t, index) => (
          <div key={`${index + Date.now()}`} title={t.name} className={cls(Style['entitlement-card'])}>
            <IconFont className={Style['yes-icon']} icon="icon_succeed" size={16} color="#191919" />
            {t.name}
            {t.consumeMode === RightConsumeMode.UNLIMITED && <div className={Style.tag}>无限</div>}
            {!overallConcurrency && !!t.concurrency && <div className={Style.concurrency}>并发数 {t.concurrency}</div>}
            {t.descUrl && <IconFont onClick={() => window.open(t.descUrl)} className={Style['help-icon']} icon="icon_hint" size={16} />}
          </div>
        ))}
      </div>
      <div className={Style.border} />
      <div className={Style['entitlement-detail']}>
        <div className={Style['entitlement-card']}>
          <IconFont className={Style['yes-icon']} icon="icon_succeed" size={16} color="#191919" />
          <span>
            赠送 {product.credits.toLocaleString()} 算力（有效期
            {product.period}
            {PeriodUnitSuffix[product.periodUnit]}）
          </span>
        </div>
        {concurrencyConfig && (
          <div className={Style['entitlement-card']}>
            <IconFont className={Style['yes-icon']} icon="icon_succeed" size={16} color="#191919" />

            <span>公共并发：</span>
            <div className={Style['detail-btn']}>
              <CustomButton className={Style.btn} type={ButtonType.TEXT}>
                查看详情
              </CustomButton>
              <div className={Style['concurrency-detail-card']}>
                <div className={Style['card-content']}>
                  <div>极速数字人并发数{concurrencyConfig.fastVirtualmanTrain};</div>
                  <div>专业数字人并发数{concurrencyConfig.virtualmanTrain};</div>
                  <div>图生数字人并发数{concurrencyConfig.imageVirtualmanTrain};</div>
                  <div>声音克隆并发数{concurrencyConfig.voiceReproduce};</div>
                  <div>视频合成并发数{concurrencyConfig.videoGenerate};</div>
                  <div>音频转文字并发数{concurrencyConfig.asr};</div>
                </div>
              </div>
            </div>
            <IconFont onClick={() => window.open('https://shanjian-openapi.apifox.cn/7324436m0')} className={Style['help-icon']} icon="icon_hint" size={16} />
          </div>
        )}
      </div>
      <div className={Style.footer}>
        <CustomButton type={ButtonType.BLACK} className={Style.btn} onClick={onBuy}>
          立即购买
        </CustomButton>
      </div>
    </div>
  );
}

export default ProductCard;
