interface StorageObj<T = unknown> {
  value: T;
  expiredTime: number;
}

class Storage {
  expiredTime = 0;

  constructor(expiredTime = 0) {
    this.expiredTime = expiredTime;
  }

  set(key: string, value: unknown, expiredTime = 0) {
    const obj: StorageObj = {
      value,
      expiredTime: expiredTime || this.expiredTime,
    };
    const ISSERVER = typeof window === 'undefined';
    if (!ISSERVER) localStorage.setItem(key, JSON.stringify(obj));
  }

  get<T>(key: string): T | null {
    try {
      const ISSERVER = typeof window === 'undefined';
      if (!ISSERVER) {
        const item = localStorage.getItem(key);
        if (!item) {
          return null;
        }
        const data = JSON.parse(item) as StorageObj<T>;
        if (data.expiredTime === 0) {
          // 未设置过期时间
          return data.value;
        }
        const nowTime = Date.now();
        if (nowTime > data.expiredTime) {
          this.remove(key);
          return null;
        }
        return data.value;
      }
      return null;
    } catch (e) {
      console.log(e);
      this.remove(key);
      return null;
    }
  }

  remove(key: string) {
    const ISSERVER = typeof window === 'undefined';
    if (!ISSERVER) localStorage.removeItem(key);
  }

  clear() {
    const ISSERVER = typeof window === 'undefined';
    if (!ISSERVER) localStorage.clear();
  }
}

export default Storage;
