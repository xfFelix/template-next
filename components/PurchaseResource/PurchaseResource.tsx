import React from 'react';
import Style from './PurchaseResource.module.scss';
import ResourceProductList from './components/ResourceProductList';
import ConsumptionRules from './components/ConsumptionRules';
import IconFont from '../IconFont';
import BusinessIcon from '../BusinessIcon';

export default function PurchaseResource() {
  return (
    <div className={Style['purchase-resource-page']}>
      <div className={Style.title}>
        <div className={Style['ribbon-background']} />
        <IconFont icon="logo_sjai2" size={32} color="#191919" />
        <span>资源包购买</span>
      </div>

      <ResourceProductList />
      <ConsumptionRules />
      <BusinessIcon />
    </div>
  );
}
