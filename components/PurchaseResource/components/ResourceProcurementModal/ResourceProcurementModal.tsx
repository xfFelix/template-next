import { observer } from 'mobx-react';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { message } from 'antd';
import CustomModal from '@/components/CustomModal';
import Style from './ResourceProcurementModal.module.scss';
import PaymentCard from '@/components/PaymentCard';
import PaymentCardStyle from '@/constants/enum/PaymentCardStyle';

interface ResourceProcurementModalProps {
  /** 商品id */
  productId: string;
  /** 商品名称 */
  productName: string;
}

export interface ResourceProcurementModalRef {
  show: (props: ResourceProcurementModalProps) => void;
  close: () => void;
}

/** 加购算力弹窗 */
function ResourceProcurementModal(_: unknown, ref: React.Ref<ResourceProcurementModalRef>) {
  const [visible, setVisible] = useState(false);

  const propsRef = useRef<ResourceProcurementModalProps>(undefined);

  const show = async (props: ResourceProcurementModalProps) => {
    propsRef.current = props;
    setVisible(true);
  };

  const close = () => {
    propsRef.current = undefined;
    setVisible(false);
  };

  const handlePaySuccess = () => {
    message.success('购买成功');
    close();
  };

  // 注册 ref 事件
  useImperativeHandle(ref, () => ({
    show,
    close,
  }));

  return (
    <CustomModal destroyOnHidden open={visible} onCancel={close} className={Style['resource-procurement-modal']}>
      <div className={Style['header-background']} />
      <div className={Style['modal-content']}>
        <div className={Style.title}>购买{propsRef.current?.productName}</div>
        {propsRef.current?.productId && <PaymentCard styleType={PaymentCardStyle.VERTICAL} goodsId={propsRef.current.productId} onSuccess={handlePaySuccess} />}
      </div>
    </CustomModal>
  );
}

export default observer(forwardRef(ResourceProcurementModal));
