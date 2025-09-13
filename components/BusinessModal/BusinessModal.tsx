import { forwardRef, useImperativeHandle, useState } from 'react';
import CustomModal from '@/components/CustomModal';
import Style from './BusinessModal.module.scss';
import BusinessImageAssets from '@/assets/Business';
import Image from 'next/image';

export interface BusinessModalRef {
  show: () => void;
  close: () => void;
}
function BusinessModal(_: unknown, ref: React.Ref<BusinessModalRef>) {
  const [visible, setVisible] = useState(false);

  const show = async () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  // 注册 ref 事件
  useImperativeHandle(ref, () => ({
    show,
    close,
  }));

  return (
    <CustomModal destroyOnHidden open={visible} onCancel={close} className={Style['business-modal']}>
      <div className={Style['header-background']} />
      <div className={Style['modal-content']}>
        <div className={Style.header}>
          <div className={Style.title}>更多疑问可联系商务咨询</div>
        </div>
        <div className={Style.content}>
          <Image src={BusinessImageAssets.BusinessQRCode} alt="" />
        </div>
      </div>
    </CustomModal>
  );
}

export default forwardRef(BusinessModal);
