import { makeAutoObservable } from 'mobx';
import { DashboardDetail } from '@/types/account';
import { getDashboardDetail } from '@/api/Account/account';

/** 权益信息 */
class RightsInfo {
  /** 账户总览仪表盘数据 */
  dashboardDetail?: DashboardDetail = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    await this.initDashboardDetail();
  }

  /** 更新仪表盘数据 */
  async initDashboardDetail() {
    const { data } = await getDashboardDetail();

    this.dashboardDetail = data;
  }
}

export default RightsInfo;
