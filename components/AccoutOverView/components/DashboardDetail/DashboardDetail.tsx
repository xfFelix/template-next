import { useEffect, useRef } from 'react';
import cls from 'classnames';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import IconFont from '@/components/IconFont';
import Style from './DashboardDetail.module.scss';
import CreditsProductsModal from '@/components/CreditsProductsModal';
import { CreditsProductsModalRef } from '@/components/CreditsProductsModal/CreditsProductsModal';
import { formatTime } from '@/utils/formatTime';
import DashboardResourceKey from '../../constants/enum/DashboardResourceKey';
import ResourceDetailModal, { ResourceDetailModalRef } from '../ResourceDetailModal/ResourceDetailModal';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';
import BackgroundImageAssets from '@/assets/Background';
import { useStores } from '@/stores';
import { ResourcePackageType, ResourcePackageTypeLabel } from '@/constants/enum/ResourcePackageType';

function DashboardDetail() {
  const productsModalRef = useRef<CreditsProductsModalRef>(null);
  const resourceModalRef = useRef<ResourceDetailModalRef>(null);
  const { rightsInfo } = useStores();

  const router = useRouter();

  const data = rightsInfo.dashboardDetail;

  const showCreditsProductsModal = () => {
    productsModalRef.current?.show();
  };

  const showResourceModal = () => {
    resourceModalRef.current?.show();
  };

  const navToPurchase = () => {
    router.push('/purchase');
  };

  const getResourceData = (key: DashboardResourceKey) => {
    if (!data?.resources) return '暂无';
    if (key === DashboardResourceKey.EXPIRED_TIME) {
      const date = data.resources.expiredAt;
      if (!date) return '暂无';
      return formatTime(date, 'YYYY-MM-DD');
    }
    if (key === DashboardResourceKey.CURRENT_RESOURCE_TYPE) {
      const name = data.resources.name;
      if (!name) return '暂无';
      return (
        <div
          className={cls(Style.tag, {
            [Style['official-tag']]: data.resources.packageType === ResourcePackageType.OFFICIAL,
          })}
        >
          <IconFont size={16} color="#191919" icon={data.resources.packageType === ResourcePackageType.OFFICIAL ? 'icon_stars_fill' : 'a-icon_aishandian'} />
          <span>{ResourcePackageTypeLabel[data.resources.packageType]}</span>
        </div>
      );
    }
    if (key === DashboardResourceKey.CURRENT_RESOURCE_ENTITLEMENTS) {
      if (!data.resources.name) return '暂无';
      return (
        <CustomButton type={ButtonType.TEXT} className={Style.btn} onClick={showResourceModal}>
          查看详情
        </CustomButton>
      );
    }
    return '';
  };

  useEffect(() => {
    rightsInfo.initDashboardDetail();
  }, []);

  return (
    <div className={Style['dashboard-detail']}>
      <CreditsProductsModal ref={productsModalRef} />
      <ResourceDetailModal ref={resourceModalRef} />
      <div
        className={Style['resource-card']}
        style={{
          backgroundImage: `url(${BackgroundImageAssets.LEFT_DASHBOARD_CARD})`,
        }}
      >
        <div className={Style['card-header']}>
          <div className={Style['card-title']}>
            <div className={Style['ribbon-background']} />
            <span>资源总览</span>
          </div>
          <CustomButton type={ButtonType.BLACK} className={Style['recharge-btn']} onClick={navToPurchase}>
            <div className={Style['btn-text']}>购买资源</div>
            <IconFont size={12} icon="icon-arrow-r" color="#fff" />
          </CustomButton>
        </div>
        <div className={Style['card-content']}>
          <div className={Style.item}>
            <div className={Style['item-name']}>当前资源包</div>
            <div className={Style['item-content']}>{getResourceData(DashboardResourceKey.CURRENT_RESOURCE_TYPE)}</div>
          </div>
          <div className={Style.item}>
            <div className={Style['item-name']}>当前资源包权益</div>
            <div className={Style['item-content']}>{getResourceData(DashboardResourceKey.CURRENT_RESOURCE_ENTITLEMENTS)}</div>
          </div>
          <div className={Style.item}>
            <div className={Style['item-name']}>当前资源包有效期</div>
            <div className={Style['item-content']}>{getResourceData(DashboardResourceKey.EXPIRED_TIME)}</div>
          </div>
        </div>
      </div>
      <div
        className={Style['power-card']}
        style={{
          backgroundImage: `url(${BackgroundImageAssets.RIGHT_DASHBOARD_CARD})`,
        }}
      >
        <div className={Style['card-header']}>
          <div className={Style['card-title']}>
            <div className={Style['ribbon-background']} />
            <span>算力总览</span>
          </div>
          <CustomButton type={ButtonType.BLACK} className={Style['recharge-btn']} onClick={showCreditsProductsModal}>
            <div className={Style['btn-text']}>加购算力</div>
            <IconFont size={12} icon="icon-arrow-r" color="#fff" />
          </CustomButton>
        </div>
        <div className={Style['card-content']}>
          <div className={Style.item}>
            <div className={Style['item-name']}>剩余算力</div>
            <div className={cls(Style['item-content'], Style.num)}>{data?.overview.remainingCredits.toLocaleString() || '--'}</div>
          </div>
          <div className={Style.item}>
            <div className={Style['item-name']}>当月生成任务数</div>
            <div className={cls(Style['item-content'], Style.num)}>{data?.overview.monthTaskCount.toLocaleString() || '--'}</div>
          </div>
          <div className={Style.item}>
            <div className={Style['item-name']}>当日生成任务数</div>
            <div className={cls(Style['item-content'], Style.num)}>{data?.overview.todayTaskCount.toLocaleString() || '--'}</div>
          </div>
          <div className={Style.item}>
            <div className={Style['item-name']}>累计消耗算力</div>
            <div className={cls(Style['item-content'], Style.num)}>{data?.overview.totalCreditsUsed.toLocaleString() || '--'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(DashboardDetail);
