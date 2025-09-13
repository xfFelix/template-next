import React from 'react';
import { Image } from 'antd';

export interface ImagePreviewProps {
  previewVisible: boolean;
  previewImageUrl: string;
  onOpenPreview: (visible: boolean) => void;
  clearPreviewUrl: () => void;
}
export default function ImagePreview(props: ImagePreviewProps) {
  const { previewVisible, previewImageUrl, onOpenPreview, clearPreviewUrl } =
    props;

  // 图片显示变化
  const handleVisibleChange = (visible: boolean) => {
    onOpenPreview(visible);
  };

  // 处理预览关闭后操作
  const handleAfterOpenChange = (visible: boolean) => {
    if (!visible) {
      clearPreviewUrl();
    }
  };

  return (
    <Image
      alt=""
      wrapperStyle={{ display: 'none' }}
      preview={{
        visible: previewVisible,
        onVisibleChange: handleVisibleChange,
        afterOpenChange: handleAfterOpenChange,
      }}
      src={previewImageUrl}
    />
  );
}
