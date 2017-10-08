import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EventType} from '../../enums/event-type.enum';
import {EventData} from '../../interfaces/event-data';
import {StorageService} from '../storage/storage.service';
import {Http} from '@angular/http';
import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UtilService {

  /**
   * 用于向组件发送事件
   * @type {Subject}
   */
  subject: Subject<EventData> = new Subject();

  /**
   * 位置列表
   * @type {[string,string,string,string,string,string]}
   */
  position = [
    'left', 'center', 'right', 'top', 'middle', 'bottom'
  ];

  /**
   * 水平对齐类型
   * @type {[string,string,string]}
   */
  horizontal = [
    'left', 'center', 'right'
  ];

  /**
   * 水平对齐类型
   * @type {[string,string,string]}
   */
  vertical = [
    'top', 'middle', 'bottom'
  ];

  /**
   * 倒计时占位符
   * @type {string}
   */
  countDownPlaceholder = '[count-down]';

  apiHost = 'https://dev.jintangjiang.cn/';// api前缀

  defaultPage = 'HomePage';// 默认登录后跳转到的页面
  refreshDuration = 280;// 下拉刷新的回复时间

  token: any = null;// 保存token

  preloadConfig = {
    percent: 50,// 百分比
    distance: 300// 距离
  };// 在滚动到距离底部多远时进行预加载下一页

  // ------------------------------------------组件方法 [START]

  /**
   * 隐藏加载动画
   */
  hideLoading() {
    this.subject.next({
      type: EventType.TYPE_LOADING_HIDE,
      data: null
    });
  }

  /**
   * 显示加载动画
   * @param data
   */
  loading(data?: any | string) {
    this.subject.next({
      type: EventType.TYPE_LOADING,
      data: data
    });
  }

  /**
   * 隐藏加载动画
   */
  hideToast() {
    this.subject.next({
      type: EventType.TYPE_TOAST_HIDE,
      data: null
    });
  }

  /**
   * 显示加载动画
   * @param data
   */
  toast(data: any | string) {
    this.subject.next({
      type: EventType.TYPE_TOAST,
      data: data
    });
  }

  /**
   * 隐藏弹出框
   */
  hideAlert() {
    this.subject.next({
      type: EventType.TYPE_ALERT_HIDE,
      data: null
    });
  }

  /**
   * 显示弹出框
   * @param data
   */
  showAlert(data: any | string) {
    this.subject.next({
      type: EventType.TYPE_ALERT,
      data: data
    });
  }

  /**
   * 显示alert弹出框
   * @param data
   */
  alert(data: any | string) {
    let d;
    if (typeof data === 'string') {
      d = {
        text: data,
      };
    } else {
      d = data;
    }
    d.showCancelButton = false;
    this.showAlert(d);
  }

  /**
   * 显示 confirm 弹出框
   * @param data
   */
  confirm(data: any | string) {
    let d;
    if (typeof data === 'string') {
      d = {
        text: data,
      };
    } else {
      d = data;
    }
    d.showCancelButton = true;
    this.showAlert(d);
  }

  // ------------------------------------------组件方法 [END]

  // ------------------------------------------辅助方法 [START]

  /**
   * 转换换行为br
   * @param str 要转换的字符串
   * @returns {any}
   */
  translateToBr(str) {
    str = str.replace(/\r\n/g, '<br/>');
    str = str.replace(/\n/g, '<br/>');
    return str;
  }

  /**
   * 验证手机号码是否合法
   * @param str 号码
   * @returns {boolean} 手机号码是否合法
   */
  testPhone(str) {
    if (str.length !== 11) {
      return false;
    }
    return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str);
  }

  /**
   * 获取在min和max之间的随机数
   * @param min
   * @param max
   * @returns {number}
   */
  range(min: number, max: number) {
    if (min > max) {
      const temp = max;
      max = min;
      min = temp;
    }
    const result = Math.floor(min + Math.random() * (max - min + 1));
    return result;
  }

  /**
   * 随机化数组
   * @param arr 数组
   * @returns {Array} 打乱顺序后的数组
   */
  random(arr) {
    const result = [];
    let index: number;
    for (let i = arr.length - 1; i >= 0; i--) {
      index = this.range(0, arr.length - 1);
      result.push(arr[index]);
      arr.splice(index, 1);
    }
    return result;
  }

  // ------------------------------------------辅助方法 [END]

  // ------------------------------------------登录相关 [START]

  /**
   * 跳转到对应的界面
   * @param page 界面名称
   */
  goto(page: string) {
    console.log(`跳转到对应的界面${page}`);
  }

  /**
   * 退出登录
   */
  logout() {
    this.clear();
    this.goto('LoginPage');
  }

  /**
   * 清除数据
   * @returns {Promise<any[]>}
   */
  clear() {
    this.token = null;
    this.storage.remove('token');
    this.storage.remove('user');
  }

  /**
   * 登录
   * @param data 登录凭据
   * @returns {Promise<boolean|TResult2|boolean>}
   */
  login(data) {
    const url = this.apiHost + 'oauth/token';
    return this.http.post(url, data).toPromise()
      .then(res => {
        const response = res.json();
        if (200 <= res.status && res.status < 400) {
          // 登录成功,保存token和用户信息
          this.saveToken(response);// 保存token
          return true;
        } else {
          this.clear();
          return false;
        }
      })
      .catch(err => {
        // 登录出错
        return false;
      });
  }

  /**
   * 检查是否登录
   * @param isInLogin
   */
  checkLogin(isLoginPage?: boolean) {
    return this.isLogin().then(value => {
      if (!isLoginPage && !value) {
        // 当前不是登录页面且未登录
        this.showLoginPage();
      }
      return value;
    });
  }

  /**
   * 弹出登录页面
   */
  showLoginPage() {
    this.goto('LoginPage');
  }

  /**
   * 保存token
   * @param token 令牌
   */
  saveToken(token) {
    this.token = token;
    const expires_day = moment().add(this.token.expires_in, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    this.token.expires_day = expires_day;
    this.storage.set('token', this.token);
  }


  /**
   * 刷新token
   * @param token 令牌
   * @returns {Promise<boolean|TResult2|boolean>}
   */
  refreshToken(token) {
    let url = 'oauth/token';
    url = this.apiHost + url;
    const data = {
      refresh_token: token,
      grant_type: 'refresh_token'
    };
    return this.http.post(url, data).toPromise().then(res => {
      const response = res.json();
      if (200 <= res.status && res.status < 400) {
        // 登录成功,保存token和用户信息
        this.saveToken(response); // 保存token
        return true;
      } else {
        this.clear();
        return false;
      }
    }).catch(err => {
      this.clear();
      return false;
    });
  }

  /**
   * 判断当前的token是否有效
   * @returns {any}
   */
  isValidToken() {
    // 判断token是否过期
    const seconds = moment(this.token.expires_day).diff(moment(), 'seconds');
    if (seconds <= 20) {
      // 刷新token
      return this.refreshToken(this.token.refresh_token); // 刷新token
    } else {
      return Promise.resolve(true);
    }
  }

  /**
   * 是否已经登录
   * @returns {any}
   */
  isLogin() {
    if (this.token) {
      // 判断token是否过期
      return this.isValidToken();
    } else {
      const token = this.storage.get('token');
      if (token) {
        return (this.token = token) ? this.isValidToken() : Promise.resolve(false);
      } else {
        return Promise.resolve(false);
      }
    }
  }

  // ------------------------------------------登录相关 [END]


  constructor(private http: Http, public storage: StorageService) {
  }

}
