import { observer } from 'mobx-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import cls from 'classnames';
import { message } from 'antd';
import Style from './CreditsProductsModal.module.scss';
import CustomModal from '../CustomModal';
import PaymentCard from '../PaymentCard';
import { getCreditsProductList } from '@/api/Account/account';
import { CreditsProduct } from '@/types/product';
import translateAmount from '@/helpers/translateAmount';
import PaymentCardStyle from '@/constants/enum/PaymentCardStyle';
import { useStores } from '@/stores';

export interface CreditsProductsModalRef {
  show: () => void;
  close: () => void;
}

/** 加购算力弹窗 */
function CreditsProductsModal(_: unknown, ref: React.Ref<CreditsProductsModalRef>) {
  const [visible, setVisible] = useState(false);

  const [productList, setProductList] = useState<CreditsProduct[]>([]);

  const [activeProduct, setActiveProduct] = useState<CreditsProduct>();

  const { rightsInfo } = useStores();

  const show = async () => {
    setVisible(true);
    rightsInfo.initDashboardDetail();

    const { data } = await getCreditsProductList();

    setActiveProduct(data.results[0]);
    // 只展示前四个商品
    setProductList(data.results.filter((_, index) => index < 4));
  };

  const close = () => {
    setActiveProduct(undefined);
    setVisible(false);
  };

  const handlePaySuccess = () => {
    message.success('购买成功');
    rightsInfo.initDashboardDetail();
    close();
  };

  // 注册 ref 事件
  useImperativeHandle(ref, () => ({
    show,
    close,
  }));

  return (
    <CustomModal destroyOnHidden open={visible} onCancel={close} className={Style['credits-products-modal']}>
      <div className={Style['header-background']} />
      <div className={Style['modal-content']}>
        <div className={Style.header}>
          <div className={Style.title}>加购永久算力</div>
          <div className={Style['credits-tip']}>
            当前剩余: <span className={Style.num}>{(rightsInfo.dashboardDetail?.overview.remainingCredits || 0).toLocaleString()}</span> 算力
          </div>
        </div>
        <div
          className={cls(Style['product-list'], {
            [Style['big-area']]: productList.length > 3,
            [Style['small-card']]: productList.length > 2,
          })}
        >
          {productList.map(t => (
            <div
              key={t.id}
              onClick={() => setActiveProduct(t)}
              className={cls(Style['product-card'], {
                [Style.active]: activeProduct?.id === t.id,
              })}
            >
              <div className={Style.price}>
                ¥<span className={Style.num}>{translateAmount(t.price)}</span>
              </div>
              <div className={Style.credits}>
                <span className={Style.num}>{t.credits.toLocaleString()}</span>
                算力
              </div>
              <div className={Style['expiration-date']}>永久有效</div>
            </div>
          ))}
        </div>
        <div className={Style.footer}>
          <div className={Style.border} />
          {activeProduct && <PaymentCard goodsId={activeProduct.id} styleType={PaymentCardStyle.HORIZONTAL} onSuccess={handlePaySuccess} />}
        </div>
      </div>
    </CustomModal>
  );
}

export default observer(forwardRef(CreditsProductsModal));
