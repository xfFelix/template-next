import { makeAutoObservable } from 'mobx';

class SliderInfo {
  activeKey: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.activeKey = '';
  }

  updateActiveKey(key: string) {
    this.activeKey = key;
  }
}

export default SliderInfo;
