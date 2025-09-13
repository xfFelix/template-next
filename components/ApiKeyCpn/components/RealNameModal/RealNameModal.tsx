import React from 'react';
import Style from './RealNameModal.module.scss';
import { RealNameTypeEnum } from '@/constants/ApiKey';
import CustomModal from '@/components/CustomModal';
import IconFont from '@/components/IconFont';
import CustomButton from '@/components/CustomButton';
import ButtonType from '@/constants/enum/ButtonType';

export interface RealNameModalProps {
  visible: boolean;
  onChangeVisible: (visible: boolean, type?: RealNameTypeEnum) => void;
}

export default function RealNameModal(props: RealNameModalProps) {
  const { visible, onChangeVisible } = props;

  /** 关闭弹窗 */
  const handleCancel = () => {
    onChangeVisible(false);
  };

  /** 个人实名认证 */
  const handlePersonalRealName = () => {
    onChangeVisible(false, RealNameTypeEnum.PERSONAL);
  };

  /** 企业实名认证 */
  const handleCompanyRealName = () => {
    onChangeVisible(false, RealNameTypeEnum.ENTERPRISE);
  };

  return (
    <CustomModal
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      styles={{
        content: { padding: '0 0 36px', width: '466px' },
      }}
    >
      <div className={Style['real-name-modal']}>
        <div className={Style.tipBox}>
          <div className={Style.title}>实名认证提示</div>
          <div className={Style.content}>
            根据国家相关法律规定，创建服务及调用服务等行为前，需先完成个人/企业实名认证。
            <span className={Style.desc}>🌟 推荐个人认证，2分钟极速完成~</span>
          </div>
        </div>
        <div className={Style.option}>
          <div className={Style['option-item']}>
            <div>
              <div className={Style.title}>个人实名认证</div>
              <div className={Style.desc}>适用于个人用户，账号归属个人</div>
            </div>
            <CustomButton type={ButtonType.BLACK} className={Style.btn} onClick={handlePersonalRealName}>
              开始个人认证
              <IconFont size={13} icon="icon-arrow-r" color="#fff" />
            </CustomButton>
          </div>
          <div className={Style['option-item']}>
            <div>
              <div className={Style.title}>企业实名认证</div>
              <div className={Style.desc}>
                适用于企业、学术机构等，账号<span>归属企业</span>
              </div>
            </div>
            <CustomButton type={ButtonType.BLACK} className={Style.btn} onClick={handleCompanyRealName}>
              开始企业认证
              <IconFont size={13} icon="icon-arrow-r" color="#fff" />
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
