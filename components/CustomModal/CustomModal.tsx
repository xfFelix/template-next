import { ConfigProvider, Modal, ModalProps } from 'antd';
import cls from 'classnames';
import Style from './CustomModal.module.scss';
import { UploadTheme } from '@/constants/Theme';

const theme = {
  components: {
    Upload: UploadTheme,
  },
};
function CustomModal(props: ModalProps) {
  return (
    <ConfigProvider theme={theme}>
      <Modal {...props} width="fit-content" className={cls(Style['custom-modal'], props?.className)} />
    </ConfigProvider>
  );
}

export default CustomModal;
