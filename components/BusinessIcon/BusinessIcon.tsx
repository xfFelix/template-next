import { useRef } from 'react';
import IconFont from '../IconFont';
import Style from './BusinessIcon.module.scss';
import BusinessModal from '../BusinessModal';
import { BusinessModalRef } from '../BusinessModal/BusinessModal';

function BusinessIcon() {
  const modalRef = useRef<BusinessModalRef>(null);

  const openBusinessModal = () => {
    modalRef.current?.show();
  };

  return (
    <>
      <BusinessModal ref={modalRef} />
      <div className={Style['business-icon']} onClick={openBusinessModal}>
        <IconFont icon="icon_serve" color="#9599A0" size={16} />
      </div>
    </>
  );
}

export default BusinessIcon;
