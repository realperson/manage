import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {UtilService} from '../../services/util/util.service';
import {EventType} from '../../enums/event-type.enum';
import {EventData} from '../../interfaces/event-data';
import {PositionType} from '../../enums/position-type.enum';
import {InOutAnimation} from '../../animations/animation-in-out';


@Component({
  selector: 'component-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: InOutAnimation
})
export class ToastComponent implements OnInit, OnDestroy {

  // ------------------------------------------data variables [START]

  /**
   * 默认位置
   * @type {number}
   */
  private defaultPosition: number = PositionType.CENTER | PositionType.MIDDLE;

  /**
   * 默认对齐方式
   * @type {number}
   */
  private defaultLayout: number = PositionType.CENTER | PositionType.MIDDLE;

  /**
   * 主题列表
   * @type {[string,string,string,string,string]}
   */
  private themes = ['normal', 'inverse', 'error', 'tip', 'success'];

  /**
   * 默认主题
   * @type {string}
   */
  private defaultTheme = 'tip';

  /**
   * 默认颜色
   * @type {string}
   */
  private defaultColor = '';

  /**
   * 默认背景颜色
   * @type {string}
   */
  private defaultBgColor = '';

  /**
   * 默认显示时间(秒)
   * @type {number}
   */
  private defaultTime = 3;


  // ------------------------------------------data variables [END]


  // ------------------------------------------config variables [START]

  /**
   * 是否显示
   * @type {boolean}
   */
  @Input() isShow = false;

  /**
   * 主题(normal:黑色 inverse:白色 error:错误 tip:提示 success:成功) 默认为黑色
   */
  @Input() theme: string;
  /**
   * 颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
   */
  @Input() color: string;

  /**
   * 背景颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
   */
  @Input() bgColor: string;

  /**
   * 位置
   */
  @Input() position: number = this.defaultPosition;

  /**
   * 内容对齐方式
   */
  @Input() layout: number = this.defaultLayout;

  /**
   * 文字
   */
  @Input() text: string;

  /**
   * 提示显示时间(毫秒)
   * @type {number}
   */
  @Input() time: number = this.defaultTime;

  /**
   * 关闭时的回调
   */
  @Input() callback: Function;

  /**
   * 是否倒计时
   * @type {boolean}
   */
  @Input() isCountDown = false;

  // ------------------------------------------config variables [END]


  // ------------------------------------------assist variables [START]

  /**
   * 用于订阅和反订阅事件
   */
  subscription: Subscription;

  /**
   * 动画是否已完成
   * @type {boolean}
   */
  isAnimationEnd = true;

  /**
   * 用于清除回调
   */
  toClearId: any = null;

  /**
   * 倒计时id,用于清除回调
   */
  countDowndId: any = null;

  /**
   * 当前剩余时间(秒)
   * @type {number}
   */
  remainTime = 0;

  // ------------------------------------------assist variables [END]

  constructor(private util: UtilService) {
    this.subscribe();
  }

  /**
   * 动画开始
   * @param e
   */
  animationStarted(e: any) {
    this.isAnimationEnd = false;
  }

  /**
   * 动画开始
   * @param e
   */
  animationDone(e: any) {
    this.isAnimationEnd = true;
  }

  /**
   * 获取动画状态
   * @returns {string}
   */
  get animationState() {
    return this.isShow ? 'show' : 'hide';
  }

  /**
   * 订阅显示和隐藏事件
   */
  subscribe() {
    this.subscription = this.util.subject.subscribe((d: EventData) => {
      if (d.type === EventType.TYPE_TOAST) {
        this.show(d.data);
      } else if (d.type === EventType.TYPE_TOAST_HIDE) {
        this.hide();
      }
    });
  }

