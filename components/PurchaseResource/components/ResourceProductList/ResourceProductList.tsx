import { useEffect, useRef, useState } from 'react';
import { getProductPackageList } from '@/api/PurchaseResource/purchaseResource';
import { ResourceProduct } from '@/types/product';
import Style from './ResourceProductList.module.scss';
import ResourceProcurementModal from '../ResourceProcurementModal';
import { ResourceProcurementModalRef } from '../ResourceProcurementModal/ResourceProcurementModal';
import ProductCard from './ProductCard';

function ResourceProductList() {
  const [productList, setProductList] = useState<ResourceProduct[]>([]);

  const modalRef = useRef<ResourceProcurementModalRef>(null);

  const init = async () => {
    const { data } = await getProductPackageList();

    // 只展示前四个商品
    setProductList(data.results.filter((_, index) => index < 4));
  };

  /** 显示资源包购买弹窗 */
  const showResourceProcurementModal = (item: ResourceProduct) => {
    modalRef.current?.show({ productId: item.id, productName: item.name });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={Style['resource-product-list']}
      style={{
        gap: productList.length < 4 ? '56px' : '40px',
      }}
    >
      <ResourceProcurementModal ref={modalRef} />
      {productList.map(item => (
        <ProductCard key={item.id} product={item} onBuy={() => showResourceProcurementModal(item)} />
      ))}
    </div>
  );
}

export default ResourceProductList;
