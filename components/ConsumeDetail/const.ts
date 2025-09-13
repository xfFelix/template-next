import CostItem from '@/constants/CostItem';
import FeatureType from '@/constants/FeatureType';

/** 专业数字人功能项列表 */
export const VirtualCodeList: { label: string; value: Consume.CostItem }[] = [
  { label: '专业数字人克隆', value: CostItem.VIRTUAL_MAN_TRAIN },
];

/** 极速数字人功能项列表 */
export const FastVirtualCodeList: { label: string; value: Consume.CostItem }[] =
  [{ label: '极速数字人克隆', value: CostItem.FAST_VIRTUAL_MAN_TRAIN }];

/** 极速数字人功能项列表 */
export const ImageVirtualCodeList: {
  label: string;
  value: Consume.CostItem;
}[] = [{ label: '图生数字人克隆', value: CostItem.IMAGE_VIRTUAL_MAN_TRAIN }];

export const VideoStyleOption: { label: string; value: Consume.CostItem } = {
  label: '视频模板',
  value: CostItem.VIDEO_STYLE,
};

/** 声音克隆功能项列表 */
export const VoiceCodeList: { label: string; value: Consume.CostItem }[] = [
  { label: 'V1', value: CostItem.VOICE_REPRODUCE_V1 },
  { label: 'V2', value: CostItem.VOICE_REPRODUCE_V2 },
  { label: 'V3', value: CostItem.VOICE_REPRODUCE_V3 },
  { label: 'S1', value: CostItem.VOICE_REPRODUCE_S1 },
];

/** ASR */
const AsrOption: { label: string; value: Consume.CostItem } = {
  label: '音频转文字（ASR）',
  value: CostItem.ASR,
};

/** 视频合成功能项列表 */
export const VideoCodeList: { label: string; value: Consume.CostItem }[] = [
  {
    label: '数字人口播视频（无包装）',
    value: CostItem.VIRTUAL_MAN_VIDEO_GENERATE,
  },
  {
    label: '数字人口播混剪视频',
    value: CostItem.VIRTUAL_MAN_BROADCAST_VIDEO_GENERATE,
  },
  {
    label: '真人口播混剪视频',
    value: CostItem.REAL_MAN_BROADCAST_VIDEO_GENERATE,
  },
  {
    label: '新闻体视频',
    value: CostItem.NEWS_STYLE_VIDEO_GENERATE,
  },
  {
    label: '素材混剪视频',
    value: CostItem.MATERIAL_MIXED_CUT_VIDEO_GENERATE,
  },
  AsrOption,
];

/** 功能类型列表 */
export const FeatureTypeList = [
  {
    label: '专业数字人',
    value: FeatureType.VIRTUAL_MAN_TRAIN,
    children: VirtualCodeList,
  },
  {
    label: '极速数字人',
    value: FeatureType.FAST_VIRTUAL_MAN_TRAIN,
    children: FastVirtualCodeList,
  },
  {
    label: '图生数字人',
    value: FeatureType.IMAGE_VIRTUAL_MAN_TRAIN,
    children: ImageVirtualCodeList,
  },
  {
    label: '声音克隆',
    value: FeatureType.VOICE_CLONE,
    children: VoiceCodeList,
  },
  {
    label: '视频合成',
    value: FeatureType.VIDEO_SYNTHESIS,
    children: VideoCodeList,
  },
];

/** 功能项列表 */
export const CostItemList = [
  ...VirtualCodeList,
  ...FastVirtualCodeList,
  ...ImageVirtualCodeList,
  ...VoiceCodeList,
  ...VideoCodeList,
];

export const StatusList = [
  { label: '成功', value: 'succeed', color: 'green' },
  { label: '失败', value: 'failed', color: 'red' },
  { label: '生成中', value: 'processing', color: 'gray' },
];