  /**
   * 取消订阅显示和隐藏事件
   */
  unsubscribe() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe();
    if (this.toClearId) {
      clearTimeout(this.toClearId);
    }
    if (this.countDowndId) {
      clearInterval(this.countDowndId);
    }
  }

  /**
   * 获取显示文字
   * @returns {string}
   */
  getText() {
    const timeTips = ` <span class="emphasize">${this.remainTime}</span> 秒后，`;
    const result = this.text.replace(this.util.countDownPlaceholder, timeTips);
    // let result = this.text;
    return result;
  }

  /**
   * 获取主题
   * @returns {string}
   */
  getTheme() {
    let result = this.defaultTheme;
    if (this.theme) {
      if (this.themes.indexOf(this.theme) !== -1) {
        result = this.theme;
      }
    }
    return result;
  }

  /**
   * 是否使用默认主题
   * @returns {boolean}
   */
  isThemeDefault() {
    return this.getTheme() === this.defaultTheme;
  }

  /**
   * 获取位置对应的css类
   * @returns {string}
   */
  getPositionClass() {
    const result = {};
    let item: string;
    let key: string;
    // 位置数据类型验证
    if (typeof this.position !== 'number' || isNaN(this.position)) {
      this.position = this.defaultPosition;
    }
    // 位置取值是否在所在取值范围之内
    let isValid = false;
    this.util.position.forEach((name) => {
      item = name.toUpperCase();
      // 判断位置类型
      if ((PositionType[item] & this.position) === (PositionType[item])) {
        isValid = true;
        key = 'content-' + name;
        result[key] = true;
      }
    });
    if (!isValid) {
      this.position = this.defaultPosition;
      this.util.position.forEach((name) => {
        item = name.toUpperCase();
        // 判断位置类型
        if ((PositionType[item] & this.position) === (PositionType[item])) {
          key = 'content-' + name;
          result[key] = true;
        }
      });
    }
    return result;
  }

  /**
   * 获取内容对应的css类
   * @returns {string}
   */
  getContentClass() {
    const result = {};
    let item: string;
    let key: string;
    // 位置数据类型验证
    if (typeof this.layout !== 'number' || isNaN(this.position)) {
      this.layout = this.defaultLayout;
    }
    // 位置取值是否在所在取值范围之内
    let isValid = false;
    // 设置内容对齐方式
    this.util.position.forEach((name) => {
      item = name.toUpperCase();
      // 判断位置类型
      if ((PositionType[item] & this.layout) === (PositionType[item])) {
        isValid = true;
        key = 'content-' + name;
        result[key] = true;
      }
    });
    if (!isValid) {
      this.layout = this.defaultLayout;
      this.util.position.forEach((name) => {
        item = name.toUpperCase();
        // 判断位置类型
        if ((PositionType[item] & this.layout) === (PositionType[item])) {
          key = 'content-' + name;
          result[key] = true;
        }
      });
    }
    // 设置主题
    key = 'theme-' + this.getTheme();
    result[key] = true;
    return result;
  }

  /**
   * 获取内容对应的样式
   * @returns {{}}
   */
  getContentStyle() {
    const result = {};
    if (this.bgColor) {
      result['background-color'] = this.bgColor;
    }
    if (this.color) {
      result['color'] = this.color;
    }
    return result;
  }


  /**
   * 隐藏
   */
  hide() {
    this.isShow = false;
  }

  /**
   * 显示
   * @param data 配置数据
   */
  show(data?: any | string) {
    if (data) {
      if (typeof data === 'string') {
        this.text = data;
      } else if (typeof data === 'object') {
        // 设置加载文字
        if (data.hasOwnProperty('text')) {
          this.text = data.text;
        } else {
          this.text = '';
        }
      } else {
        this.text = '';
      }
    } else {
      this.text = '';
    }
    // 设置主题
    if (data && data.hasOwnProperty('theme') && this.themes.indexOf(data.theme) !== -1) {
      this.theme = data.theme;
    } else {
      this.theme = this.defaultTheme;
    }
    // 设置布局
    if (data && data.hasOwnProperty('layout') && typeof data.layout === 'number') {
      this.layout = data.layout;
    } else {
      this.layout = this.defaultLayout;
    }
    // 设置颜色
    if (data && data.hasOwnProperty('color')) {
      this.color = data.color;
    } else {
      this.color = this.defaultColor;
    }
    // 设置背景颜色
    if (data && data.hasOwnProperty('bgColor')) {
      this.bgColor = data.bgColor;
    } else {
      this.bgColor = this.defaultBgColor;
    }
    // 设置位置
    if (data && data.hasOwnProperty('position')) {
      this.position = data.position;
    } else {
      this.position = this.defaultPosition;
    }
    // 设置对齐方式
    if (data && data.hasOwnProperty('layout')) {
      this.layout = data.layout;
    } else {
      this.layout = this.defaultLayout;
    }
    // 设置显示时间
    if (data && data.hasOwnProperty('time') && typeof data.time === 'number' && data.time > 0) {
      this.time = data.time;
    } else {
      this.time = this.defaultTime;
    }
    // 设置回调函数
    if (data && data.hasOwnProperty('callback') && typeof data.callback === 'function') {
      this.callback = data.callback;
    } else {
      this.callback = null;
    }
    if (data && data.hasOwnProperty('isCountDown') && typeof data.isCountDown === 'boolean') {
      this.isCountDown = data.isCountDown;
    } else {
      this.isCountDown = false;
    }
    // 隐藏
    this.toClearId = setTimeout(() => {
      this.hide();
      this.toClearId = null;
      this.callback && this.callback();
      this.countDowndId && clearInterval(this.countDowndId);
    }, this.time * 1000);
    // 倒计时
    if (this.isCountDown) {
      this.remainTime = this.time;
      this.countDowndId = setInterval(() => {
        this.remainTime--;
        if (this.remainTime <= 0) {
          this.countDowndId && clearInterval(this.countDowndId);
        }
      }, 1000);
    }
    this.isShow = true;
  }

}
