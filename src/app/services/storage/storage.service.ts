import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {

  constructor() {
  }

  /**
   * 获取key对应的数据
   * @param key 键
   * @returns {string} 值
   */
  get(key: string) {
    let result = localStorage.getItem(key);
    result = JSON.parse(result);
    return result;
  }

  /**
   * 设置key对应的数据
   * @param key 键
   * @param data 值
   */
  set(key: string, data: any) {
    let d: string;
    if (typeof data === 'string') {
      d = data;
    } else if (typeof data === 'object') {
      d = JSON.stringify(data);
    } else {
      throw Error('参数类型不正确,值须为string或object类型');
    }
    localStorage.setItem(key, d);
  }

  /**
   * 删除key对应的数据
   * @param key 键
   */
  remove(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * 清空数据
   */
  clear() {
    localStorage.clear();
  }

}
