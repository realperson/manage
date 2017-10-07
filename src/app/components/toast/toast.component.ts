import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {UtilService} from "../../services/util/util.service";
import {EventType} from "../../enums/event-type.enum";
import {EventData} from "../../interfaces/event-data";
import {PositionType} from "../../enums/position-type.enum";


@Component({
  selector: 'component-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  /**
   * 是否显示
   */
  @Input() isShow: boolean | string;

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
  @Input() position: number = PositionType.CENTER | PositionType.MIDDLE;

  /**
   * 内容摆放
   */
  @Input() layout: number = PositionType.CENTER | PositionType.MIDDLE;

  /**
   * 文字
   */
  @Input() text: string;

  /**
   * 主题列表
   * @type {[string,string,string,string,string]}
   */
  themes = ['normal', 'inverse', 'error', 'tip', 'success'];

  themeColor: any = {
    normal: {
      bgColor: '#333333',
      color: '#ffffff'
    },
    inverse: {
      bgColor: '#ffffff',
      color: '#333333'
    },
    error: {
      bgColor: '#f9dada',
      color: '#a94442'
    },
    tip: {
      bgColor: '#ffffff',
      color: '#666666'
    },
    success: {
      bgColor: '#dff0d8',
      color: '#3c7668'
    }
  };

  /**
   * 用于订阅和反订阅事件
   */
  subscription: Subscription;

  /**
   * 动画是否已完成
   * @type {boolean}
   */
  isAnimationEnd = true;

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
        this.toast(d.data);
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
  }

  /**
   * 获取主题
   * @returns {string}
   */
  getTheme() {
    let result = 'normal';
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
  isThemeNormal() {
    return this.getTheme() === 'normal';
  }

  /**
   * 获取位置对应的css类
   * @returns {string}
   */
  getPositionClass() {
    let result = {};
    let item: string;
    this.util.position.forEach((name) => {
      item = name.toUpperCase();
      // 判断位置类型
      if ((PositionType[item] & this.position) === (PositionType[item])) {
        let key = 'content-' + name;
        result[key] = true;
      }
    });
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
    // 设置内容对齐方式
    this.util.position.forEach((name) => {
      item = name.toUpperCase();
      // 判断位置类型
      if ((PositionType[item] & this.layout) === (PositionType[item])) {
        key = 'content-' + name;
        result[key] = true;
      }
    });
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
   * 显示提示
   * @param data 配置数据
   */
  toast(data?: any | string) {
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
    if (data && data.hasOwnProperty('theme') && data.theme === 'inverse') {
      this.theme = data.theme;
    } else {
      this.theme = 'normal';
    }
    // 设置布局
    // if (data && data.hasOwnProperty('layout') && data.layout === 'row') {
    //   this.layout = data.layout;
    // } else {
    //   this.layout = 'normal';
    // }
    // 设置颜色
    if (data && data.hasOwnProperty('color')) {
      this.color = data.color;
    } else {
      this.color = '';
    }
    // 设置背景颜色
    if (data && data.hasOwnProperty('bgColor')) {
      this.bgColor = data.bgColor;
    } else {
      this.bgColor = '';
    }
    this.isShow = true;
  }

}
