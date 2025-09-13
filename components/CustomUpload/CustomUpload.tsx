import { Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import COS from 'cos-js-sdk-v5';
import { axiosGetLoraByteToken } from '@/api/realName';
import { fileSizeVail } from '@/utils/fileSizeCheck';
import ImagePreview from './components/ImagePreview';
import Style from './CustomUpload.module.scss';

interface CosUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  children?: ReactNode;
  /** 上传类型 */
  type?: 'image' | 'video';
  /** 场景 */
  scene?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** 允许上传的类型 */
  allowedTypes?: string[];
}

interface UploadFileItem {
  uid: string;
  name: string;
  status: 'done';
  url: string;
}

function CustomUpload({
  value,
  onChange,
  children,
  type = 'image',
  scene = 'verification',
  size = 0,
  className,
  style,
  allowedTypes = ['jpg', 'png'],
}: CosUploadProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState('');

  const [fileList, setFileList] = useState<UploadFileItem[]>([
    {
      uid: '-1',
      name: '已上传',
      status: 'done',
      url: value || '',
    },
  ]);

  const handleUpload: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    try {
      if (size && !fileSizeVail(file as File, size, `文件大小不能超过${size}M`)) {
        setFileList([]);
        return;
      }
      const extName = (file as File).name.split('.').pop() || 'jpg';
      if (!allowedTypes.includes(extName)) {
        setFileList([]);
        message.error(`上传失败，请上传${allowedTypes.join('或')}格式的文件`);
        return;
      }
      const { data } = await axiosGetLoraByteToken({
        type,
        scene,
        extName,
        isTemp: true,
      });
      const cos = new COS({
        getAuthorization: (_, callback) => {
          callback({
            TmpSecretId: data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials.tmpSecretKey,
            SecurityToken: data.credentials.sessionToken,
            StartTime: data.startTime,
            ExpiredTime: data.expiredTime,
          });
        },
      });
      // 3. 上传文件
      cos.putObject(
        {
          Bucket: data.bucket,
          Region: data.region,
          Key: data.key,
          Body: file,
        },
        (err, res) => {
          if (err) {
            message.error('上传失败');
            return;
          }
          const url = `https://${res.Location}`;
          onChange?.(url);
          onSuccess?.(res);
        }
      );
    } catch (e) {
      message.error('上传失败，请重试');
      onError?.(e as Error);
    }
  };

  // 删除文件
  const handleChange: UploadProps['onChange'] = info => {
    if (info.file.status === 'removed') {
      setFileList([]);
      onChange?.(''); // 通知外部已删除
    } else {
      setFileList(info.fileList as UploadFileItem[]);
    }
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  /** 图片预览控制 */
  const handlePreviewImage = (visible: boolean) => {
    setPreviewOpen(visible);
  };

  /** 图片预览关闭 */
  const clearImageUrl = () => {
    setPreviewImage('');
  };

  useEffect(() => {
    if (value) {
      setFileList([{ uid: '-1', name: '已上传', status: 'done', url: value }]);
    } else {
      setFileList([]);
    }
  }, [value]);

  return (
    <div className={Style['custom-upload']}>
      <ImagePreview previewVisible={previewOpen} previewImageUrl={previewImage} onOpenPreview={handlePreviewImage} clearPreviewUrl={clearImageUrl} />
      <Upload
        name="UploadOss"
        listType="picture-card"
        fileList={fileList}
        style={style}
        customRequest={handleUpload}
        className={className}
        onChange={handleChange}
        onPreview={handlePreview}
      >
        {fileList.length === 0 && children}
      </Upload>
    </div>
  );
}

export default CustomUpload;
