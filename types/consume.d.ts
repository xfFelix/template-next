declare namespace Consume {
  /** 扣费项，详情查看 CostItem.ts */
  type CostItem =
    | 'all'
    | 'virtualmanTrain'
    | 'fastVirtualmanTrain'
    | 'imageVirtualmanTrain'
    | 'voiceReproduceV1'
    | 'voiceReproduceV2'
    | 'voiceReproduceV3'
    | 'voiceReproduceS1'
    | 'virtualmanVideoGenerate'
    | 'virtualmanBroadcastVideoGenerate'
    | 'realmanBroadcastVideoGenerate'
    | 'materialMixClipVideoGenerate'
    | 'newsMixClipVideoGenerate'
    | 'asr'
    | 'videoStyle';
  /** 功能类型，详情查看 FeatureType.ts */
  type FeatureType =
    | 'virtualmanTrain'
    | 'fastVirtualmanTrain'
    | 'imageVirtualmanTrain'
    | 'voiceReproduce'
    | 'videoGenerate';
  /** 状态 */
  type Status = 'processing' | 'succeed' | 'failed';
  /** 翻页方向 */
  type Direction = 'prev' | 'next';

  interface SearchParam {
    /** 格式：2025-07-18 00:00:00 */
    startDate?: string;
    /** 格式:2025-07-19 00:00:00 */
    endDate?: string;
    /** 任务ID */
    taskId?: string;
    /** 密钥Id */
    apiKeyId?: string;
    /** 计费项 */
    costRightsType?: CostItem;
  }

  interface Param extends SearchParam {
    // 翻页条件
    cursor?: string;
    direction?: 'prev' | 'next';
    limit: number;
  }

  interface Data {
    /** 消耗时间 */
    createdAt: string;
    /** 功能类型 */
    category: FeatureType;
    /** 计费项 */
    costRightsType: CostItem;
    /** 时长(秒) */
    duration: number;
    /** 任务状态 */
    status: Status;
    /** 任务ID */
    taskId: string;
    /** 预扣算力 */
    preCostCredits: number;
    /** 消耗算力 */
    credits: number;
    /** 失败原因 */
    errorMessage: string;
  }
}
