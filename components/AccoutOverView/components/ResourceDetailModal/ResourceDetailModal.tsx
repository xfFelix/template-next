import { observer } from 'mobx-react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import cls from 'classnames';
import Style from './ResourceDetailModal.module.scss';
import CustomModal from '../../../CustomModal';
import { getResourceEntitlements } from '@/api/Account/account';
import { EntitlementDetail } from '@/types/product';
import IconFont from '@/components/IconFont';
import RightConsumeMode from '@/constants/enum/RightConsumeMode';

export interface ResourceDetailModalRef {
  show: () => void;
  close: () => void;
}

function ResourceDetailModal(_: unknown, ref: React.Ref<ResourceDetailModalRef>) {
  const [visible, setVisible] = useState(false);

  const [entitlementList, setEntitlementList] = useState<EntitlementDetail[]>([]);

  const show = async () => {
    setVisible(true);
    const { data } = await getResourceEntitlements();

    setEntitlementList(data.results.filter(t => t.name));
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
    <CustomModal destroyOnHidden open={visible} onCancel={close} className={Style['resource-detail-modal']}>
      <div className={Style['header-background']} />
      <div className={Style['modal-content']}>
        <div className={Style.header}>当前资源包权益</div>
        <div className={cls(Style['entitlement-list'])}>
          {entitlementList.map(t => (
            <div key={t.key} title={t.name} className={cls(Style['entitlement-card'])}>
              <IconFont icon="icon_succeed" size={16} color="#191919" />
              {t.name}

              {t.consumeMode === RightConsumeMode.UNLIMITED && <div className={Style.tag}>无限</div>}
              {t.descUrl && <IconFont onClick={() => window.open(t.descUrl)} className={Style['help-icon']} icon="icon_hint" size={16} />}
            </div>
          ))}
        </div>
      </div>
    </CustomModal>
  );
}

export default observer(forwardRef(ResourceDetailModal));
