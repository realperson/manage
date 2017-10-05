import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'component-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  /**
   * 加载动画名称(normal:大 small:小) 默认为大
   */
  @Input() spinner: string;

  /**
   * 主题(normal:黑色 inverse:白色) 默认为黑色
   */
  @Input() theme: string;

  /**
   * 显示布局(normal:单行 row:两行) 默认为单行
   */
  @Input() layout: string;

  /**
   * 颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
   */
  @Input() color: string;

  /**
   * 背景颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
   */
  @Input() bgColor: string;

  /**
   * 是否显示背景遮罩(true:显示 false:不显示 '其它不为false的值':显示)
   */
  @Input() mask: string | boolean;

  /**
   * 背景遮罩颜色(当mask显示背景遮罩时生效,为空则使用默认颜色,如果需要透明度请使用rbga颜色)
   */
  @Input() maskColor: string;

  /**
   * 文字
   */
  @Input() text: string;

  /**
   * 默认颜色
   * @type {string}
   */
  normalColor = '#ffffff';

  /**
   * 反转颜色
   * @type {string}
   */
  inverseColor = '#333333';

  /**
   * 默认背景颜色
   * @type {string}
   */
  normalBgColor = 'rgba(0,0,0,0.6)';

  /**
   * 反转背景颜色
   * @type {string}
   */
  inverseBgColor = '#ffffff';

  /**
   * 是否显示
   * @type {boolean}
   */
  isShow = true;


  constructor() {
  }

  ngOnInit() {
    // this.hide();
    // this.loading('加载中,请稍候');
    // this.loading();
    // this.loading({
    //   spinner: 'small', // 加载动画名称(其它:大 small:小) 默认为大
    //   text: '加载中,请稍候', // 文字
    //   theme: 'normal', // 主题(normal:黑色 inverse:白色) 默认为黑色
    //   layout: 'normal', // 显示布局(normal:单行 row:两行) 默认为单行
    //   color: '#ff00ff', // 颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
    //   bgColor: '#ffffff', // 背景颜色(为空时使用默认颜色,如果需要透明度请使用rbga颜色)
    //   mask: true, // 是否显示背景遮罩(true:显示 false:不显示 '其它不为false的值':显示)
    //   maskColor: '#666' // 背景遮罩颜色(当mask显示背景遮罩时生效,为空则使用默认颜色,如果需要透明度请使用rbga颜色)
    //  });
  }


  /**
   * 获取加载动画名称
   * @returns {string}
   */
  getSpinnerName() {
    let result = '';
    if (this.spinner && this.spinner === 'small') {
      result = this.spinner;
    }
    return result;
  }

  /**
   * 获取主题
   * @returns {string}
   */
  getTheme() {
    let result = 'normal';
    if (this.theme) {
      if (this.theme === 'normal' || this.theme === 'inverse') {
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
   * 获取加载动画的颜色
   * @returns {string}
   */
  getColor() {
    let result = '';
    if (this.color) {
      // 有设置颜色
      result = this.color;
    } else {
      // 没有设置颜色,根据主题判断使用什么颜色
      result = this.isThemeNormal() ? this.normalColor : this.inverseColor;
    }
    return result;
  }

  /**
   * 获取加载动画的背景颜色
   * @returns {string}
   */
  getBgColor() {
    let result = '';
    if (this.bgColor) {
      // 有设置颜色
      result = this.bgColor;
    } else {
      // 没有设置颜色,根据主题判断使用什么颜色
      result = this.isThemeNormal() ? this.normalBgColor : this.inverseBgColor;
    }
    return result;
  }

  /**
   * 获取文字颜色
   * @returns {null}
   */
  getBgColorStyle() {
    const color = this.getBgColor();
    let result = null;
    if (color) {
      result = {
        'background-color': color
      };
    }
    return result;
  }

  /**
   * 获取文字颜色
   * @returns {null}
   */
  getTextColorStyle() {
    const color = this.getColor();
    let result = null;
    if (color) {
      result = {
        color: color
      };
    }
    return result;
  }

  /**
   * 获取布局
   * @returns {string}
   */
  getLayout() {
    let result = 'normal';
    if (this.layout) {
      // 有设置布局
      if (this.layout === 'normal' || this.layout === 'row') {
        result = this.layout;
      }
    }
    return result;
  }

  /**
   * 是否使用默认布局
   * @returns {boolean}
   */
  isLayoutNormal() {
    return this.getLayout() === 'normal';
  }


  /**
   * 是否显示背景遮罩
   * @returns {boolean}
   */
  isShowMask() {
    let result = true;
    if (typeof this.mask === 'boolean') {
      result = this.mask;
    } else {
      if (this.mask === 'false') {
        result = false;
      }
    }
    return result;
  }

  /**
   * 获取背景遮罩颜色
   * @returns {null}
   */
  getMaskColorStyle() {
    const color = this.isShowMask();
    let result = null;
    if (this.isShowMask() && this.maskColor) {
      result = {
        'background-color': this.maskColor
      };
    }
    return result;
  }

  /**
   * 隐藏组件
   */
  hide() {
    this.isShow = false;
  }

  /**
   * 显示加载状态
   * @param data 配置数据
   */
  loading(data?: any | string) {
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
    // 设置加载动画名称
    if (data && data.hasOwnProperty('spinner') && data.spinner === 'small') {
      this.spinner = data.spinner;
    } else {
      this.spinner = '';
    }
    // 设置主题
    if (data && data.hasOwnProperty('theme') && data.theme === 'inverse') {
      this.theme = data.theme;
    } else {
      this.theme = 'normal';
    }
    // 设置布局
    if (data && data.hasOwnProperty('layout') && data.layout === 'row') {
      this.layout = data.layout;
    } else {
      this.layout = 'normal';
    }
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
    // 设置是否显示遮罩
    if (data && data.hasOwnProperty('mask') && typeof data.mask === 'boolean') {
      this.mask = data.mask;
    } else {
      this.mask = true;
    }
    // 设置遮罩颜色
    if (data && data.hasOwnProperty('maskColor')) {
      this.maskColor = data.maskColor;
    } else {
      this.maskColor = '';
    }
  }


}
